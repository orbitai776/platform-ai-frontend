<template>
  <section class="relative">
    <div class="bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
      <div class="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p class="text-sm uppercase tracking-widest text-slate-400 mb-3 font-semibold">
            ĐỐI TÁC: {{ partnerName }}
          </p>
          <h1 class="text-6xl md:text-8xl font-black tracking-tight text-white">
            {{ data.balance }} <span class="text-3xl md:text-4xl font-medium text-slate-600">TKN</span>
          </h1>
        </div>
        
        <button @click="$emit('open-modal')" class="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nạp thêm Token
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
const data = ref({
  balance: 0
})

// Khai báo sự kiện để bắn lên cha (Emits)
defineEmits(['open-modal'])

// Gọi API trực tiếp từ Component
const headers = useRequestHeaders(['cookie'])
const { data: balanceData } = await useFetch('/api/partner/billing/balance', { headers })

const availableTokens = balanceData.value?.available_tokens ?? 0
const totalUsed = balanceData.value?.total_used ?? 0

data.value.balance = availableTokens - totalUsed


// Map dữ liệu
const balance = computed(() => balanceData.value?.data?.balance ?? balanceData.value?.balance ?? 0)
</script>