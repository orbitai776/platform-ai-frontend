<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex items-end justify-between mb-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight transition-colors">Dashboard</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm mt-1 transition-colors">Real-time telemetry for active deployments.</p>
      </div>
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest transition-colors">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
        System Operational
      </span>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <!-- Token Usage Chart -->
      <div class="col-span-12 xl:col-span-8 glass-card rounded-2xl p-8 flex flex-col relative overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <div class="flex justify-between items-start mb-8 z-10">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">Token Utilization</h2>
            <p class="text-xs text-slate-400 dark:text-white/40 mt-1 uppercase tracking-widest font-bold transition-colors">Last 7 days computation volume</p>
          </div>
          <div class="text-right">
            <div class="text-5xl font-bold text-cyan-600 dark:text-cyan-400 font-['Space_Grotesk'] shimmer-text transition-colors">4.2M</div>
            <div class="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest mt-1 transition-colors">+12.5% VS LAST WEEK</div>
          </div>
        </div>
        <div class="flex-1 flex items-end justify-between gap-2 mt-4 z-10 h-32">
          <div v-for="(h, i) in [40, 60, 35, 80, 100, 65, 45]" :key="i" class="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm relative group cursor-pointer transition-colors">
            <div :style="{ height: h + '%' }" class="absolute bottom-0 w-full transition-all group-hover:brightness-125" :class="i === 4 ? 'bg-gradient-to-t from-cyan-600/20 dark:from-cyan-500/20 to-cyan-600 dark:to-cyan-400 shadow-[0_-5px_15px_rgba(0,240,255,0.4)]' : 'bg-gradient-to-t from-purple-600/20 to-purple-500/60'"></div>
          </div>
        </div>
      </div>

      <!-- Service Health -->
      <div class="col-span-12 xl:col-span-4 glass-card rounded-2xl p-8 flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-8 transition-colors">Service Health</h2>
        <div class="space-y-4">
          <div v-for="s in healthServices" :key="s.name" class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-lg text-slate-400 dark:text-white/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" style="font-variation-settings: 'FILL' 1;">{{ s.icon }}</span>
              <span class="text-sm font-medium text-slate-700 dark:text-white/80 transition-colors">{{ s.name }}</span>
            </div>
            <span class="text-[10px] font-bold flex items-center gap-1.5 transition-colors" :class="s.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' : s.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-white/20'">{{ s.status }}</span>
          </div>
        </div>
      </div>

      <!-- Deployments Table -->
      <div class="col-span-12 glass-card rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-700 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">Active Deployments</h2>
          <button class="luminous-btn px-4 py-2 rounded-lg text-[10px] font-bold text-white dark:text-black uppercase tracking-widest shadow-lg dark:shadow-none">New Deployment</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-white/20 font-bold uppercase tracking-[0.2em] transition-colors">
                <th class="pb-4">Name</th><th class="pb-4">Model</th><th class="pb-4">Latency</th><th class="pb-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="service in (services.length > 0 ? services : defaultServices)" :key="service.name" class="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td class="py-5 text-slate-900 dark:text-white font-semibold transition-colors">{{ service.name }}</td>
                <td class="py-5 text-slate-500 dark:text-white/40 transition-colors">{{ service.type || 'Orbit Pro v2.4' }}</td>
                <td class="py-5 text-slate-500 dark:text-white/40 font-mono transition-colors">{{ service.latency || '24ms' }}</td>
                <td class="py-5 text-right">
                  <span class="px-3 py-1 rounded-md text-[10px] font-bold uppercase border transition-all" :class="service.status === 'active' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 border-slate-200 dark:border-white/10'">{{ service.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import usePartnerServices from '~/src/composables/useServices'
import { onMounted } from 'vue'

const { services, fetchServices } = usePartnerServices()

const healthServices = [
  { name: 'Inference Core', status: '99.9%', color: 'cyan', icon: 'dns' },
  { name: 'API Gateway', status: '99.8%', color: 'purple', icon: 'api' },
  { name: 'Vector Store', status: 'Syncing', color: 'slate', icon: 'database' }
]

const defaultServices = [
  { name: 'prod-chat-us-east', type: 'Orbit Pro v2.4', latency: '42ms', status: 'active' },
  { name: 'dev-embedding-eu', type: 'Orbit Embed v1', latency: '18ms', status: 'active' }
]

onMounted(async () => {
  await fetchServices()
})
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.luminous-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  transition: all 0.3s ease;
}

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
