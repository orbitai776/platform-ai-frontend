<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6">
    <div class="w-full max-w-sm">
      <h2 class="mb-10 text-center text-2xl/9 font-bold tracking-tight text-black">
        Sign in to your account
      </h2>

      <form class="space-y-6" @submit.prevent="handleEmailLogin">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-black">Email address</label>
          <div class="mt-2">
            <input v-model="email" type="email" id="email" placeholder="Email" required
              :disabled="isLoading"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6 disabled:opacity-50" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-black">Password</label>
          <div class="mt-2">
            <input v-model="password" type="password" id="password" placeholder="Password" required
              :disabled="isLoading"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6 disabled:opacity-50" />
          </div>
          <div class="mt-2 flex justify-end">
            <NuxtLink to="/user/ForgotPassword" class="text-sm font-semibold text-indigo-500 hover:text-indigo-400">Forgot password?</NuxtLink>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="isLoading"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-800 disabled:opacity-70">
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>

      <div class="mt-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-3 text-xs text-gray-500 tracking-wide">Another</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <div class="mt-4">
        <button type="button" @click="handleGoogleLogin" :disabled="isLoading"
          class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100 disabled:opacity-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-5 w-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { jwtDecode } from "jwt-decode";

// Đặt layout. Tuỳ bạn muốn dùng layout nào thì điền tên vào đây (ví dụ: 'default' hoặc 'authAdmin')
definePageMeta({
  layout: 'authAdmin'  
});

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleBackendAuth = async (firebaseIdToken) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GATEWAY_URL}/n/v1/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: firebaseIdToken }),
    });

    if (!response.ok) throw new Error("Xác thực Backend thất bại");

    const data = await response.json();
    const backendAccessToken = data.accessToken;

    // Lưu Token và Roles
    if (process.client) {
      localStorage.setItem('accessToken', backendAccessToken);
      
      const decodedToken = jwtDecode(backendAccessToken);
      const userRoles = decodedToken.roles;
      localStorage.setItem('userRoles', JSON.stringify(userRoles));

      // Phân quyền điều hướng
      if (userRoles.includes('admin')) {
        navigateTo('/admin');
      } else {
        navigateTo('/'); // User và Partner về trang chủ
      }
    }
  } catch (error) {
    console.error("Lỗi Backend:", error);
    alert("Đăng nhập thất bại do lỗi máy chủ!");
  }
};

const handleEmailLogin = async () => {
  if (!process.client) return;
  isLoading.value = true;
  
  try {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { auth } = await import("~/src/auth/firebase.js");

    const result = await signInWithEmailAndPassword(auth, email.value, password.value);
    const idToken = await result.user.getIdToken();
    
    await handleBackendAuth(idToken);
  } catch (error) {
    console.error("Login failed:", error);
    alert("Sai email hoặc mật khẩu!");
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleLogin = async () => {
  if (!process.client) return;
  isLoading.value = true;

  try {
    const { signInWithPopup } = await import("firebase/auth");
    const { auth, provider } = await import("~/src/auth/firebase.js");

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    
    await handleBackendAuth(idToken);
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>