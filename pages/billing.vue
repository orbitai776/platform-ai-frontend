<template>
  <div class="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] relative overflow-x-hidden selection:bg-cyan-500/30">
    <!-- Ambient Background Elements -->
    <div class="fixed inset-0 pointer-events-none" style="background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 4rem 4rem; z-index: -2;"></div>
    <div class="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

    <!-- MAIN CONTENT AREA -->
    <main class="max-w-[1400px] mx-auto px-10 pt-32 pb-20 relative z-10">
      
      <!-- Header Section -->
      <div class="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 class="font-['Space_Grotesk'] text-5xl font-bold text-white mb-3 tracking-tight">Billing Details</h1>
        <p class="text-white/40 text-lg max-w-2xl leading-relaxed">Monitor your organization's token expenditure and high-fidelity compute allocation.</p>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <!-- Left Section: Wallet & History -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Balance Card -->
          <BillingBalanceCard />
          
          <!-- History Table -->
          <BillingHistoryTable />
        </div>

        <!-- Right Section: Top Up & Pricing -->
        <div class="flex flex-col gap-10">
          <!-- Quick Top Up (Replaced TopupModal with inline UX for premium feel) -->
          <div class="glass-container rounded-[2rem] p-10 flex flex-col h-full animate-in slide-in-from-right-4 duration-700">
            <div class="flex items-center gap-3 text-white mb-10">
              <span class="material-symbols-outlined text-cyan-400 text-2xl">bolt</span>
              <h3 class="font-['Space_Grotesk'] text-2xl font-bold">Top Up Credits</h3>
            </div>

            <div class="space-y-10 flex-1 flex flex-col">
              <div>
                <label class="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">Select Computation Package</label>
                <div class="grid grid-cols-2 gap-4">
                  <button v-for="pkg in ['100k', '500k', '1M', 'Custom']" :key="pkg" 
                    :class="pkg === '500k' ? 'active-tile border-cyan-400/50 bg-cyan-400/10 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'"
                    class="border rounded-2xl py-5 text-sm font-bold transition-all">
                    {{ pkg }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">Payment Gateway</label>
                <div class="flex items-center gap-4 bg-white/5 border border-cyan-400/30 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-all group">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-inner">
                    <img alt="VNPAY" class="w-full object-contain" src="https://payos.vn/docs/img/logo.svg" />
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-bold text-white">Secure Gateway</div>
                    <div class="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Instant allocation</div>
                  </div>
                  <span class="material-symbols-outlined text-cyan-400">check_circle</span>
                </div>
              </div>

              <div class="mt-auto pt-8 border-t border-white/5">
                <div class="flex justify-between items-center mb-8">
                  <span class="text-sm text-white/40 font-medium">Total Allocation Value</span>
                  <span class="text-3xl font-bold text-white font-['Space_Grotesk']">₫ 1,500,000</span>
                </div>
                <button @click="showModal = true" class="deposit-btn w-full py-5 rounded-2xl font-bold text-white uppercase tracking-[0.2em] text-[11px] transition-all">
                  Initialize Deposit
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom: Pricing Cards (Optional detailed plans) -->
      <div class="mt-20">
        <div class="text-center mb-12">
          <h2 class="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight">Enterprise Subscriptions</h2>
          <p class="text-white/40 mt-2">Dedicated high-fidelity compute clusters for large scale operations.</p>
        </div>
        <BillingPricingCards />
      </div>

    </main>

    <!-- Payment Modal -->
    <BillingTopupModal 
      v-if="showModal" 
      @close-modal="showModal = false" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  middleware: [
    async function (to, from) {
      const { data } = await useFetch('/api/auth/login')
      if (!data.value) {
        return navigateTo('/') 
      }
    }
  ]
})

const showModal = ref(false)
</script>

<style>
.glass-container {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.active-tile {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
}

.deposit-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
}

.deposit-btn:hover {
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.5);
  filter: brightness(1.1);
  transform: translateY(-2px);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(0, 240, 255, 0.2); }
</style>