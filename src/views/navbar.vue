<template>
  <nav class="fixed top-0 w-full z-50 dark:bg-black/40 bg-white/80 backdrop-blur-xl dark:border-b dark:border-white/10 border-b border-black/5 flex justify-between items-center px-8 h-20 font-display tracking-tight transition-all duration-500">
    <!-- Scroll Progress Bar -->
    <div class="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-neon-cyan to-deep-purple transition-all duration-300" :style="{ width: `${scrollProgress}%` }"></div>
    
    <div class="flex items-center gap-4">
      <div class="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-deep-purple bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
        Orbit AI
      </div>
    </div>

    <ul class="hidden lg:flex gap-8 list-none m-0 p-0 items-center h-full">
      <li>
        <NuxtLink to="/" active-class="nav-active" class="nav-link">Platform</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/solutions" active-class="nav-active" class="nav-link">Solutions</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/news" active-class="nav-active" class="nav-link">News</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/enterprise" active-class="nav-active" class="nav-link">Enterprise</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/pricing" active-class="nav-active" class="nav-link">Pricing</NuxtLink>
      </li>
    </ul>

    <div class="flex items-center gap-6">
      <!-- Theme Toggle -->
      <button @click="toggleTheme" class="w-10 h-10 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-white text-slate-900 hover:scale-110 transition-all group overflow-hidden relative">
        <span class="material-symbols-outlined text-xl absolute transition-all duration-500" :class="isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 -rotate-90'">dark_mode</span>
        <span class="material-symbols-outlined text-xl absolute transition-all duration-500 text-amber-500" :class="!isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-10 opacity-0 rotate-90'">light_mode</span>
      </button>

      <!-- Auth Section -->
      <template v-if="user">
        <div class="flex items-center gap-4 animate-fade-in">
          <!--<div class="flex flex-col items-end hidden sm:flex">
            <span class="text-[0.6rem] font-bold text-white uppercase tracking-widest leading-none mb-1">{{ user.displayName || 'Agent' }}</span>
            <span class="text-[0.5rem] font-bold text-white/40 uppercase tracking-tighter">{{ user.email }}</span>
          </div>-->
          
          <div class="group relative">
            <button class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-deep-purple/20 border border-white/10 flex items-center justify-center overflow-hidden transition-all hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <img v-if="user.photoURL" :src="user.photoURL" class="w-full h-full object-cover" />
              <span v-else class="material-symbols-outlined text-neon-cyan text-xl">account_circle</span>
            </button>

            <!-- Dropdown -->
            <div class="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <div class="dark:bg-black/80 bg-white/90 backdrop-blur-2xl border dark:border-white/10 border-slate-200 rounded-2xl p-2 shadow-2xl space-y-1 transition-colors">
                
                <NuxtLink v-if="isAdmin" to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-xl dark:hover:bg-white/5 hover:bg-slate-50 dark:text-white/60 text-slate-500 hover:text-neon-cyan transition-colors no-underline">
                  <span class="material-symbols-outlined text-lg">admin_panel_settings</span>
                  <span class="text-[0.7rem] font-bold uppercase tracking-widest">Admin Nexus</span>
                </NuxtLink>

                <NuxtLink v-if="isPartner" to="/partner" class="flex items-center gap-3 px-4 py-3 rounded-xl dark:hover:bg-white/5 hover:bg-slate-50 dark:text-white/60 text-slate-500 hover:text-neon-cyan transition-colors no-underline">
                  <span class="material-symbols-outlined text-lg">handshake</span>
                  <span class="text-[0.7rem] font-bold uppercase tracking-widest">Partner Portal</span>
                </NuxtLink>

                <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-3 rounded-xl dark:hover:bg-white/5 hover:bg-slate-50 dark:text-white/60 text-slate-500 hover:text-neon-cyan transition-colors no-underline">
                  <span class="material-symbols-outlined text-lg">dashboard_customize</span>
                  <span class="text-[0.7rem] font-bold uppercase tracking-widest">User Dashboard</span>
                </NuxtLink>

                <div class="h-[1px] dark:bg-white/5 bg-slate-100 my-1 transition-colors"></div>

                <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl dark:hover:bg-white/5 hover:bg-slate-50 dark:text-white/60 text-slate-500 hover:text-red-500 transition-colors">
                  <span class="material-symbols-outlined text-lg">logout</span>
                  <span class="text-[0.7rem] font-bold uppercase tracking-widest">Terminate Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <NuxtLink to="/login" class="dark:text-white/60 text-slate-500 dark:hover:text-white hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest no-underline">
          Sign In
        </NuxtLink>
      </template>

      <a href="#" class="bg-gradient-to-r from-neon-cyan to-deep-purple text-white px-6 py-2.5 rounded-full text-[0.7rem] font-bold font-display tracking-widest uppercase no-underline transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95">
        Get Started
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { auth } from '../auth/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useTheme } from '../composables/useTheme';

const { theme, isDark, toggleTheme } = useTheme();

// Biến kiểm soát việc hiển thị nút Partner
const user = ref(null);
const isPartner = ref(false);
const isAdmin = ref(false);
const scrollProgress = ref(0);

const handleScroll = () => {
  if (process.client) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.value = (winScroll / height) * 100;
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    user.value = null;
    isPartner.value = false;
    isAdmin.value = false;
    // Optional: redirect to home
    navigateTo('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  
  // Listen for Auth State
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser) {
      // Check roles if logged in
      checkRoles();
    }
  });
});

const checkRoles = async () => {
  if (process.client && user.value) {
    try {
      const userRoles = await $fetch('/api/auth/user-roles', {
        method: "GET",
      });

      isPartner.value = Array.isArray(userRoles) && userRoles.includes('partner');
      isAdmin.value = Array.isArray(userRoles) && userRoles.includes('admin');
    } catch (error) {
      console.error('Lỗi khi đọc phân quyền:', error.message);
      isPartner.value = false;
      isAdmin.value = false;
    }
  }
};

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.nav-link {
  @apply dark:text-white/60 text-slate-500 hover:text-neon-cyan transition-all text-xs font-bold uppercase tracking-widest no-underline h-full flex items-center pb-1 border-b-2 border-transparent;
}

.nav-active {
  @apply text-neon-cyan border-neon-cyan !important;
}
</style>
