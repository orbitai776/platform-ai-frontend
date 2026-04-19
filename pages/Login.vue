<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6">
    <div class="w-full max-w-sm relative">
      <NuxtLink to="/" class="absolute -top-12 left-0 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to home
      </NuxtLink>

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
    // Gọi qua server Nuxt (api/auth/login.post.ts) để nó set Cookie HttpOnly hộ mình
    await useFetch('/api/auth/login', {
      method: "POST",
      body: { idToken: firebaseIdToken },
    });

    const { data: userRolesData, error: userRolesError } = await useFetch('/api/auth/user-roles', {
      method: "GET",
    });

    const userRoles = userRolesData.value || [];
    console.log(userRoles); // ['user', 'partner']
    console.log(Array.isArray(userRoles)); // true
    console.log(userRoles.includes('partner')); // true

    // Phân quyền điều hướng
    if (userRoles.includes('admin')) {
      window.location.href = '/admin';
    } else if (userRoles.includes('partner')) {
      window.location.href = '/partner';
    } else {
      window.location.href = '/'; 
    }
  } catch (error) {
    console.error("Lỗi Backend:", error);
    toast.error("Đăng nhập thất bại do lỗi phía Gateway hoặc tài khoản!");
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
    toast.error("Sai email hoặc mật khẩu!");
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