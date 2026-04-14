<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
    <main class="pt-12 px-4 md:px-8 max-w-5xl mx-auto space-y-10">
      
      <BillingBalanceCard 
        @open-modal="showModal = true" 
      />

      <BillingHistoryTable />

      <hr class="border-slate-800 my-16 opacity-50">

      <BillingPricingCards />

    </main>

    <BillingTopupModal 
      v-if="showModal" 
      @close-modal="showModal = false" 
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'

// 🛡️ BƯỚC 1: LÍNH GÁC CHẶN CỬA (Middleware)
// Chạy trên cả Server và Client để check quyền truy cập
definePageMeta({
  middleware: [
    async function (to, from) {
      // Gọi API check auth. Nếu có token HttpOnly, Server sẽ tự đính kèm vào request này
      const { data } = await useFetch('/api/auth/login')
      
      // Nếu không có dữ liệu (token sai/hết hạn/không có) -> Đá văng về trang chủ
      if (!data.value) {
        return navigateTo('/') 
      }
    }
  ]
})

// Quản lý đóng mở Modal cho Topup
const showModal = ref(false)
</script>