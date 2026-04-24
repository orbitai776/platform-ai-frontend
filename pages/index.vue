<template>
  <div class="font-body text-slate-900 dark:text-on-background bg-white dark:bg-[#09090B] min-h-screen selection:bg-neon-cyan/30 selection:text-white overflow-x-hidden relative transition-colors duration-500">
    
    <!-- Noise Texture Overlay -->
    <div class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
      </svg>
    </div>

    <!-- Global Background Grid -->
    <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 40px 40px;"></div>

    <!-- Nebula Effects -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-neon-cyan/10 dark:bg-neon-cyan/20 rounded-full blur-[180px] animate-nebula-1 mix-blend-screen dark:mix-blend-screen"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-deep-purple/10 dark:bg-deep-purple/20 rounded-full blur-[180px] animate-nebula-2 mix-blend-screen dark:mix-blend-screen"></div>
    </div>

    <!-- Shooting Stars -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div v-for="n in 8" :key="`star-${n}`" 
        class="shooting-star opacity-0 dark:opacity-100"
        :style="{
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 40}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${2.5 + Math.random() * 2}s`
        }"
      ></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10">
      
      <!-- Hero Section -->
      <section class="relative max-w-container-max mx-auto px-8 pt-32 pb-24 flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 animate-fade-in">
          <span class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
          <span class="font-display text-[0.7rem] font-bold text-neon-cyan uppercase tracking-widest">Orbit V4 Engine Live</span>
        </div>

        <div class="relative mb-8">
          <div class="absolute inset-0 bg-neon-cyan/20 blur-[60px] animate-pulse"></div>
          <h1 class="relative font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white max-w-4xl transition-all duration-500">
            Intelligence <br/>
            <span class="inline-block bg-gradient-to-r from-neon-cyan via-slate-400 dark:via-white to-deep-purple bg-clip-text text-transparent animate-shimmer" style="-webkit-text-fill-color: transparent;">Engineered for Infinity</span>
          </h1>
        </div>

        <p class="text-slate-600 dark:text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-2xl mb-12 animate-fade-in delay-200 transition-colors">
          Deploy sentient-grade models with zero-latency inference. Orbit AI redefines computational boundaries for enterprises demanding absolute precision and unprecedented power.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 items-center mb-20 animate-fade-in delay-300">
          <button class="relative group bg-gradient-to-r from-neon-cyan to-deep-purple text-white px-10 py-4 rounded-full font-display text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
            <span class="relative z-10">Start Free Trial</span>
            <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </button>
          <button class="text-slate-700 dark:text-on-surface hover:text-neon-cyan dark:hover:text-neon-cyan font-display text-sm font-bold tracking-widest uppercase transition-colors flex items-center gap-2 group transition-colors">
            View Documentation
            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <!-- Impeccable Hero Visual -->
        <div class="w-full relative max-w-[1100px] mx-auto mb-32 group">
          <div class="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-neon-cyan/5 dark:bg-neon-cyan/15 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
          <div class="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-deep-purple/5 dark:bg-deep-purple/15 rounded-full blur-[140px] animate-pulse pointer-events-none" style="animation-delay: 2s;"></div>

          <div class="relative rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-neon-cyan/30 min-h-[300px] md:min-h-[500px]">
            <div class="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-900">
              <img 
                src="/ai_neural_core.png" 
                alt="AI Neural Core" 
                class="w-full h-full object-cover opacity-100 transition-transform duration-[15s] ease-out scale-110 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent h-[10%] w-full animate-scan pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Grid Features Section -->
      <section class="max-w-container-max mx-auto px-8 py-32 relative">
        <div class="mb-20 text-center">
          <h2 class="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-500">Architected for the Bleeding Edge</h2>
          <p class="text-slate-600 dark:text-on-surface-variant max-w-2xl mx-auto transition-colors">Our glass-box infrastructure provides unparalleled transparency without compromising on the staggering velocity of our inference engines.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[320px]">
          <!-- Large Card -->
          <div class="card-glow md:col-span-8 md:row-span-2 rounded-3xl bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none transition-all duration-300 p-12 relative overflow-hidden group flex flex-col justify-between">
            <div class="absolute top-0 right-0 w-80 h-80 bg-neon-cyan/5 rounded-full blur-[100px] -z-10 group-hover:bg-neon-cyan/10 transition-colors"></div>
            <div>
              <div class="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <span class="material-symbols-outlined text-neon-cyan text-4xl group-hover:drop-shadow-[0_0_8px_#00f0ff]" style="font-variation-settings: 'FILL' 1">hub</span>
              </div>
              <h3 class="font-display text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Neural Architecture Search</h3>
              <p class="text-slate-600 dark:text-on-surface-variant text-lg max-w-md transition-colors">Automatically design optimal model architectures tailored to specific hardware constraints. Our evolutionary algorithms evolve topological structures in real-time.</p>
            </div>
            <div class="flex gap-3">
              <span class="px-4 py-1.5 rounded-full bg-deep-purple/10 dark:bg-deep-purple/20 text-deep-purple dark:text-neon-cyan font-display text-[0.6rem] font-bold uppercase tracking-widest border border-deep-purple/20 transition-colors">AutoML</span>
              <span class="px-4 py-1.5 rounded-full bg-deep-purple/10 dark:bg-deep-purple/20 text-deep-purple dark:text-neon-cyan font-display text-[0.6rem] font-bold uppercase tracking-widest border border-deep-purple/20 transition-colors">Topology Optimization</span>
            </div>
          </div>

          <!-- Small Cards -->
          <div v-for="(feat, i) in smallFeatures" :key="i" class="card-glow md:col-span-4 rounded-3xl bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none transition-all duration-300 p-8 relative overflow-hidden group hover:border-neon-cyan/30 transition-all">
            <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
              <span class="material-symbols-outlined text-neon-cyan text-2xl group-hover:drop-shadow-[0_0_8px_#00f0ff]" style="font-variation-settings: 'FILL' 1">{{ feat.icon }}</span>
            </div>
            <h3 class="font-display text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-neon-cyan transition-colors">{{ feat.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-on-surface-variant leading-relaxed transition-colors">{{ feat.desc }}</p>
          </div>

          <!-- Wide Card -->
          <div class="card-glow md:col-span-12 rounded-3xl bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none transition-all duration-300 p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-12 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all">
            <div class="flex-1">
              <div class="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <span class="material-symbols-outlined text-deep-purple text-4xl group-hover:drop-shadow-[0_0_8px_#7701d0]" style="font-variation-settings: 'FILL' 1">insights</span>
              </div>
              <h3 class="font-display text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Real-time Interpretability</h3>
              <p class="text-slate-600 dark:text-on-surface-variant text-lg transition-colors">Demystify the black box. Observe decision pathways, feature importance matrices, and attention maps streaming live.</p>
            </div>
            <div class="w-full md:w-1/2 h-48 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-[0.03] dark:opacity-10" style="background-image: linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px); background-size: 20px 20px;"></div>
              <div class="w-3/4 h-2/3 flex items-end gap-3 px-8">
                <div v-for="(h, i) in [90, 60, 80, 40, 95]" :key="i" 
                  class="flex-1 rounded-t-lg transition-all duration-1000 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  :class="i % 2 === 0 ? 'bg-deep-purple' : 'bg-neon-cyan'"
                  :style="{ height: `${h}%` }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Dashboard Tabs Section -->
      <section class="max-w-container-max mx-auto px-8 pb-32">
        <h2 class="font-display text-center text-xs font-bold tracking-[0.4em] uppercase text-slate-400 dark:text-white/20 mb-12 transition-colors">Interactive Platform Control</h2>
        
        <!-- Glassmorphic Tabs -->
        <div class="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl mb-12 max-w-fit mx-auto transition-colors">
          <button
            v-for="tab in tabs" :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-3 font-display text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300"
            :class="activeTab === tab.id ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xl ring-1 ring-slate-200 dark:ring-white/10' : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/70 hover:bg-white dark:hover:bg-white/5'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Services Grid -->
        <div v-if="activeTab === 'public'" class="space-y-12">
          <div class="flex gap-3 flex-wrap justify-center mb-8">
            <button
              v-for="f in filters" :key="f.value"
              @click="activeFilter = f.value"
              class="px-5 py-2 rounded-full text-xs font-bold font-display tracking-widest uppercase border transition-all duration-300"
              :class="activeFilter === f.value ? 'bg-neon-cyan border-neon-cyan text-slate-900 shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:border-neon-cyan/50 hover:text-neon-cyan'"
            >
              {{ f.label }}
            </button>
          </div>

          <div v-if="loading" class="py-24 text-center">
            <div class="inline-block animate-spin w-8 h-8 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full mb-4"></div>
            <p class="font-display text-sm tracking-widest text-slate-400 dark:text-white/40 transition-colors">ĐANG TẢI HỆ THỐNG...</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="card in filteredCards" :key="card.id"
              class="card-glow group relative bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-none transition-all duration-700 rounded-[2.5rem] p-10 overflow-hidden hover:border-neon-cyan/40 hover:bg-white/60 dark:hover:bg-white/[0.07] hover:-translate-y-2 flex flex-col"
            >
              <!-- Internal Ambient Glow -->
              <div class="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/5 dark:bg-neon-cyan/10 rounded-full blur-[60px] group-hover:bg-neon-cyan/20 transition-colors duration-700"></div>
              <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-deep-purple/5 dark:bg-deep-purple/10 rounded-full blur-[60px] group-hover:bg-deep-purple/20 transition-colors duration-700"></div>
              
              <div class="relative z-10 flex flex-col h-full">
                <!-- Icon Header -->
                <div class="w-16 h-16 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                  <span class="material-symbols-outlined text-neon-cyan text-4xl group-hover:drop-shadow-[0_0_12px_#00f0ff]" style="font-variation-settings: 'FILL' 1">{{ card.icon }}</span>
                </div>

                <div class="flex justify-between items-start mb-6">
                  <div class="flex gap-2">
                    <span v-for="tag in card.tags" :key="tag.label" 
                      class="px-3 py-1 rounded-full text-[0.6rem] font-bold font-display tracking-widest uppercase border transition-colors duration-300"
                      :class="tag.class"
                    >
                      {{ tag.label }}
                    </span>
                  </div>
                  <span class="font-display text-xs font-bold text-slate-300 dark:text-white/20 tracking-widest group-hover:text-neon-cyan transition-colors">{{ card.num }}</span>
                </div>

                <h3 class="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-neon-cyan transition-colors leading-tight">{{ card.title }}</h3>
                <p class="text-sm text-slate-500 dark:text-on-surface-variant leading-relaxed mb-8 flex-1 transition-colors">{{ card.desc }}</p>

                <div class="space-y-3 mb-10">
                  <div v-for="feat in card.features" :key="feat" class="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-on-surface-variant/70 transition-colors">
                    <span class="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]"></span>
                    {{ feat }}
                  </div>
                </div>

                <button 
                  @click="handleDemoClick(card.id)"
                  class="relative group/btn w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-display text-[0.7rem] font-black tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl dark:shadow-none"
                >
                  <span class="relative z-10">Kích hoạt Assistant</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-neon-cyan to-deep-purple opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-slate-100 dark:border-white/5 py-12 bg-white/80 dark:bg-black/50 backdrop-blur-md transition-colors">
      <div class="max-w-container-max mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="font-display text-xl font-bold bg-gradient-to-r from-neon-cyan to-deep-purple bg-clip-text text-transparent">
          Orbit AI
        </div>
        <div class="flex gap-8 text-[0.6rem] font-display font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-white/30 transition-colors">
          <a href="#" class="hover:text-neon-cyan transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-neon-cyan transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-neon-cyan transition-colors">System Status</a>
        </div>
        <div class="text-[0.6rem] font-display text-slate-300 dark:text-white/20 uppercase tracking-widest transition-colors">
          © 2024 Orbit AI Platform.
        </div>
      </div>
    </footer>

    <ClientOnly>
      <AIChatContainer ref="chatRef"/>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AIChatContainer from '../src/components/ai-chat/AIChatContainer.vue'
import {usePartnerServices} from '../src/composables/usePartnerService'

const { services, loading, loadPublicServices } = usePartnerServices()

definePageMeta({
  layout: 'default'
})

const activeTab = ref('public')
const activeFilter = ref('all')

const smallFeatures = [
  { icon: 'rocket_launch', title: 'Hyper-Deployment', desc: 'Push models to edge clusters globally in milliseconds with deterministic orchestration.' },
  { icon: 'security', title: 'Quantum Encryption', desc: 'Secure proprietary weights with post-quantum cryptographic primitives standard.' },
]

const tabs = [
  { id: 'public',  label: '🌍 Public Services' },
  { id: 'partner', label: '🤝 Partner Portal' },
  { id: 'admin',   label: '🛡 Admin Portal' },
]

const filters = [
  { value: 'all',       label: 'Tất cả' },
  { value: 'tour',      label: 'Tour du lịch' },
  { value: 'villa',     label: 'Villa & Lưu trú' },
  { value: 'inventory', label: 'Sản phẩm tồn kho' },
]

const chatRef = ref(null)

await useAsyncData('public-services', () => loadPublicServices())

const handleMouseMove = (e) => {
  if (process.client) {
    const cards = document.querySelectorAll('.card-glow');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener('mousemove', handleMouseMove);
  }
  if (!services.value || services.value.length === 0) {
    loadPublicServices()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('mousemove', handleMouseMove);
  }
})

const dynamicCards = computed(() => {
  if (!services.value || services.value.length === 0) return []
  
  return services.value.map((item, index) => {
    let category = (item.type || 'tour').toLowerCase()
    let tagColorClass = 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20'
    let image = 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80'

    let icon = 'hub'
    if (category.includes('villa')) {
      tagColorClass = 'bg-deep-purple/10 text-deep-purple border-deep-purple/20'
      icon = 'home_work'
    } else if (category.includes('inventory') || category.includes('kho')) {
      category = 'inventory'
      tagColorClass = 'bg-pink-400/10 text-pink-400 border-pink-400/20'
      icon = 'inventory_2'
    } else if (category.includes('tour')) {
      tagColorClass = 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20'
      icon = 'explore'
    }

    return {
      id: item.id,
      num: String(index + 1).padStart(2, '0'),
      category: category,
      icon: icon,
      tags: [
        { label: (item.type || 'Tour').toUpperCase(), class: tagColorClass },
        { label: 'Public', class: 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 border-slate-200 dark:border-white/10' },
      ],
      title: item.name,
      desc: item.description || 'Trợ lý AI hỗ trợ tự động 24/7.',
      features: item.features || ['Hỗ trợ tư vấn 24/7', 'Tự động báo giá', 'Chăm sóc khách hàng'],
    }
  })
})

const filteredCards = computed(() =>
  activeFilter.value === 'all' 
    ? dynamicCards.value 
    : dynamicCards.value.filter(c => c.category === activeFilter.value)
)

const handleDemoClick = (cardId) => {
  if (chatRef.value) {
    chatRef.value.openChatWithService(cardId)
  }
}
</script>

<style scoped>
@keyframes nebula-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10%, 10%) scale(1.1); }
  66% { transform: translate(-5%, 15%) scale(0.9); }
}

@keyframes nebula-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-10%, -15%) scale(1.2); }
}

.animate-nebula-1 { animation: nebula-1 25s ease-in-out infinite; }
.animate-nebula-2 { animation: nebula-2 30s ease-in-out infinite; }

.shimmer-text, .animate-shimmer {
  display: inline-block;
  color: #1e293b;
  position: relative;
  background-size: 200% auto;
  animation: shimmer 4s linear infinite;
}

.dark .shimmer-text, .dark .animate-shimmer {
  color: #fff;
}

@supports (background-clip: text) or (-webkit-background-clip: text) {
  .shimmer-text, .animate-shimmer {
    background-image: linear-gradient(90deg, #1e293b, #00f0ff, #1e293b);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .dark .shimmer-text, .dark .animate-shimmer {
    background-image: linear-gradient(90deg, #fff, #00f0ff, #fff);
  }
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
  animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scan {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(1000%); opacity: 0; }
}

.animate-scan {
  animation: scan 4s linear infinite;
}

.card-glow {
  position: relative;
}

.card-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 240, 255, 0.1), transparent 40%);
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
}

.card-glow:hover::before {
  opacity: 1;
}

.shooting-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1);
  animation: shooting 3s linear infinite;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}

@keyframes shooting {
  0% { transform: rotate(-45deg) translateX(0); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: rotate(-45deg) translateX(-1000px); opacity: 0; }
}
</style>