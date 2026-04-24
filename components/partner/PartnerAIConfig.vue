<template>
  <div class="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
    <!-- Page Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight transition-colors">Resource <span class="shimmer-text">Allocation</span></h1>
        <p class="text-slate-500 dark:text-white/40 text-sm mt-1 max-w-xl transition-colors">Manage model deployment types, enforce token quotas, and monitor computational throughput.</p>
      </div>
      <div class="flex gap-4">
        <button class="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all">Export Log</button>
        <button @click="$emit('save')" class="luminous-btn px-6 py-2.5 rounded-xl text-[10px] font-bold text-white dark:text-black uppercase tracking-widest shadow-lg dark:shadow-none transition-all">Save Config</button>
      </div>
    </div>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-12 gap-8">
      <!-- Visualization Card (Wide) -->
      <div class="col-span-12 xl:col-span-8 glass-card rounded-3xl p-10 flex flex-col gap-8 relative group overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/5 dark:bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/10 dark:group-hover:bg-cyan-500/20 transition-all duration-700"></div>
        
        <div class="flex justify-between items-start relative z-10">
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">Global Token Throughput</h3>
            <p class="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mt-1 font-bold transition-colors">Current Billing Cycle</p>
          </div>
          <div class="bg-slate-50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-slate-100 dark:border-white/5 flex items-center gap-2 transition-colors">
            <div class="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            <span class="text-[9px] font-bold text-slate-500 dark:text-white uppercase tracking-widest transition-colors">Live Sync</span>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-10 items-end relative z-10">
          <div class="flex-1 w-full">
            <div class="flex items-baseline gap-3 mb-4 transition-colors">
              <span class="text-6xl font-bold text-cyan-600 dark:text-cyan-400 font-['Space_Grotesk']">4.2M</span>
              <span class="text-sm text-slate-400 dark:text-white/20">/ 10M Limit</span>
            </div>
            <!-- Custom Progress Bar -->
            <div class="w-full h-2.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative transition-colors">
              <div class="absolute top-0 left-0 h-full w-[42%] bg-gradient-to-r from-indigo-600 dark:from-purple-600 to-cyan-600 dark:to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] rounded-full transition-all"></div>
              <div class="absolute top-0 left-[65%] h-full w-[1px] bg-slate-200 dark:bg-white/20 z-10 transition-colors"></div>
            </div>
            <div class="flex justify-between mt-3 text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest transition-colors">
              <span>0</span>
              <span>Projected: 6.5M</span>
              <span>10M MAX</span>
            </div>
          </div>
          <!-- Mini stats -->
          <div class="flex flex-row md:flex-col gap-4 shrink-0">
            <div class="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 min-w-[140px] transition-colors">
              <span class="text-[9px] text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest block mb-2 transition-colors">Avg Latency</span>
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">124ms</span>
            </div>
            <div class="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 min-w-[140px] transition-colors">
              <span class="text-[9px] text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest block mb-2 transition-colors">Active Models</span>
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">3 Types</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Global Policy Card (Narrow) -->
      <div class="col-span-12 xl:col-span-4 glass-card rounded-3xl p-10 flex flex-col gap-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-2 transition-colors">Failover Policy</h3>
          <p class="text-xs text-slate-500 dark:text-white/40 leading-relaxed transition-colors">Automated fallback logic when primary model limits are saturated.</p>
        </div>
        <div class="flex flex-col gap-4 mt-auto">
          <label v-for="policy in [
            { id: 'local', label: 'Drop to Local LLM', icon: 'psychology', active: true },
            { id: 'stop', label: 'Hard Stop Requests', icon: 'block', active: false }
          ]" :key="policy.id" 
            class="flex items-center justify-between p-4 rounded-2xl border bg-slate-50 dark:bg-white/5 cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-white/10"
            :class="policy.active ? 'border-cyan-500/40' : 'border-slate-100 dark:border-white/5'">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-lg transition-colors" :class="policy.id === 'stop' ? 'text-rose-500 dark:text-red-400' : 'text-indigo-600 dark:text-purple-400'">{{ policy.icon }}</span>
              <span class="text-xs font-bold text-slate-700 dark:text-white/80 uppercase tracking-widest transition-colors">{{ policy.label }}</span>
            </div>
            <div class="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center transition-colors">
              <div v-if="policy.active" class="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>
          </label>
        </div>
      </div>

      <!-- Section Title -->
      <div class="col-span-12 mt-4 flex items-center gap-6">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">Node Configuration</h2>
        <div class="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent transition-all"></div>
      </div>

      <!-- Node Cards -->
      <div v-for="node in nodes" :key="node.id" class="col-span-12 lg:col-span-6 glass-card rounded-3xl p-10 flex flex-col gap-8 group hover:border-cyan-500/30 transition-all duration-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none">
        <div class="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-6 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-inner transition-colors">
              <span class="material-symbols-outlined text-xl transition-colors" :class="node.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' : 'text-indigo-600 dark:text-purple-400'">{{ node.icon }}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">{{ node.name }}</h3>
          </div>
          <span class="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all" 
            :class="node.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/30 border-slate-200 dark:border-white/10'">
            {{ node.tier }}
          </span>
        </div>

        <div class="space-y-3">
          <span class="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] transition-colors">Authorized Model Architecture</span>
          <div class="flex flex-wrap gap-2">
            <button v-for="m in node.models" :key="m" 
              class="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all"
              :class="m === node.activeModel ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 shadow-sm' : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/30 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'">
              {{ m }}
            </button>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-black/40 p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6 transition-colors">
          <div class="flex justify-between items-end">
            <span class="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] transition-colors">Monthly Token Quota</span>
            <div class="flex items-center gap-2">
              <input type="text" :value="node.quota?.toLocaleString() || '0'" class="bg-transparent border-b border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-right text-lg focus:border-cyan-600 dark:focus:border-cyan-400 outline-none w-32 pb-1 transition-all" />
              <span class="text-[10px] text-slate-400 dark:text-white/20 font-bold transition-colors">TKN</span>
            </div>
          </div>
          <div class="relative h-2 bg-slate-200 dark:bg-white/5 rounded-full transition-colors">
            <div class="absolute h-full rounded-full bg-gradient-to-r from-indigo-600 dark:from-purple-600 to-cyan-600 dark:to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all" :style="{ width: (node.quota / 10000000 * 100) + '%' }"></div>
            <div class="absolute w-5 h-5 bg-white dark:bg-cyan-400 border-2 border-cyan-600 dark:border-transparent rounded-full top-1/2 -translate-y-1/2 shadow-lg dark:shadow-[0_0_15px_rgba(0,240,255,1)] cursor-pointer transition-all" :style="{ left: (node.quota / 10000000 * 100) + '%' }"></div>
          </div>
          <div class="flex justify-between text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest transition-colors">
            <span>0</span>
            <span>10M MAX</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['save'])

const nodes = ref([
  { id: 'eng', name: 'Engineering Core', icon: 'terminal', tier: 'Priority Tier 1', models: ['GPT-4 Turbo', 'Claude 3 Opus', 'Local Mistral'], activeModel: 'GPT-4 Turbo', quota: 5000000, color: 'cyan' },
  { id: 'mkt', name: 'Marketing Automation', icon: 'campaign', tier: 'Standard Tier', models: ['GPT-4 Turbo', 'Claude 3.5 Sonnet'], activeModel: 'Claude 3.5 Sonnet', quota: 2500000, color: 'purple' }
]);
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
