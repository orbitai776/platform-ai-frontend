<template>
  <div class="min-h-screen relative overflow-hidden flex flex-col justify-center items-center bg-white dark:bg-[#09090B] font-inter selection:bg-neon-cyan/30 transition-colors duration-500 py-12">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute w-[900px] h-[900px] top-[-260px] left-[-220px] rounded-full bg-indigo-500/5 dark:bg-deep-purple/20 blur-[140px] animate-pulse"></div>
      <div class="absolute w-[700px] h-[700px] bottom-[-180px] right-[-160px] rounded-full bg-emerald-500/5 dark:bg-neon-cyan/20 blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>

      <template v-if="isMounted">
        <div
          v-for="i in 50"
          :key="'star-'+i"
          class="absolute rounded-full bg-slate-900 dark:bg-white animate-twinkle z-[1] opacity-[0.05] dark:opacity-100"
          :style="starStyles[i - 1]"
        ></div>

        <div
          v-for="i in 3"
          :key="'shooting-'+i"
          class="absolute h-[1px] bg-gradient-to-r from-transparent via-indigo-500 dark:via-white to-transparent opacity-0 animate-shooting-star z-[2]"
          :style="shootingStarStyles[i - 1]"
        ></div>
      </template>
    </div>

    <NuxtLink to="/login" class="absolute top-8 left-8 z-20 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 hover:text-indigo-600 dark:hover:text-neon-cyan transition-all duration-300 group">
      <span class="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
      Sign In
    </NuxtLink>

    <main class="relative z-10 w-full max-w-lg px-6 animate-fade-in">
      <div class="bg-white/80 dark:bg-white/5 backdrop-blur-[32px] rounded-[32px] border border-slate-200 dark:border-white/10 p-8 md:p-10 shadow-2xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-colors">
        <div class="mb-8 flex items-center justify-center gap-3">
          <div class="relative">
            <span class="material-symbols-outlined text-indigo-600 dark:text-neon-cyan text-4xl transition-colors" style="font-variation-settings: 'FILL' 1;">lock_reset</span>
            <div class="absolute -inset-2 bg-indigo-500/20 dark:bg-neon-cyan/30 blur-lg rounded-full animate-pulse transition-colors"></div>
          </div>
          <span class="font-display text-3xl font-bold bg-gradient-to-r from-indigo-600 dark:from-neon-cyan to-purple-600 dark:to-deep-purple bg-clip-text text-transparent drop-shadow-sm transition-colors">Orbit AI</span>
        </div>

        <div class="text-center mb-8">
          <h1 class="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Reset Password</h1>
          <p class="text-slate-500 dark:text-white/50 text-sm tracking-wide transition-colors">{{ stepCopy.subtitle }}</p>
        </div>

        <div class="grid grid-cols-3 gap-2 mb-8" aria-label="Reset progress">
          <div
            v-for="item in steps"
            :key="item.key"
            class="h-1.5 rounded-full transition-colors"
            :class="isStepActive(item.key) ? 'bg-indigo-600 dark:bg-neon-cyan' : 'bg-slate-200 dark:bg-white/10'"
          ></div>
        </div>

        <form v-if="step === 'email'" class="space-y-5" @submit.prevent="submitEmail">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
              <span class="material-symbols-outlined text-xl">mail</span>
            </div>
            <input
              v-model="email"
              type="email"
              placeholder="terminal@orbit.ai"
              required
              :disabled="isLoading"
              class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10"
            />
          </div>

          <button type="submit" :disabled="isLoading" class="primary-action">
            <span class="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
              {{ isLoading ? 'Sending...' : 'Send Code' }}
              <span class="material-symbols-outlined text-lg">send</span>
            </span>
          </button>
        </form>

        <form v-else-if="step === 'code'" class="space-y-5" @submit.prevent="submitCode">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
              <span class="material-symbols-outlined text-xl">pin</span>
            </div>
            <input
              v-model="code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              placeholder="000000"
              required
              :disabled="isLoading"
              class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-center text-2xl font-bold tracking-[0.5em] rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10"
              @input="code = code.replace(/\D/g, '').slice(0, 6)"
            />
          </div>

          <div v-if="devCode" class="rounded-2xl border border-amber-300/60 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-400/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
            Dev code: <span class="font-bold tracking-widest">{{ devCode }}</span>
          </div>

          <button type="submit" :disabled="isLoading" class="primary-action">
            <span class="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
              {{ isLoading ? 'Checking...' : 'Verify Code' }}
              <span class="material-symbols-outlined text-lg">verified</span>
            </span>
          </button>

          <button type="button" :disabled="isLoading" class="secondary-action" @click="submitEmail">
            Resend Code
          </button>
        </form>

        <form v-else class="space-y-5" @submit.prevent="submitPassword">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
              <span class="material-symbols-outlined text-xl">lock</span>
            </div>
            <input
              v-model="newPassword"
              type="password"
              placeholder="New password"
              required
              :disabled="isLoading"
              class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10"
            />
          </div>

          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
              <span class="material-symbols-outlined text-xl">verified_user</span>
            </div>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              :disabled="isLoading"
              class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10"
            />
          </div>

          <button type="submit" :disabled="isLoading" class="primary-action">
            <span class="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
              {{ isLoading ? 'Updating...' : 'Reset Password' }}
              <span class="material-symbols-outlined text-lg">done</span>
            </span>
          </button>
        </form>

        <p class="mt-8 text-center text-xs text-slate-400 dark:text-white/30 tracking-wide transition-colors">
          Remembered it?
          <NuxtLink to="/login" class="text-indigo-600 dark:text-neon-cyan hover:text-slate-900 dark:hover:text-white transition-colors font-bold ml-1 uppercase tracking-wider">Access Terminal</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

