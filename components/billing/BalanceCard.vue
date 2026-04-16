<template>
  <section class="relative">
    <div class="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
      <div class="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 mb-4 font-black flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            ĐỐI TÁC: {{ partnerName }}
          </p>
          <div class="flex items-end gap-3">
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-white">
              {{ formattedBalance }} 
            </h1>
            <div class="pb-2 md:pb-4 flex flex-col">
              <span class="text-xl md:text-2xl font-black text-slate-600 uppercase tracking-tighter">TKN</span>
              <button @click="handleRefresh" 
                      :disabled="isRefreshing"
                      class="flex items-center gap-1 text-[10px] font-black uppercase text-blue-500 hover:text-blue-400 transition-colors disabled:opacity-50 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" :class="{'animate-spin': isRefreshing}" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ isRefreshing ? 'Đang cập nhật...' : 'Làm mới' }}
              </button>
            </div>
          </div>
        </div>
        
        <button @click="$emit('open-modal')" class="group relative flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-lg rounded-2xl hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300 active:scale-95">
          <div class="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nạp Token ngay
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Khai báo sự kiện để bắn lên cha (Emits)
defineEmits(['open-modal'])

const isRefreshing = ref(false)

// 1. Lấy thông tin Profile Đối tác
const { data: profile } = await useFetch('/api/auth/user-profile')
const partnerName = computed(() => profile.value?.displayName || 'Đối tác AI')

// 2. Lấy số dư từ API
const headers = useRequestHeaders(['cookie'])
const { data: balanceData, refresh: refreshBalanceData } = await useFetch('/api/partner/billing/balance', { 
  headers,
  key: 'billing_balance'
})

// 3. Tính toán số dư khả dụng một cách reactive
const availableBalance = computed(() => {
  if (!balanceData.value) return 0
  
  // Ưu tiên format data từ backend nếu có field balance trực tiếp
  if (balanceData.value.data?.balance !== undefined) return balanceData.value.data.balance
  if (balanceData.value.balance !== undefined) return balanceData.value.balance

  // Hoặc tự tính toán từ tokens và used
  const available = balanceData.value.available_tokens ?? 0
  const used = balanceData.value.total_used ?? 0
  return available - used
})

const formattedBalance = computed(() => {
  return new Intl.NumberFormat().format(availableBalance.value)
})

// Hàm xử lý làm mới thủ công
const handleRefresh = async () => {
  isRefreshing.value = true
  await refreshBalanceData()
  // Giả lập delay một chút để người dùng cảm nhận được việc làm mới
  setTimeout(() => {
    isRefreshing.value = false
  }, 500)
}
</script>