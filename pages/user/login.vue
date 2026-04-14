<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6">
    <div class="w-full max-w-sm">
      <h2 class="mb-10 text-center text-2xl font-bold text-black">
        Sign in to your account
      </h2>

      <form class="space-y-6" @submit.prevent="handleEmailLogin">
        <div>
          <label class="block text-sm font-medium text-black">Email address</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            :disabled="isLoading"
            class="w-full border px-3 py-2 rounded mt-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-black">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            :disabled="isLoading"
            class="w-full border px-3 py-2 rounded mt-2"
          />
          <div class="mt-2 text-right">
            <NuxtLink to="/user/forgot-password" class="text-sm text-indigo-500">
              Forgot password?
            </NuxtLink>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-black text-white py-2 rounded"
        >
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <div class="mt-6 text-center text-gray-500 text-sm">OR</div>

      <button
        @click="handleGoogleLogin"
        :disabled="isLoading"
        class="w-full mt-4 border py-2 rounded flex justify-center items-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="w-5 h-5"
        />
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { jwtDecode } from "jwt-decode"

definePageMeta({
  layout: "auth"
})

const email = ref("")
const password = ref("")
const isLoading = ref(false)

const config = useRuntimeConfig()
const { $firebase } = useNuxtApp()

// 🔥 Backend auth
const handleBackendAuth = async (firebaseIdToken) => {
  try {
    const response = await fetch(`${config.public.GATEWAY_URL}/v1/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idToken: firebaseIdToken })
    })

    if (!response.ok) throw new Error("Backend lỗi")

    const data = await response.json()
    const accessToken = data.accessToken

    document.cookie = `accessToken=${accessToken}; path=/`

    const decoded = jwtDecode(accessToken)
    const roles = decoded.roles

    localStorage.setItem("userRoles", JSON.stringify(roles))

    if (roles.includes("admin")) {
      navigateTo("/admin")
    } else {
      navigateTo("/")
    }

  } catch (err) {
    console.error("Backend error:", err)
    alert("Đăng nhập backend thất bại")
  }
}

// 🔥 Email login
const handleEmailLogin = async () => {
  try {
    isLoading.value = true

    const { signInWithEmailAndPassword } = await import("firebase/auth")
    const { auth } = await import("~/src/auth/firebase.js")

    const result = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    const idToken = await result.user.getIdToken()
    await handleBackendAuth(idToken)

  } catch (err) {
    console.error(err)
    alert("Sai email hoặc mật khẩu")
  } finally {
    isLoading.value = false
  }
}

// 🔥 GOOGLE LOGIN (FIX CHUẨN)
const handleGoogleLogin = async () => {
  try {
    isLoading.value = true

    const result = await $firebase.signInWithPopup(
      $firebase.auth,
      $firebase.provider
    )

    const idToken = await result.user.getIdToken()

    await handleBackendAuth(idToken)

  } catch (err) {
    console.error("Google login error:", err)
    alert("Đăng nhập Google thất bại")
  } finally {
    isLoading.value = false
  }
}
</script>