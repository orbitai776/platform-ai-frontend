<template>
  <div class="min-h-screen bg-white dark:bg-[#09090B] text-slate-900 dark:text-white font-['Inter'] relative overflow-x-hidden selection:bg-cyan-500/30 transition-colors duration-500">
    <!-- Ambient Background Elements -->
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 4rem 4rem; z-index: -2;"></div>
    <div class="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse transition-all"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10 transition-all"></div>

    <!-- SHOOTING STARS -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div v-for="n in 5" :key="n" class="shooting-star" :style="starStyles[n-1]"></div>
    </div>

    <!-- MAIN CONTENT -->
    <main class="max-w-[1400px] mx-auto px-10 pt-40 pb-32 relative z-10">
      <!-- Header Section -->
      <header class="text-center mb-24 animate-fade-in">
        <h1 class="font-['Space_Grotesk'] text-7xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight transition-colors">
          Unlock the Power of <br/>
          <span class="shimmer-text" style="-webkit-text-fill-color: transparent;">Sentient Intelligence</span>
        </h1>
        <p class="text-slate-500 dark:text-white/40 text-xl max-w-2xl mx-auto leading-relaxed font-medium transition-colors">
          Choose the plan that fuels your organization's intelligence. Scale your computational power beyond limits.
        </p>

        <!-- Billing Toggle -->
        <div class="flex items-center justify-center gap-6 mt-16">
          <span :class="!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'" class="text-sm font-bold uppercase tracking-widest transition-colors">Monthly</span>
          <button @click="isAnnual = !isAnnual" class="relative w-16 h-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full p-1 transition-all group hover:border-cyan-400/50">
            <div :class="isAnnual ? 'translate-x-8 bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)]' : 'translate-x-0 bg-slate-400 dark:bg-white/40'" class="w-6 h-6 rounded-full transition-all duration-500"></div>
          </button>
          <div class="flex items-center gap-3">
            <span :class="isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'" class="text-sm font-bold uppercase tracking-widest transition-colors">Annual</span>
            <span class="px-3 py-1 rounded-lg bg-cyan-400 text-black text-[9px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)]">Save 20%</span>
          </div>
        </div>
      </header>

      <!-- Pricing Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 xl:gap-10 items-end max-w-7xl mx-auto">
        <!-- Starter Plan -->
        <div class="glass-card rounded-[2.5rem] px-6 py-10 sm:px-8 sm:py-12 flex flex-col min-h-[580px] group transition-all duration-500 hover:-translate-y-4 bg-white dark:bg-white/20 shadow-xl dark:shadow-none border border-slate-100 dark:border-white/5">
          <div class="mb-12">
            <h3 class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors break-words">Starter</h3>
            <p class="text-sm text-slate-500 dark:text-white/30 font-medium leading-relaxed mb-8">For individuals exploring the orbital frontier.</p>
            <div class="flex items-baseline gap-1">
              <span class="text-xl md:text-2xl font-bold text-slate-400 dark:text-white/50 font-['Space_Grotesk']">$</span>
              <span class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tighter">{{ isAnnual ? '39' : '49' }}</span>
              <span class="text-[10px] text-slate-400 dark:text-white/20 uppercase font-black tracking-widest ml-1">/ month</span>
            </div>
          </div>
          
          <ul class="space-y-6 flex-1">
            <li v-for="f in ['1M Credits/mo', 'Standard Support', '1 Active AI Agent', 'Public Models Only']" :key="f" class="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
              <span class="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
              {{ f }}
            </li>
          </ul>

          <button class="w-full py-5 rounded-2xl border border-cyan-600/30 dark:border-cyan-400/30 text-cyan-600 dark:text-cyan-400 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-cyan-600/5 dark:hover:bg-cyan-400/10 transition-all mt-10">
            Start Exploration
          </button>
        </div>

        <!-- Professional Plan (Featured) -->
        <div class="professional-card rounded-[3rem] px-6 py-10 sm:px-8 sm:py-12 flex flex-col min-h-[650px] relative z-10 shadow-2xl dark:shadow-[0_30px_60px_rgba(0,240,255,0.1)] group hover:-translate-y-6 transition-all duration-500 bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-600 text-white dark:text-black text-[10px] font-black px-10 py-2.5 rounded-full uppercase tracking-[0.15em] shadow-xl dark:shadow-[0_0_30px_rgba(0,240,255,0.6)] whitespace-nowrap z-20">
            Most Recommended
          </div>

          <div class="mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-3 break-words transition-colors">Professional</h3>
            <p class="text-sm text-slate-500 dark:text-white/40 font-medium leading-relaxed mb-8 transition-colors">Advanced compute for growing intelligence networks.</p>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 font-['Space_Grotesk'] transition-colors">$</span>
              <span class="text-5xl md:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tighter leading-none transition-colors">{{ isAnnual ? '159' : '199' }}</span>
              <span class="text-[10px] text-slate-400 dark:text-white/30 uppercase font-black tracking-widest ml-1 transition-colors">/ month</span>
            </div>
          </div>
          
          <ul class="space-y-6 flex-1">
            <li v-for="f in ['10M Credits/mo', 'Priority Support', '5 AI Agents', 'Custom Model Training', 'API Access (V3)']" :key="f" class="flex items-center gap-4 text-xs font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              <span class="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-2xl transition-colors" style="font-variation-settings: 'FILL' 1;">verified</span>
              {{ f }}
            </li>
          </ul>

          <button class="luminous-btn w-full py-6 rounded-2xl font-black text-white dark:text-black text-[11px] uppercase tracking-[0.3em] mt-10 transition-all">
            Ascend Now
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div class="glass-card rounded-[2.5rem] px-6 py-10 sm:px-8 sm:py-12 flex flex-col min-h-[580px] group transition-all duration-500 hover:-translate-y-4 lg:col-span-2 2xl:col-span-1 bg-white dark:bg-white/20 shadow-xl dark:shadow-none border border-slate-100 dark:border-white/5">
          <div class="mb-12">
            <h3 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors break-words">Enterprise</h3>
            <p class="text-sm text-slate-500 dark:text-white/30 font-medium leading-relaxed mb-8 transition-colors">Limitless capacity for planetary-scale operations.</p>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tighter transition-colors">Custom</span>
            </div>
          </div>
          
          <ul class="space-y-6 flex-1">
            <li v-for="f in ['Unlimited Tokens', '24/7 Dedicated Support', 'Unlimited Agents', 'On-premise Deployment', 'Custom SLA']" :key="f" class="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
              <span class="material-symbols-outlined text-purple-600 dark:text-purple-400 text-xl transition-colors" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
              {{ f }}
            </li>
          </ul>

          <button class="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-slate-800 dark:hover:bg-white/90 transition-all mt-10 shadow-lg">
            Contact Sales
          </button>
        </div>
      </div>

      <!-- Trust Section -->
      <section class="mt-48 text-center animate-fade-in delay-500">
        <p class="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.5em] mb-16 transition-colors">Trusted by Galactic Leaders</p>
        <div class="flex flex-wrap justify-center gap-20 opacity-30 grayscale dark:grayscale contrast-125 dark:invert-0 invert transition-all">
          <div v-for="logo in ['NEBULA_SYS', 'QUANTUM.CORP', 'VOID_LOGISTICS', 'STAR_FORGE']" :key="logo" class="h-10 flex items-center font-black text-2xl italic tracking-tighter text-slate-900 dark:text-white hover:opacity-100 transition-opacity cursor-default">
            {{ logo }}
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/40 backdrop-blur-3xl py-20 transition-colors">
      <div class="max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div class="flex flex-col items-center md:items-start gap-4">
          <div class="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">Orbit AI</div>
          <p class="text-slate-400 dark:text-white/20 text-xs font-medium uppercase tracking-widest italic transition-colors">Beyond Human Intelligence.</p>
        </div>
        <div class="flex gap-12">
          <div v-for="link in ['Privacy', 'Terms', 'Security', 'Status']" :key="link" class="text-slate-500 dark:text-white/30 hover:text-cyan-600 dark:hover:text-cyan-400 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors">{{ link }}</div>
        </div>
        <div class="text-slate-300 dark:text-white/10 text-[9px] font-bold uppercase tracking-[0.3em] transition-colors">© 2024 Orbit AI Systems.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAnnual = ref(true)

const starStyles = Array.from({ length: 5 }, () => ({
  top: `${Math.random() * 60}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 10}s`,
  animationDuration: `${3 + Math.random() * 4}s`
}))
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}

.professional-card {
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
}

.professional-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.5), rgba(120, 0, 255, 0.5));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.shimmer-text {
  display: inline-block;
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 5s linear infinite;
  background-image: linear-gradient(90deg, #1e293b, #00f0ff, #7701d0, #1e293b);
  transition: color 0.5s;
}

.dark .shimmer-text {
  background-image: linear-gradient(90deg, #fff, #00f0ff, #7701d0, #fff);
}

.luminous-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  border: none;
  transition: all 0.4s ease;
}

.luminous-btn:hover {
  box-shadow: 0 0 40px rgba(0, 240, 255, 0.5);
  filter: brightness(1.1);
  transform: scale(1.02);
}

.shooting-star {
  position: absolute;
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.4), transparent);
  transform: rotate(-45deg);
  opacity: 0;
  animation: shoot linear infinite;
}

@keyframes shoot {
  0% { transform: rotate(-45deg) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  30% { transform: rotate(-45deg) translateX(-1500px); opacity: 0; }
  100% { transform: rotate(-45deg) translateX(-1500px); opacity: 0; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>
