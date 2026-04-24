<template>
  <div class="min-h-screen relative overflow-hidden flex flex-col justify-center items-center bg-white dark:bg-[#09090B] font-inter selection:bg-neon-cyan/30 transition-colors duration-500 py-12">
    <!-- Cosmic Nebula Background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute w-[1000px] h-[1000px] top-[-300px] right-[-200px] rounded-full bg-indigo-500/5 dark:bg-deep-purple/20 blur-[150px] animate-pulse"></div>
      <div class="absolute w-[800px] h-[800px] bottom-[-200px] left-[-200px] rounded-full bg-emerald-500/5 dark:bg-neon-cyan/20 blur-[120px] animate-pulse" style="animation-delay: 3s;"></div>
      
      <!-- Impeccable Moving Starfield -->
      <template v-if="isMounted">
        <div v-for="i in 50" :key="'star-'+i" 
             class="absolute rounded-full bg-slate-900 dark:bg-white animate-twinkle z-[1] opacity-[0.05] dark:opacity-100"
             :style="starStyles[i-1]">
        </div>
        
        <div v-for="i in 3" :key="'shooting-'+i" 
             class="absolute h-[1px] bg-gradient-to-r from-transparent via-indigo-500 dark:via-white to-transparent opacity-0 animate-shooting-star z-[2]"
             :style="shootingStarStyles[i-1]">
        </div>
      </template>
    </div>

    <!-- Back Button -->
    <NuxtLink to="/login" class="absolute top-8 left-8 z-20 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 hover:text-indigo-600 dark:hover:text-neon-cyan transition-all duration-300 group transition-colors">
      <span class="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
      Sign In
    </NuxtLink>

    <main class="relative z-10 w-full max-w-lg px-6 animate-fade-in">
      <div class="bg-white/80 dark:bg-white/5 backdrop-blur-[32px] rounded-[40px] border border-slate-200 dark:border-white/10 p-10 shadow-2xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col transition-colors">
        
        <!-- Header Section -->
        <div class="text-center mb-10">
          <div class="mb-4 flex items-center justify-center gap-3">
            <div class="relative">
              <span class="material-symbols-outlined text-indigo-600 dark:text-neon-cyan text-4xl transition-colors" style="font-variation-settings: 'FILL' 1;">add_circle</span>
              <div class="absolute -inset-2 bg-indigo-500/20 dark:bg-neon-cyan/30 blur-lg rounded-full animate-pulse transition-colors"></div>
            </div>
          </div>
          <h1 class="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Create Account</h1>
          <p class="text-slate-500 dark:text-white/50 text-sm tracking-wide transition-colors">Join the cognitive infrastructure.</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          <!-- Full Name -->
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
              <span class="material-symbols-outlined text-xl">person</span>
            </div>
            <input v-model="fullName" type="text" id="full-name" placeholder="Operational Name" required :disabled="isLoading"
                   class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10" />
          </div>

          <!-- Email -->
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
              <span class="material-symbols-outlined text-xl">mail</span>
            </div>
            <input v-model="email" type="email" id="email" placeholder="terminal@orbit.ai" required :disabled="isLoading"
                   class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10" />
          </div>

          <!-- Grid for Passwords -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Password -->
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
                <span class="material-symbols-outlined text-xl">lock</span>
              </div>
              <input v-model="password" type="password" id="password" placeholder="Keycode" required :disabled="isLoading"
                     class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10" />
            </div>

            <!-- Confirm Password -->
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 dark:text-white/20 group-focus-within:text-indigo-600 dark:group-focus-within:text-neon-cyan transition-colors">
                <span class="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="Verify" required :disabled="isLoading"
                     class="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-neon-cyan/50 focus:border-indigo-500/50 dark:focus:border-neon-cyan/50 block pl-12 p-4 transition-all placeholder-slate-300 dark:placeholder-white/10" />
            </div>
          </div>

          <!-- Terms -->
          <label class="flex items-start gap-3 cursor-pointer group px-1">
            <input v-model="acceptTerms" type="checkbox" :disabled="isLoading"
                   class="mt-1 w-4 h-4 rounded border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-indigo-600 dark:text-neon-cyan focus:ring-indigo-500 dark:focus:ring-neon-cyan focus:ring-offset-0 transition-all" />
            <span class="text-xs text-slate-400 dark:text-white/40 group-hover:text-slate-600 dark:group-hover:text-white/60 transition-colors leading-relaxed">
              I confirm that the provided data is accurate and agree to the cognitive deployment terms.
            </span>
          </label>

          <!-- Register Button -->
          <button type="submit" :disabled="isLoading"
                  class="w-full py-4 mt-2 rounded-2xl font-bold text-sm text-white dark:text-slate-900 bg-gradient-to-r from-indigo-600 dark:from-neon-cyan to-purple-600 dark:to-deep-purple shadow-xl dark:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-2xl dark:hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 relative overflow-hidden group">
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span class="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
              {{ isLoading ? 'Deploying...' : 'Initialize Deployment' }}
              <span class="material-symbols-outlined text-lg">rocket_launch</span>
            </span>
          </button>
        </form>

        <div class="flex items-center w-full my-8">
          <div class="flex-1 border-t border-slate-100 dark:border-white/10"></div>
          <span class="px-4 text-[10px] font-bold text-slate-300 dark:text-white/20 uppercase tracking-[0.2em] transition-colors">Protocol Sync</span>
          <div class="flex-1 border-t border-slate-100 dark:border-white/10"></div>
        </div>

        <!-- Google Register -->
        <button @click="handleGoogleRegister" :disabled="isLoading" 
                class="relative group w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 border border-slate-200 dark:border-white/5 overflow-hidden disabled:opacity-50 mb-8">
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/5 dark:from-neon-cyan/10 to-transparent transition-opacity duration-300"></div>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-5 w-5 relative z-10" />
          <span class="text-sm font-bold text-slate-700 dark:text-white/80 relative z-10 tracking-wide transition-colors">Sign up with Google</span>
        </button>

        <p class="text-center text-xs text-slate-400 dark:text-white/30 tracking-wide transition-colors">
          Already registered? <NuxtLink to="/login" class="text-indigo-600 dark:text-neon-cyan hover:text-slate-900 dark:hover:text-white transition-colors font-bold ml-1 uppercase tracking-wider">Access Terminal</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'authAdmin'
});

