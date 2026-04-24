<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
    <div v-for="pkg in pricingData" :key="pkg.name"
      class="glass-container rounded-[2.5rem] p-10 flex flex-col group relative transition-all duration-500 hover:-translate-y-2"
      :class="pkg.featured ? 'border-cyan-400/30 bg-cyan-400/[0.03] shadow-[0_20px_50px_rgba(0,240,255,0.1)]' : ''">
      
      <div v-if="pkg.featured" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,240,255,0.5)]">
        Most Recommended
      </div>

      <div class="mb-10">
        <h3 class="text-xl font-bold text-white font-['Space_Grotesk'] mb-2 group-hover:text-cyan-400 transition-colors">{{ pkg.name }}</h3>
        <p class="text-xs text-white/30 font-medium leading-relaxed">{{ pkg.desc }}</p>
      </div>

      <div class="mb-10 flex items-baseline gap-2">
        <span class="text-5xl font-bold text-white font-['Space_Grotesk'] tracking-tighter">{{ pkg.price }}</span>
        <span class="text-[10px] text-white/20 uppercase font-black tracking-widest">/ session</span>
      </div>

      <ul class="space-y-4 mb-12 flex-1">
        <li v-for="feature in pkg.features" :key="feature" class="flex items-center gap-4 text-[11px] text-white/50 font-medium group-hover:text-white/80 transition-colors">
          <span class="material-symbols-outlined text-cyan-400 text-lg">check_circle</span>
          {{ feature }}
        </li>
      </ul>

      <button class="w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
        :class="pkg.featured ? 'deposit-btn text-white' : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'">
        {{ pkg.buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const pricingData = [
  {
    name: 'Neural Plus',
    desc: 'Foundational AI compute for emerging developers.',
    price: '132k',
    features: ['200 monthly AI credits', 'Gemini 3.1 Pro model', 'Standard Latency Tier'],
    buttonText: 'Initialize Plus',
    featured: false
  },
  {
    name: 'Aether Pro',
    desc: 'High-density synthesis for scaling production.',
    price: '489k',
    features: ['1,000 monthly AI credits', 'Deep Research Access', 'Priority Compute Lane', 'Veo 3.1 Synthesis'],
    buttonText: 'Upgrade to Pro',
    featured: true
  },
  {
    name: 'Zenith Ultra',
    desc: 'Unlimited power for high-stakes enterprise AI.',
    price: '6M',
    features: ['25,000 monthly AI credits', 'Dedicated Cluster Access', 'Zero Latency Tier', 'Full Neural Suite'],
    buttonText: 'Contact Enterprise',
    featured: false
  }
]
</script>

<style scoped>
.deposit-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
}

.deposit-btn:hover {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
}
</style>