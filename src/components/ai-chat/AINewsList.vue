<template>
  <div class="p-4 space-y-4 max-w-2xl mx-auto">
    <div v-for="news in newsList" :key="news.id" class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-start gap-3">
        <span class="text-2xl">{{ news.icon }}</span>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-800">{{ news.title }}</h3>
          <p class="text-gray-500 text-sm mt-1">{{ news.date }}</p>
          <p class="text-gray-700 mt-2">{{ news.description }}</p>
          
          <!-- Chi tiết tour -->
          <div class="mt-3 p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>{{ news.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ news.duration }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-red-600 font-semibold mt-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ news.price }}</span>
            </div>
          </div>
          
          <button 
            @click="$emit('askNews', news)"
            class="mt-3 text-blue-600 text-sm font-medium hover:text-blue-700 transition flex items-center gap-1"
          >
            Đặt câu hỏi về tour này
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const newsList = [
  {
    id: 1,
    icon: '🏖️',
    title: '🎉 Tour Đà Nẵng - Giảm 30% tháng 6',
    date: '01/06/2024',
    description: 'Khách sạn 4 sao view biển, bao gồm vé tham quan Bà Nà Hills, buffet sáng tại khách sạn',
    location: 'Đà Nẵng, Việt Nam',
    duration: '3 ngày 2 đêm',
    price: '2,990,000đ/khách'
  },
  {
    id: 2,
    icon: '✈️',
    title: '✈️ Vé máy bay đi Thái Lan chỉ từ 1.2tr',
    date: '28/05/2024',
    description: 'Bay cùng VietJet, bao gồm 20kg hành lý ký gửi, chọn chỗ miễn phí',
    location: 'Bangkok, Phuket, Chiang Mai',
    duration: 'Khứ hồi linh hoạt',
    price: '1,200,000đ/vé'
  },
  {
    id: 3,
    icon: '🏔️',
    title: '🏨 Khách sạn Đà Lạt ưu đãi 40%',
    date: '25/05/2024',
    description: 'Nghỉ dưỡng cuối tuần, view đồi thông, bao gồm bữa sáng, spa miễn phí',
    location: 'Đà Lạt, Lâm Đồng',
    duration: '2 ngày 1 đêm',
    price: '1,500,000đ/phòng'
  }
]

defineEmits(['askNews'])
</script>