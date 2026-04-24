<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
    <div class="glass-container w-full max-w-xl rounded-[3rem] p-12 shadow-2xl relative border-cyan-400/20 scale-up-center">
      <!-- Close Button -->
      <button @click="$emit('close-modal')" class="absolute top-10 right-10 text-white/20 hover:text-white transition-all hover:rotate-90">
         <span class="material-symbols-outlined text-3xl">close</span>
      </button>

      <div class="mb-12">
        <h2 class="text-3xl font-bold text-white font-['Space_Grotesk'] tracking-tight">Initialize Top-up</h2>
        <p class="text-sm text-white/40 mt-1">Select your computation allocation parameters.</p>
      </div>

      <div class="space-y-10">
        <!-- Package Grid -->
        <div class="grid grid-cols-1 gap-4">
          <div v-for="pkg in tokenPackages" :key="pkg.id"
            @click="selectedPackageId = pkg.id"
            :class="selectedPackageId === pkg.id ? 'border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'"
            class="flex items-center justify-between p-6 border rounded-2xl cursor-pointer transition-all group">
            <div class="flex items-center gap-5">
              <div class="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform" :class="selectedPackageId === pkg.id ? 'text-cyan-400' : 'text-white/20'">
                <span class="material-symbols-outlined text-3xl">token</span>
              </div>
              <div>
                <div class="flex items-center gap-3">
                  <span class="text-xl font-bold text-white">{{ pkg.tokens }} <span class="text-[10px] text-white/30 uppercase tracking-widest ml-1">Tokens</span></span>
                  <span v-if="pkg.bonus !== '0'" class="px-2 py-0.5 rounded-full bg-cyan-400 text-black text-[9px] font-black uppercase tracking-widest">+{{ pkg.bonus }} Bonus</span>
                </div>
                <p class="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">Allocation cost: {{ pkg.price }}</p>
              </div>
            </div>
            <div class="w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center" :class="selectedPackageId === pkg.id ? 'border-cyan-400' : 'border-white/10'">
              <div v-if="selectedPackageId === pkg.id" class="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,240,255,1)]"></div>
            </div>
          </div>
        </div>

        <!-- Gateway Selection -->
        <div class="space-y-4">
          <label class="text-[10px] text-white/30 uppercase tracking-widest font-bold ml-1">Payment Gateway</label>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="method in paymentMethods" :key="method.id"
              @click="selectedMethodId = method.id"
              :class="selectedMethodId === method.id ? 'border-cyan-400/50 bg-cyan-400/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'"
              class="flex flex-col items-center gap-4 p-6 border rounded-2xl cursor-pointer transition-all">
              <img :src="method.icon" :alt="method.name" class="h-8 object-contain" :class="selectedMethodId === method.id ? '' : 'grayscale opacity-30'">
              <span class="text-[10px] font-bold uppercase tracking-widest" :class="selectedMethodId === method.id ? 'text-cyan-400' : 'text-white/20'">{{ method.name }} Gateway</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action -->
      <div class="mt-12 flex flex-col gap-6">
        <div class="flex items-center justify-between px-2">
          <span class="text-sm text-white/40">Total Session Value</span>
          <span class="text-3xl font-bold text-white font-['Space_Grotesk'] tracking-tight">{{ currentPackagePrice }}</span>
        </div>
        <button @click="handleTopup" :disabled="isLoading" class="deposit-btn w-full py-5 rounded-2xl font-bold text-white uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3">
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Processing Secure Transaction...' : 'Initialize Secure Deposit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close-modal'])

const selectedPackageId = ref(1)
const selectedMethodId = ref('payos')
const isLoading = ref(false)

const tokenPackages = [
  { id: 1, tokens: '1,000', price: '100.000 VNĐ', bonus: '0' },
  { id: 2, tokens: '5,500', price: '500.000 VNĐ', bonus: '10%' },
  { id: 3, tokens: '12,000', price: '1.000.000 VNĐ', bonus: '20%' },
]

const paymentMethods = [
  { id: 'payos', name: 'PayOS', icon: 'https://payos.vn/docs/img/logo.svg' },
  { id: 'vnpay', name: 'VNPAY', icon: 'https://static.cdnlogo.com/logos/v/99/vnpay.svg' }
]

const currentPackagePrice = computed(() => {
  return tokenPackages.find(p => p.id === selectedPackageId.value)?.price || '0 VNĐ'
})

const handleTopup = async () => {
  const pkg = tokenPackages.find(p => p.id === selectedPackageId.value)
  if (!pkg) return
  isLoading.value = true
  try {
    const rawPrice = parseInt(pkg.price.replace(/\D/g, ''))
    const baseTokens = parseInt(pkg.tokens.replace(/\D/g, ''))
    const bonusPercent = parseInt(pkg.bonus.replace(/\D/g, '') || '0')
    const finalTokens = baseTokens + Math.floor(baseTokens * bonusPercent / 100)

    const response = await $fetch('/api/partner/billing/payments', {
      method: 'POST',
      body: { package_id: pkg.id, amount: rawPrice, token_amount: finalTokens, payment_method: selectedMethodId.value }
    })
    if (response?.payment_url) window.location.href = response.payment_url
  } catch (error) {
    console.error('Payment error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.scale-up-center {
	animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@keyframes scale-up-center {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.deposit-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
}

.deposit-btn:hover {
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.5);
  filter: brightness(1.1);
}
</style>
