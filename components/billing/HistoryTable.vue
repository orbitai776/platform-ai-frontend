<template>
  <div class="glass-container rounded-[2rem] p-10 animate-in slide-in-from-bottom-4 duration-700 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none transition-colors duration-500">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h3 class="font-['Space_Grotesk'] text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Transaction History</h3>
        <p class="text-xs text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mt-1 font-bold transition-colors">Comprehensive allocation logs</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
        <span class="material-symbols-outlined text-sm">download</span>
        Export CSV
      </button>
    </div>

    <div class="overflow-x-auto min-h-[400px] custom-scrollbar">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 font-bold transition-colors">
            <th class="pb-6">Execution Date</th>
            <th class="pb-6">Transaction Hash</th>
            <th class="pb-6 text-right">Allocation</th>
            <th class="pb-6 text-right">Value (VND)</th>
            <th class="pb-6 text-center">Gateway</th>
            <th class="pb-6 text-right">Status</th>
          </tr>
        </thead>
        <tbody class="text-sm text-slate-700 dark:text-white/80 divide-y divide-slate-100 dark:divide-white/5">
          <tr v-for="tx in history" :key="tx.id" class="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all duration-300">
            <td class="py-6 text-slate-400 dark:text-white/40 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              <div>{{ tx.date }}</div>
              <div class="text-[10px] opacity-60 mt-0.5">{{ tx.time }}</div>
            </td>
            <td class="py-6 font-mono text-xs text-slate-300 dark:text-white/20 group-hover:text-cyan-600 dark:group-hover:text-cyan-400/60 transition-colors uppercase">{{ tx.id }}</td>
            <td class="py-6 text-right font-bold text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform origin-right">
              + {{ formatNumber(tx.tokenAmount) }}
            </td>
            <td class="py-6 text-right font-['Space_Grotesk'] font-bold text-slate-500 dark:text-white/60 transition-colors">{{ formatCurrency(tx.amount) }}</td>
            <td class="py-6 text-center">
              <span class="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 group-hover:border-cyan-600/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all">
                {{ tx.method }}
              </span>
            </td>
            <td class="py-6 text-right">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all" :class="getStatusStyles(tx.status)">
                <span class="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] animate-pulse" :class="tx.status === 'success' || tx.status === 'completed' ? 'bg-cyan-600 dark:bg-cyan-400' : 'bg-amber-500'"></span>
                <span class="text-[9px] font-bold uppercase tracking-widest">{{ getStatusText(tx.status) }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="!history?.length && !pending" class="flex flex-col items-center justify-center py-24 text-center">
        <div class="w-20 h-20 rounded-full bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex items-center justify-center mb-6 transition-colors">
          <span class="material-symbols-outlined text-slate-200 dark:text-white/10 text-4xl">inbox</span>
        </div>
        <h3 class="text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest text-xs transition-colors">No active transactions</h3>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between transition-colors">
       <span class="text-[10px] text-slate-300 dark:text-white/20 uppercase font-bold tracking-widest transition-colors">Page {{ currentPage }} of {{ totalPages }}</span>
       <div class="flex gap-2">
          <button @click="prevPage" :disabled="currentPage <= 1" class="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-20 transition-all">
             <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-20 transition-all">
             <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const headers = useRequestHeaders(['cookie'])
const currentPage = ref(1)
const pageSize = ref(5)

const { data: paymentsData, pending, refresh } = await useFetch('/api/partner/billing/payments/list', { 
  headers,
  query: computed(() => ({ 
    page: currentPage.value, 
    page_size: pageSize.value 
  })),
  lazy: true,
  server: false
})

const totalCount = computed(() => {
  const res = paymentsData.value
  return res?.count ?? res?.data?.count ?? res?.total ?? res?.data?.total ?? 0
})
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / pageSize.value)))

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const history = computed(() => {
  const res = paymentsData.value
  const rawList = res?.results ?? res?.data?.results ?? (Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []))
  
  if (!Array.isArray(rawList)) return []
  
  // If API doesn't support server-side pagination (returns all), we do it here
  const displayList = (rawList.length > pageSize.value) 
    ? rawList.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
    : rawList

  return displayList.map(tx => {
    const { date, time } = formatDateTime(tx.created_at)
    return {
      id: tx.transaction_id || tx.id?.substring(0, 8) || '---',
      tokenAmount: tx.token_amount || 0,
      amount: tx.amount || 0,
      method: tx.payment_method || 'PAYOS',
      date: date,
      time: time,
      status: tx.status?.toLowerCase() || 'pending'
    }
  })
})

const formatNumber = (val) => new Intl.NumberFormat('vi-VN').format(Math.floor(Number(val)))
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN').format(Number(val))
const formatDateTime = (dateStr) => {
  if (!dateStr) return { date: '---', time: '---' }
  const d = new Date(dateStr)
  return {
    date: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(d),
    time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
  }
}

const getStatusStyles = (status) => {
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  if (status === 'success' || status === 'completed') {
    return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.1)]'
  }
  return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
}

const getStatusText = (status) => {
  if (status === 'success' || status === 'completed') return 'Success'
  if (status === 'pending') return 'Pending'
  return status
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 240, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 240, 255, 0.3);
}

/* Hide scrollbar for IE, Edge and Firefox */
.custom-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: thin;  /* Firefox */
  scrollbar-color: rgba(0, 240, 255, 0.1) transparent;
}
</style>
