<template>
  <div class="glass-container rounded-[2rem] p-10 flex flex-col relative overflow-hidden group animate-in slide-in-from-left-4 duration-700 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none transition-colors duration-500">
    <!-- Background Icon Decoration -->
    <div class="absolute top-0 right-0 p-10 pointer-events-none">
      <span class="material-symbols-outlined text-slate-100 dark:text-white/[0.03] text-[180px] select-none rotate-12 transition-all duration-700 group-hover:rotate-0">payments</span>
    </div>

    <div class="relative z-10">
      <div class="flex items-center gap-3 text-slate-400 dark:text-white/40 mb-10 transition-colors">
        <span class="material-symbols-outlined text-cyan-600 dark:text-cyan-400">account_balance_wallet</span>
        <span class="font-bold uppercase tracking-[0.3em] text-[10px]">Current Compute Balance</span>
      </div>

      <div class="flex items-baseline gap-6 mb-4 transition-all">
        <span class="text-8xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Space_Grotesk'] shimmer-text transition-colors">
          {{ formattedBalanceValue }}
        </span>
        <span class="text-2xl font-bold text-cyan-600 dark:text-cyan-400 font-['Space_Grotesk'] tracking-widest uppercase transition-colors">Tokens</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 transition-colors">
          <span class="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-sm transition-colors">schedule</span>
          <p class="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest transition-colors">
            ~45 hours of high-density runtime remaining
          </p>
        </div>
        <button @click="handleRefresh" 
                :disabled="isRefreshing"
                class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-50">
          <span class="material-symbols-outlined text-sm" :class="{'animate-spin': isRefreshing}">refresh</span>
          {{ isRefreshing ? 'Syncing...' : 'Sync Data' }}
        </button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="mt-12 pt-10 grid grid-cols-2 gap-8 relative z-10 border-t border-slate-100 dark:border-white/5 transition-colors">
      <div class="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl p-6 group/stat hover:border-rose-500/30 transition-all shadow-sm dark:shadow-none">
        <div class="text-[9px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3 font-bold group-hover/stat:text-slate-900 dark:group-hover/stat:text-white/50 transition-colors">Weekly Burn Rate</div>
        <div class="text-3xl font-bold text-rose-600 dark:text-red-400 font-['Space_Grotesk'] transition-colors">24.5k <span class="text-xs font-medium opacity-40 uppercase transition-colors">/ day</span></div>
      </div>
      <div class="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl p-6 group/stat hover:border-cyan-500/30 transition-all shadow-sm dark:shadow-none">
        <div class="text-[9px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3 font-bold group-hover/stat:text-slate-900 dark:group-hover/stat:text-white/50 transition-colors">Active Compute Nodes</div>
        <div class="text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">12 <span class="text-xs font-medium opacity-40 uppercase tracking-widest ml-1 transition-colors">Clusters</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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

// 3. Tính toán số dư
const availableBalance = computed(() => {
  if (!balanceData.value) return 0
  if (balanceData.value.data?.balance !== undefined) return balanceData.value.data.balance
  if (balanceData.value.balance !== undefined) return balanceData.value.balance
  const available = balanceData.value.available_tokens ?? 0
  const used = balanceData.value.total_used ?? 0
  return available - used
})

const formattedBalanceValue = computed(() => {
  const val = availableBalance.value
  if (val >= 1000000) {
    return (val / 1000000).toFixed(1) + 'M'
  }
  return new Intl.NumberFormat().format(val)
})

const handleRefresh = async () => {
  isRefreshing.value = true
  await refreshBalanceData()
  setTimeout(() => { isRefreshing.value = false }, 800)
}
</script>

<style scoped>
.shimmer-text {
  display: inline-block;
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 5s linear infinite;
  background-image: linear-gradient(90deg, #1e293b, #00f0ff, #1e293b);
  transition: color 0.5s;
}

.dark .shimmer-text {
  background-image: linear-gradient(90deg, #fff, #00f0ff, #fff);
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
</style>