<template>
  <div class="space-y-10 animate-in slide-in-from-right-4 duration-500">
    <div class="flex items-end justify-between mb-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight transition-colors">Billing & Credits</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm mt-1 transition-colors">Financial telemetry and compute allocation management.</p>
      </div>
      <button @click="$emit('topup')" class="deposit-btn px-6 py-2.5 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 shadow-lg">
        <span class="material-symbols-outlined text-sm">add_card</span>
        Instant Top-up
      </button>
    </div>

    <div class="grid grid-cols-12 gap-10">
      <!-- Left: Wallet & History -->
      <div class="col-span-12 xl:col-span-8 space-y-10">
        <BillingBalanceCard />
        <BillingHistoryTable />
      </div>
      <!-- Right: Quick Action / Status -->
      <div class="col-span-12 xl:col-span-4 space-y-10">
        <div class="glass-card rounded-[2rem] p-10 flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
           <div class="flex items-center gap-3 text-slate-900 dark:text-white mb-8 transition-colors">
             <span class="material-symbols-outlined text-cyan-600 dark:text-cyan-400">speed</span>
             <h3 class="font-['Space_Grotesk'] text-xl font-bold">Session Parameters</h3>
           </div>
           <div class="space-y-6">
              <div v-for="p in [{n:'Auto-Refill', s:'Disabled', c:'slate-400 dark:text-white/20'}, {n:'Max Burn Cap', s:'1.2M TKN', c:'cyan-600 dark:text-cyan-400'}]" :key="p.n" class="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl transition-all">
                 <span class="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest transition-colors">{{ p.n }}</span>
                 <span class="text-xs font-bold transition-colors" :class="p.c">{{ p.s }}</span>
              </div>
           </div>
        </div>
        <!-- Enterprise Plan Preview -->
        <div class="glass-card rounded-[2rem] p-10 bg-gradient-to-br from-indigo-50 dark:from-purple-900/20 to-cyan-50 dark:to-cyan-900/20 border-indigo-200 dark:border-cyan-500/20 shadow-xl dark:shadow-none transition-colors">
           <h3 class="font-['Space_Grotesk'] text-lg font-bold text-slate-900 dark:text-white mb-4 transition-colors">Zenith Enterprise</h3>
           <p class="text-xs text-slate-500 dark:text-white/40 leading-relaxed mb-8 transition-colors">Unlock unlimited high-fidelity compute with dedicated neural clusters.</p>
           <button class="w-full py-4 border border-indigo-600/30 dark:border-cyan-400/30 rounded-2xl text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-widest hover:bg-indigo-600/5 dark:hover:bg-cyan-400/10 transition-all">Request Quote</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['topup'])
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.deposit-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  border: none;
  transition: all 0.3s ease;
}

.deposit-btn:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
  transform: translateY(-1px);
}
</style>
