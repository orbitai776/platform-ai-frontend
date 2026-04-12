<template>
  <nav class="bg-[#0d0d12] sticky top-0 z-[100]">
    <div class="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">

      <div class="font-['Sora'] font-extrabold text-[1.2rem] text-white tracking-tight flex items-center gap-2">
        <span class="w-2 h-2 bg-[#e8604c] rounded-full inline-block"></span>
        Orbit AI
      </div>

      <ul class="hidden md:flex gap-8 list-none m-0 p-0">
        <li>
          <NuxtLink to="/about" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Tính năng</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/billing" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Báo giá</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Demo</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/news" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Tin tức</NuxtLink>
        </li>
         
      </ul>

      <div class="flex items-center gap-3">
        <NuxtLink 
          v-if="isPartner" 
          to="/partner" 
          class="hidden sm:inline-flex items-center gap-2 text-[#e8604c] text-[0.8rem] px-[0.9rem] py-[0.4rem] border border-[#e8604c]/30 bg-[#e8604c]/10 rounded-sm font-['Sora'] tracking-[0.04em] transition-all duration-200 hover:bg-[#e8604c]/20 hover:border-[#e8604c]/50 no-underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
          </svg>
          Partner Portal
        </NuxtLink>

        <template v-if="isLoggedIn">
          <NuxtLink to="/profile" class="hidden sm:inline-block text-white/65 text-[0.8rem] px-[0.9rem] py-[0.4rem] border border-white/20 rounded-sm font-['Sora'] tracking-[0.04em] transition-all duration-200 hover:text-white hover:border-white/50 no-underline">
            Profile
          </NuxtLink>
          <button @click="handleLogout" class="hidden sm:inline-block text-white/65 text-[0.8rem] px-[0.9rem] py-[0.4rem] border border-red-500/50 text-red-400 rounded-sm font-['Sora'] tracking-[0.04em] transition-all duration-200 hover:text-red-300 hover:border-red-400 hover:bg-red-500/10 no-underline cursor-pointer">
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/user/login" class="hidden sm:inline-block text-white/65 text-[0.8rem] px-[0.9rem] py-[0.4rem] border border-white/20 rounded-sm font-['Sora'] tracking-[0.04em] transition-all duration-200 hover:text-white hover:border-white/50 no-underline">
            Login
          </NuxtLink>
        </template>

        <NuxtLink to="#" class="bg-[#e8604c] text-white px-5 py-2 rounded-sm text-[0.8rem] font-semibold font-['Sora'] tracking-[0.06em] uppercase no-underline transition-all duration-200 hover:bg-[#d94e3a] hover:-translate-y-px">
          Tư vấn miễn phí →
        </NuxtLink>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCookie, useRouter } from '#imports';

// --- Partner logic from DEV ---
const isPartner = ref(false);

onMounted(() => {
  // Vì Navbar chạy trên Client, ta cần kiểm tra localStorage an toàn
  if (process.client) {
    try {
      const rolesString = localStorage.getItem('userRoles');
      
      if (rolesString) {
        // Dịch chuỗi JSON thành mảng
        const rolesArray = JSON.parse(rolesString);
        
        // Nếu trong mảng có chứa chữ 'partner', bật biến isPartner lên true
        if (Array.isArray(rolesArray) && rolesArray.includes('partner')) {
          isPartner.value = true;
        }
      }
    } catch (error) {
      console.error("Lỗi khi đọc phân quyền từ localStorage:", error);
    }
  }
});

// --- Auth logic from HEAD ---

// Import Firebase auth directly if possible, or gracefully handle errors finding it
const logoutFirebase = async () => {
  try {
    const { auth, signOut } = await import('~/src/auth/firebase.js');
    if (auth && signOut) {
      await signOut(auth);
    }
  } catch (err) {
    console.warn("Could not load Firebase auth module for logout:", err);
  }
};

const token = useCookie('token');
const isLoggedIn = computed(() => !!token.value);
const router = useRouter();

const handleLogout = async () => {
  // Clear token
  token.value = null;
  // Clear local storage
  if (process.client) {
    localStorage.removeItem('partnerAuthUser');
  }
  // Call Firebase signout
  await logoutFirebase();
  
  // Navigate home
  router.push('/');
};
</script>
