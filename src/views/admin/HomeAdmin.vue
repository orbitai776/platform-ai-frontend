<template>
  <div class="admin-layout min-h-screen bg-slate-50 dark:bg-[#111111] text-slate-900 dark:text-white overflow-hidden relative p-10 font-sans transition-colors duration-500">
    <!-- Ambient Glows -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="dashboard-container mx-auto max-w-7xl space-y-8 relative z-10 selection:bg-indigo-500/30 dark:selection:bg-cyan-500/30">
      <!-- HEADER -->
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 class="text-4xl font-bold text-slate-900 dark:text-white font-grotesk tracking-tight transition-colors">Dashboard</h1>
          <p class="text-slate-500 dark:text-white/40 text-sm mt-1 font-medium uppercase tracking-wider transition-colors">Super Admin Overview & Global Metrics</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex bg-white dark:bg-[#1a1a1a] p-1 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
            <button v-for="t in ['24H', '7D', '30D']" :key="t" 
              class="px-4 py-1.5 rounded-md text-[10px] font-bold transition-all"
              :class="t === '24H' ? 'bg-indigo-600 dark:bg-[#2a2a2a] text-white shadow-lg' : 'text-slate-400 dark:text-white/40 hover:text-indigo-600 dark:hover:text-white'">{{ t }}</button>
          </div>
          <button class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-600 dark:text-white/80 hover:bg-slate-50 dark:hover:bg-[#222] transition-all shadow-sm">
            <span class="material-symbols-outlined text-sm">download</span>
            Export
          </button>
        </div>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(card, index) in statCards" :key="card.label"
          class="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-xl p-6 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-[#1d1d1d] transition-all group shadow-sm hover:shadow-md">
          <div class="flex justify-between items-start mb-8">
            <span class="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest font-black">{{ card.label }}</span>
            <div class="w-10 h-10 rounded-lg bg-slate-50 dark:bg-[#222] border border-slate-100 dark:border-white/5 flex items-center justify-center group-hover:border-indigo-200 dark:group-hover:border-white/10 transition-all">
              <span class="material-symbols-outlined text-slate-400 dark:text-white/40 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                {{ index === 0 ? 'corporate_fare' : index === 1 ? 'group' : index === 2 ? 'dynamic_feed' : 'verified_user' }}
              </span>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div class="text-3xl font-bold text-slate-900 dark:text-white font-grotesk tracking-tight transition-colors">
              {{ index === 3 ? '99.9%' : formatNumber(card.value) }}
            </div>
            <div v-if="index < 3" class="flex items-center gap-1 text-emerald-600 dark:text-[#4ade80] font-bold text-[10px]">
              <span class="material-symbols-outlined text-xs">trending_up</span>
              {{ card.sub }}
            </div>
            <div v-else class="flex items-center gap-2 text-emerald-600 dark:text-[#4ade80] font-bold text-[10px]">
              <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
              Stable
            </div>
          </div>
        </div>
      </div>

      <!-- CHARTS SECTION -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Token Consumption (Donut) -->
        <div class="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-xl p-8 relative overflow-hidden flex flex-col shadow-xl transition-colors">
          <div class="flex justify-between items-start mb-10">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-grotesk transition-colors">Token Allocation</h2>
              <p class="text-slate-400 dark:text-white/40 text-xs mt-1 transition-colors">Distribution across primary AI nodes</p>
            </div>
            <button class="text-slate-300 dark:text-white/20 hover:text-indigo-600 dark:hover:text-white transition-colors">
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div class="flex-1 relative min-h-[300px]">
            <TokenChart :services="rawTopServices" class="h-full" />
          </div>
        </div>

        <!-- Service Performance (Bar) -->
        <div class="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-xl p-8 relative overflow-hidden flex flex-col shadow-xl transition-colors">
          <div class="flex justify-between items-start mb-10">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-grotesk transition-colors">Node Performance</h2>
              <p class="text-slate-400 dark:text-white/40 text-xs mt-1 transition-colors">Comparative throughput analysis</p>
            </div>
            <button class="text-slate-300 dark:text-white/20 hover:text-indigo-600 dark:hover:text-white transition-colors">
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div class="flex-1 relative min-h-[300px]">
            <BarChart :services="rawTopServices" class="h-full" />
          </div>
        </div>
      </div>

      <!-- LOWER GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- LOGS -->
        <div class="lg:col-span-4 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-xl p-8 flex flex-col shadow-lg transition-colors">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white font-grotesk tracking-tight transition-colors">Recent System Logs</h3>
            <button class="text-[10px] font-bold text-slate-400 dark:text-white/40 hover:text-indigo-600 dark:hover:text-white uppercase tracking-widest transition-colors">View All</button>
          </div>
          <div class="space-y-6 flex-1">
            <div v-for="log in systemLogs" :key="log.time" class="flex gap-4">
              <div class="mt-1">
                <span v-if="log.type === 'CRITICAL'" class="material-symbols-outlined text-rose-500 text-lg">error</span>
                <span v-else class="material-symbols-outlined text-amber-500 text-lg">warning</span>
              </div>
              <div class="flex-1 space-y-1">
                <div class="flex justify-between items-center">
                  <span class="px-2 py-0.5 rounded text-[8px] font-black tracking-widest" :class="log.type === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'">{{ log.type }}</span>
                  <span class="text-[10px] text-slate-400 dark:text-white/20 font-mono transition-colors">{{ log.time }}</span>
                </div>
                <p class="text-xs font-bold text-slate-700 dark:text-white/80 line-clamp-1 transition-colors">{{ log.msg }}</p>
                <p class="text-[10px] text-slate-400 dark:text-white/30 line-clamp-1 italic transition-colors">{{ log.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ORGS TABLE -->
        <div class="lg:col-span-8 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/5 rounded-xl p-8 flex flex-col shadow-lg transition-colors">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white font-grotesk tracking-tight transition-colors">Top Organizations by Usage</h3>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 text-sm transition-colors">search</span>
              <input type="text" placeholder="Search orgs..." class="bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-white/80 outline-none focus:border-indigo-500 dark:focus:border-white/20 w-full md:w-64 transition-all" />
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-slate-400 dark:text-white/20 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100 dark:border-white/5 transition-colors">
                  <th class="pb-4">Organization</th>
                  <th class="pb-4 text-center">Tier</th>
                  <th class="pb-4 text-center">Tokens</th>
                  <th class="pb-4 text-center">Cost (EST)</th>
                </tr>
              </thead>
              <tbody class="text-[11px]">
                <tr v-for="org in organizationData" :key="org.id || org.name" class="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all group">
                  <td class="py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded bg-slate-100 dark:bg-[#222] border border-slate-200 dark:border-white/5 flex items-center justify-center font-bold text-slate-400 dark:text-white/40 uppercase transition-colors">{{ (org.name || 'A').charAt(0) }}</div>
                      <div class="flex flex-col">
                        <span class="font-bold text-slate-700 dark:text-white/80 transition-colors">{{ org.name }}</span>
                        <span class="text-[9px] text-slate-400 dark:text-white/20 font-mono transition-colors">{{ org.id || 'org_id_123' }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-5 text-center">
                    <span class="px-2 py-1 rounded bg-slate-100 dark:bg-[#222] border border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest text-[8px] transition-colors">{{ org.tier || 'Enterprise' }}</span>
                  </td>
                  <td class="py-5 text-center font-bold text-slate-500 dark:text-white/60 transition-colors">{{ org.tokens }}</td>
                  <td class="py-5 text-center font-bold text-slate-500 dark:text-white/60 transition-colors">{{ org.cost }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDashboard } from '~/src/composables/useDashboard'
import TokenChart from '~/src/components/admin/TokenChart'
import BarChart from '~/src/components/admin/BarChart'

const { statCards, tableData, topServices, fetchDashboard, loading } = useDashboard()
const rawTopServices = topServices

const systemLogs = ref([
  { type: 'CRITICAL', time: '10:42:05 UTC', msg: 'API Rate limit exceeded for org_9...', desc: 'Service endpoint /v1/completions throttled...' },
  { type: 'WARN', time: '10:38:12 UTC', msg: 'High memory usage detected on nod...', desc: 'Memory allocation reached 85% of capacity.' }
])

const organizationData = computed(() => {
  if (tableData.value && tableData.value.length > 0) {
    return tableData.value.map(s => ({
       name: s.name,
       id: `node_${s.name.toLowerCase().replace(/\s+/g, '_')}`,
       tier: s.type,
       tokens: formatNumber(s.tokens),
       cost: `$${formatNumber(s.tokens * 0.0003)}`,
    }))
  }
  return [
    { name: 'Acme Corp', id: 'org_8a92b1c', tier: 'Enterprise', tokens: '14.2M', cost: '$4,260.00', status: 'Active' },
    { name: 'Global Industries', id: 'org_3x7f9y2', tier: 'Enterprise', tokens: '9.8M', cost: '$2,940.00', status: 'Active' },
    { name: 'Nexus Tech', id: 'org_5p2q8r4', tier: 'Pro', tokens: '5.1M', cost: '$1,530.00', status: 'Throttled' }
  ]
})

onMounted(async () => {
  await fetchDashboard()
})

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num || 0)
}
</script>

<style scoped>
.font-grotesk {
  font-family: 'Space Grotesk', sans-serif;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.1);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

table {
  border-spacing: 0;
}

tr:last-child td {
  border-bottom: 0;
}
</style>