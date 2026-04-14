<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4">
    <!-- Card -->
    <div class="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

      <div class="relative z-10">
        <div class="text-center mb-8">
          <div class="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30 shadow-inner">
            <UserPlusIcon class="w-8 h-8 text-purple-300" />
          </div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
          <p class="text-gray-300 mt-2 text-sm">Join us and start your journey</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="email" type="email" class="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="password" type="password" class="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out" placeholder="Create a password" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheckIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="confirmPassword" type="password" class="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out" placeholder="Confirm your password" />
            </div>
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 shadow-lg transform transition hover:-translate-y-0.5 duration-150 relative overflow-hidden group">
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span class="relative">Sign Up</span>
            </button>
          </div>
        </form>

        <div class="mt-6 text-center text-sm text-gray-300">
          Already have an account?
          <a href="#" @click.prevent="goLogin" class="font-medium text-purple-400 hover:text-purple-300 transition ease-in-out duration-150">
            Log in instead
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { EnvelopeIcon, LockClosedIcon, UserPlusIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const handleRegister = () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    alert("Please fill in all fields.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  alert("Registration successful (mock)");
  router.push("/Login");
};

const goLogin = () => {
  router.push("/Login");
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
