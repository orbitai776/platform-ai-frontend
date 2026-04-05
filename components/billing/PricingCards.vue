<template>
  <section class="py-12 px-4">
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-black text-white mb-4 font-['Manrope']">Chọn gói đặc quyền cho Đối tác</h2>
      
      <div class="flex items-center justify-center gap-4 mt-8">
        <span :class="!isAnnual ? 'text-white' : 'text-slate-500'" class="text-sm font-bold transition-colors">Tháng</span>
        
        <button 
          @click="isAnnual = !isAnnual"
          class="w-14 h-7 bg-slate-800 rounded-full p-1 relative transition-colors focus:outline-none border border-slate-700"
          :class="{ 'bg-blue-600': isAnnual }"
        >
          <div 
            class="w-5 h-5 bg-white rounded-full transition-transform duration-300 transform"
            :class="isAnnual ? 'translate-x-7' : 'translate-x-0'"
          ></div>
        </button>

        <span :class="isAnnual ? 'text-white' : 'text-slate-500'" class="text-sm font-bold transition-colors">
          Năm <span class="text-green-400 text-[10px] ml-1 bg-green-400/10 px-2 py-0.5 rounded-full">Tiết kiệm 16%</span>
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
      
      <div 
        v-for="pkg in pricingData" 
        :key="pkg.name"
        :class="pkg.featured ? 'border-2 border-blue-600 scale-105 shadow-2xl z-10' : 'border border-slate-800'"
        class="bg-slate-900 rounded-3xl p-8 hover:border-blue-500/50 transition-all group relative"
      >
        <div v-if="pkg.featured" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
          Phổ biến nhất
        </div>

        <h3 class="text-xl font-bold text-white mb-2" :class="{ 'text-blue-400': pkg.featured }">{{ pkg.name }}</h3>
        <p class="text-slate-400 text-sm mb-6">{{ pkg.desc }}</p>
        
        <div class="mb-8 h-12 flex items-baseline gap-1">
          <span class="text-4xl font-black text-white transition-all duration-300">
            {{ isAnnual ? pkg.priceAnnual : pkg.priceMonthly }}
          </span>
          <span class="text-slate-500 text-sm">/tháng</span>
        </div>

        <ul class="space-y-4 mb-8 text-sm text-slate-300">
          <li v-for="feature in pkg.features" :key="feature" class="flex items-center gap-3">
            <svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            {{ feature }}
          </li>
        </ul>

        <button 
          class="w-full py-3 font-bold rounded-xl transition-all"
          :class="pkg.featured ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'"
        >
          {{ pkg.buttonText }}
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Trạng thái chọn Năm hay Tháng
const isAnnual = ref(false)

// Data của các gói
const pricingData = [
  {
    name: 'Orbit AI Plus',
    desc: 'Bắt đầu trải nghiệm AI mạnh mẽ hơn.',
    priceMonthly: '132.000đ',
    priceAnnual: '66.000đ', // Giá trung bình mỗi tháng khi thanh toán theo năm
    features: ['200 monthly AI credits', 'Gemini 3.1 Pro model', 'Google Search integration'],
    buttonText: 'Bắt đầu Plus',
    featured: false
  },
  {
    name: 'Orbit AI Pro',
    desc: 'Dành cho đối tác cần hiệu suất cao.',
    priceMonthly: '489.000đ',
    priceAnnual: '0đ', // Mock: Tháng đầu 0đ nếu nạp năm
    features: ['1,000 monthly AI credits', 'Deep Research on 3.1 Pro', 'Veo 3.1 video generation'],
    buttonText: 'Nâng cấp Pro',
    featured: true
  },
  {
    name: 'Orbit AI Ultra',
    desc: 'Sức mạnh AI tối thượng cho tập đoàn.',
    priceMonthly: '6.000.000đ',
    priceAnnual: '3.000.000đ',
    features: ['25,000 monthly AI credits', 'Veo 3.1 & Lyria 3 access', 'Premium Training Data'],
    buttonText: 'Liên hệ Ultra',
    featured: false
  }
]
</script>   