definePageMeta({
  layout: 'authAdmin'
});

const toast = useToast();
const email = ref('');
const code = ref('');
const resetToken = ref('');
const devCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const step = ref('email');
const isLoading = ref(false);
const isMounted = ref(false);
const starStyles = ref([]);
const shootingStarStyles = ref([]);

const steps = [
  { key: 'email' },
  { key: 'code' },
  { key: 'password' },
];

const stepOrder = steps.map((item) => item.key);

const stepCopy = computed(() => {
  if (step.value === 'code') {
    return { subtitle: `Enter the 6-digit code sent to ${email.value.trim()}.` };
  }

  if (step.value === 'password') {
    return { subtitle: 'Create a new password for your account.' };
  }

  return { subtitle: 'Enter your email to receive a verification code.' };
});

onMounted(() => {
  isMounted.value = true;

  starStyles.value = Array.from({ length: 50 }).map(() => ({
    width: Math.random() * 2 + 'px',
    height: Math.random() * 2 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 5 + 's',
    animationDuration: Math.random() * 3 + 2 + 's',
    opacity: Math.random() * 0.7 + 0.3,
  }));

  shootingStarStyles.value = Array.from({ length: 3 }).map(() => ({
    width: Math.random() * 150 + 100 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    transform: 'rotate(-45deg)',
    animationDelay: Math.random() * 20 + 's',
    animationDuration: Math.random() * 5 + 5 + 's',
  }));
});

const isStepActive = (key) => {
  return stepOrder.indexOf(key) <= stepOrder.indexOf(step.value);
};

const getErrorMessage = (error, fallback) => {
  return error?.data?.statusMessage || error?.data?.message || fallback;
};

const submitEmail = async () => {
  const normalizedEmail = email.value.trim().toLowerCase();
  if (!normalizedEmail) {
    toast.warning('Please enter your email.');
    return;
  }

  isLoading.value = true;
  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: normalizedEmail },
    });

    email.value = normalizedEmail;
    resetToken.value = response.resetToken;
    devCode.value = response.devCode || '';
    code.value = '';
    step.value = 'code';
    toast.success(response.message || 'Verification code sent.');
  } catch (error) {
    toast.error(getErrorMessage(error, 'Could not send verification code.'));
  } finally {
    isLoading.value = false;
  }
};

const submitCode = async () => {
  if (!resetToken.value) {
    step.value = 'email';
    toast.warning('Please request a new code.');
    return;
  }

  if (!/^\d{6}$/.test(code.value)) {
    toast.warning('Please enter the 6-digit code.');
    return;
  }

  isLoading.value = true;
  try {
    await $fetch('/api/auth/verify-reset-code', {
      method: 'POST',
      body: {
        resetToken: resetToken.value,
        code: code.value,
      },
    });

    step.value = 'password';
    toast.success('Code verified.');
  } catch (error) {
    toast.error(getErrorMessage(error, 'Invalid verification code.'));
  } finally {
    isLoading.value = false;
  }
};

const submitPassword = async () => {
  if (newPassword.value.length < 8) {
    toast.warning('Password must be at least 8 characters.');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    toast.error('Password confirmation does not match.');
    return;
  }

  isLoading.value = true;
  try {
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        resetToken: resetToken.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      },
    });

    toast.success(response.message || 'Password reset successfully.');
    await navigateTo('/login');
  } catch (error) {
    toast.error(getErrorMessage(error, 'Could not reset password.'));
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'Reset Password - Orbit AI',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap' }
  ]
});
</script>

<style scoped>
.primary-action {
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  background-image: linear-gradient(to right, #4f46e5, #9333ea);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
}

.primary-action:hover:not(:disabled) {
  transform: scale(1.02);
}

.primary-action:active:not(:disabled) {
  transform: scale(0.98);
}

.primary-action:disabled,
.secondary-action:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.secondary-action {
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4f46e5;
  border: 1px solid rgb(79 70 229 / 0.2);
  background: rgb(79 70 229 / 0.04);
  transition: all 0.3s;
}

.secondary-action:hover:not(:disabled) {
  background: rgb(79 70 229 / 0.08);
}

:global(.dark) .primary-action {
  color: #0f172a;
  background-image: linear-gradient(to right, #00f0ff, #8b5cf6);
  box-shadow: 0 0 30px rgb(0 240 255 / 0.3);
}

:global(.dark) .primary-action:hover:not(:disabled) {
  box-shadow: 0 0 50px rgb(0 240 255 / 0.5);
}

:global(.dark) .secondary-action {
  color: #00f0ff;
  border-color: rgb(255 255 255 / 0.08);
  background: rgb(255 255 255 / 0.04);
}

:global(.dark) .secondary-action:hover:not(:disabled) {
  background: rgb(255 255 255 / 0.08);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.animate-twinkle {
  animation: twinkle ease-in-out infinite;
}

@keyframes shooting-star {
  0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
  10% { opacity: 1; }
  20% { transform: translateX(-500px) translateY(500px) rotate(-45deg); opacity: 0; }
  100% { transform: translateX(-500px) translateY(500px) rotate(-45deg); opacity: 0; }
}

.animate-shooting-star {
  animation: shooting-star linear infinite;
}

.font-display {
  font-family: 'Space Grotesk', sans-serif;
}
</style>
