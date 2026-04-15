<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4">
    <div class="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>

      <div class="relative z-10">
        <div class="text-center mb-8">
          <div class="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30 shadow-inner">
            <KeyIcon class="w-8 h-8 text-cyan-300" />
          </div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Reset Password</h2>
          <p class="text-gray-300 mt-2 text-sm">Enter your email and we'll send a link to reset your password.</p>
        </div>

        <form @submit.prevent="handleForgot" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="email" type="email" class="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition duration-150 ease-in-out" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 shadow-lg transform transition hover:-translate-y-0.5 duration-150 relative overflow-hidden group">
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span class="relative">Send Reset Link</span>
            </button>
          </div>
        </form>

        <div class="mt-6 text-center text-sm text-gray-300">
          Back to
          <a href="#" @click.prevent="goLogin" class="font-medium text-cyan-400 hover:text-cyan-300 transition ease-in-out duration-150">
            Login
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/24/outline';

const email = ref('');
const router = useRouter();

const handleForgot = () => {
  if (!email.value) {
    alert("Please enter your email address.");
    return;
  }

  alert("Reset email sent (mock)");
};

const goLogin = () => {
  router.push("/login");
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