const toast = useToast();
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const isLoading = ref(false);

const isMounted = ref(false);
const starStyles = ref([]);
const shootingStarStyles = ref([]);

onMounted(() => {
  isMounted.value = true;
  
  // Twinkling Stars
  starStyles.value = Array.from({ length: 50 }).map(() => ({
    width: Math.random() * 2 + 'px',
    height: Math.random() * 2 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 5 + 's',
    animationDuration: (Math.random() * 3 + 2) + 's',
    opacity: Math.random() * 0.7 + 0.3
  }));

  // Shooting Stars
  shootingStarStyles.value = Array.from({ length: 3 }).map(() => ({
    width: (Math.random() * 150 + 100) + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    transform: 'rotate(-45deg)',
    animationDelay: (Math.random() * 20) + 's',
    animationDuration: (Math.random() * 5 + 5) + 's'
  }));
});

const handleBackendAuth = async (firebaseIdToken) => {
  try {
    await useFetch('/api/auth/login', {
      method: 'POST',
      body: { idToken: firebaseIdToken },
    });

    const { data: userRolesData } = await useFetch('/api/auth/user-roles', {
      method: 'GET',
    });

    const userRoles = userRolesData.value || [];

    if (userRoles.includes('admin')) {
      window.location.href = '/admin';
    } else if (userRoles.includes('partner')) {
      window.location.href = '/partner';
    } else {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Backend auth failed:', error);
    toast.error('Đăng nhập vào hệ thống thất bại. Vui lòng kiểm tra lại.');
  }
};

const validateForm = () => {
  if (!fullName.value.trim() || !email.value.trim() || !password.value || !confirmPassword.value) {
    toast.warning('Vui lòng nhập đầy đủ thông tin.');
    return false;
  }

  if (fullName.value.trim().length < 2) {
    toast.warning('Họ tên phải có ít nhất 2 ký tự.');
    return false;
  }

  if (password.value.length < 8) {
    toast.warning('Mật khẩu phải có ít nhất 8 ký tự.');
    return false;
  }

  if (password.value !== confirmPassword.value) {
    toast.error('Mật khẩu xác nhận không khớp.');
    return false;
  }

  if (!acceptTerms.value) {
    toast.warning('Bạn cần xác nhận thông tin trước khi đăng ký.');
    return false;
  }

  return true;
};

const getRegisterErrorMessage = (error) => {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Email này đã được sử dụng.';
    case 'auth/invalid-email':
      return 'Email không hợp lệ.';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu.';
    case 'auth/popup-closed-by-user':
      return 'Bạn đã đóng cửa sổ đăng nhập Google.';
    default:
      return 'Đăng ký thất bại. Vui lòng thử lại.';
  }
};

const handleRegister = async () => {
  if (!process.client || !validateForm()) return;
  isLoading.value = true;

  try {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const { auth } = await import('~/src/auth/firebase.js');

    const credential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    );

    await updateProfile(credential.user, {
      displayName: fullName.value.trim(),
    });

    const idToken = await credential.user.getIdToken(true);
    await handleBackendAuth(idToken);
  } catch (error) {
    console.error('Register failed:', error);
    toast.error(getRegisterErrorMessage(error));
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleRegister = async () => {
  if (!process.client) return;
  isLoading.value = true;

  try {
    const { signInWithPopup } = await import('firebase/auth');
    const { auth, provider } = await import('~/src/auth/firebase.js');

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await handleBackendAuth(idToken);
  } catch (error) {
    console.error('Google register failed:', error);
    toast.error(getRegisterErrorMessage(error));
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'Register - Orbit AI',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap' }
  ]
})
</script>

<style scoped>
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
