<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4">
    <!-- Card -->
    <div class="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

      <div class="relative z-10">
        <div class="text-center mb-8">
          <div class="bg-indigo-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-400/30 shadow-inner">
            <UserIcon class="w-8 h-8 text-indigo-300" />
          </div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p class="text-gray-300 mt-2 text-sm">Sign in to your account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Email / Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="email" type="text" class="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out" placeholder="Enter your email" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="password" type="password" class="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out" placeholder="••••••••" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-600 bg-gray-800 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" @click.prevent="goForgot" class="font-medium text-indigo-400 hover:text-indigo-300 transition ease-in-out duration-150">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 shadow-lg transform transition hover:-translate-y-0.5 duration-150 relative overflow-hidden group">
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span class="relative">Sign in</span>
            </button>
          </div>
        </form>

        <div class="mt-6 flex items-center justify-between">
          <span class="border-b border-gray-600 w-1/5 lg:w-1/4"></span>
          <span class="text-xs text-center text-gray-400 uppercase">Or continue with</span>
          <span class="border-b border-gray-600 w-1/5 lg:w-1/4"></span>
        </div>

        <div class="mt-6 gap-4">
          <button @click="signInWithGoogle" type="button" class="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#EA4335" d="M12.24 10.285V14.4h5.806c-.24 1.368-1.617 4.013-5.806 4.013-3.492 0-6.336-2.893-6.336-6.413s2.844-6.413 6.336-6.413c1.989 0 3.32.848 4.083 1.579l2.785-2.688C17.285 2.773 14.99 1.8 12.24 1.8 6.981 1.8 2.72 6.061 2.72 11.32s4.261 9.52 9.52 9.52c5.493 0 9.136-3.861 9.136-9.296 0-.624-.067-1.1-.153-1.559H12.24z"/>
              <path fill="#34A853" d="M3.96 7.63l3.383 2.48c.916-2.722 3.497-4.523 6.897-4.523 1.989 0 3.32.848 4.083 1.579l2.785-2.688C19.82 2.773 17.525 1.8 14.775 1.8 10.138 1.8 6.14 4.457 3.96 7.63z"/>
              <path fill="#FBBC05" d="M3.96 16.37c2.18 3.173 6.178 5.83 10.815 5.83 2.639 0 4.858-.873 6.46-2.365l-3.12-2.55c-.885.617-2.013.988-3.34.988-3.38 0-6.24-2.278-7.267-5.348L3.96 16.37z"/>
              <path fill="#4285F4" d="M22.84 11.544c0-.624-.067-1.1-.153-1.559H14.775V14.1h4.54c-.194 1.046-.795 2.63-2.12 3.57l3.12 2.55c1.867-1.723 2.946-4.258 2.946-8.676z"/>
            </svg>
            Google
          </button>
        </div>

        <div class="mt-6 text-center text-sm text-gray-300">
          Don't have an account?
          <a href="#" @click.prevent="goRegister" class="font-medium text-indigo-400 hover:text-indigo-300 transition ease-in-out duration-150">
            Register now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline';
import { auth, provider, signInWithPopup } from "~/src/auth/firebase.js";

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert("Please enter both email and password");
    return;
  }

  if (password.value.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  const token = useCookie('token');
  token.value = "mock_token_for_testing";

  alert("Login successful (mock)");
  router.push("/");
};

const goRegister = () => {
  router.push("/user/Register");
};

const goForgot = () => {
  router.push("/user/ForgotPassword");
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    console.log("Đăng nhập Google thành công:", JSON.stringify(result.user));

    if (idToken) {
      const token = useCookie('token');
      token.value = idToken; // Lưu token
      router.push("/");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập Google:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      alert('Bạn đã đóng cửa sổ đăng nhập Google');
    }
  }
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
