<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
    <main class="pt-12 px-4 md:px-8 max-w-5xl mx-auto space-y-10">
      
      <BillingBalanceCard 
        :balance="balance" 
        :partnerName="partnerName"
        @open-modal="showModal = true" 
      />

      <BillingHistoryTable :history="history" />

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
      const { data } = await useFetch('/api/user/auth')
      
      // Nếu không có dữ liệu (token sai/hết hạn/không có) -> Đá văng về trang chủ
      if (!data.value) {
        return navigateTo('/') 
      }
    }
  ]
})

// 📦 BƯỚC 2: LẤY DỮ LIỆU ĐỂ HIỂN THỊ
// Fetch profile để lấy tên hiển thị (nếu cần, auth.get.ts vẫn đang mock)
const { data: profileData } = await useFetch('/api/user/auth')

// Fetch balance và payments list từ endpoint mới
const { data: balanceData } = await useFetch('/api/partner/billing/balance')
const { data: paymentsData } = await useFetch('/api/partner/billing/payments/list')

import { computed } from 'vue'

const balance = computed(() => balanceData.value?.data?.balance ?? balanceData.value?.balance ?? 0)
const history = computed(() => paymentsData.value?.data?.list ?? paymentsData.value?.data ?? paymentsData.value ?? [])
const partnerName = computed(() => balanceData.value?.data?.partnerName ?? profileData.value?.user?.username ?? profileData.value?.user?.name ?? 'Partner')

// Quản lý đóng mở Modal
const showModal = ref(false)
</script>