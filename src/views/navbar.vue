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
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Tính năng</a>
        </li>
        <li>
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Báo giá</a>
        </li>
        <li>
          <a href="#" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Demo</a>
        </li>
        <li>
          <NuxtLink to="/news" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Tin tức</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/billing" class="text-white/65 no-underline text-sm transition-colors duration-200 hover:text-white">Billing</NuxtLink>
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

        <NuxtLink to="/profile" class="hidden sm:inline-block text-white/65 text-[0.8rem] px-[0.9rem] py-[0.4rem] border border-white/20 rounded-sm font-['Sora'] tracking-[0.04em] transition-all duration-200 hover:text-white hover:border-white/50 no-underline">
          Profile
        </NuxtLink>
        
        <a href="#" class="bg-[#e8604c] text-white px-5 py-2 rounded-sm text-[0.8rem] font-semibold font-['Sora'] tracking-[0.06em] uppercase no-underline transition-all duration-200 hover:bg-[#d94e3a] hover:-translate-y-px">
          Tư vấn miễn phí →
        </a>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Biến kiểm soát việc hiển thị nút Partner
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
</script>