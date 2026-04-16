<template>
  <div class="px-4 py-6 bg-white border-y border-gray-100">
    <div class="max-w-2xl mx-auto">
      
      <div class="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
        <p class="text-gray-800">Hi there 👋</p>
        <p class="text-gray-800 mt-1">
          You are now speaking with <strong>"{{ serviceName || 'AI Agent' }}"</strong>. How can I help you today?
        </p>

        <!-- Suggest buttons với nội dung cụ thể -->
        <div class="mt-3 flex flex-wrap gap-2">
          <button 
            v-for="suggestion in activeSuggestions" 
            :key="suggestion.text"
            @click="$emit('suggest', suggestion.message)"
            class="text-sm bg-white px-3 py-1 rounded-full text-blue-600 hover:bg-blue-50 transition border border-blue-100 shadow-sm"
          >
            {{ suggestion.text }}
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-400 mt-1 ml-2">
        {{ serviceName }} • AI Assistant • Online
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  serviceName: {
    type: String,
    default: 'AI Assistant'
  },
  serviceType: {
    type: String,
    default: 'tour'
  }
})

const emit = defineEmits(['suggest'])

const suggestionMap = {
  tour: [
    { text: '🏖️ Tour Đà Nẵng', message: 'Tư vấn cho tôi tour Đà Nẵng 3 ngày 2 đêm' },
    { text: '✈️ Tour Thái Lan', message: 'Có tour Thái Lan nào giá rẻ không?' },
    { text: '🏔️ Lịch trình Đà Lạt', message: 'Gợi ý lịch trình Đà Lạt cho gia đình' }
  ],
  villa: [
    { text: '🏨 Kiểm tra Villa trống', message: 'Kiểm tra giúp tôi các villa còn trống vào cuối tuần này' },
    { text: '💰 Báo giá phòng', message: 'Giá villa cho đoàn 10 người là bao nhiêu?' },
    { text: '📍 Vị trí Villa', message: 'Các villa này có gần biển không?' }
  ],
  inventory: [
    { text: '🛍️ Kiểm tra tồn kho', message: 'Sản phẩm này còn hàng không bạn?' },
    { text: '🏷️ Giá sản phẩm', message: 'Cho tôi biết giá của sản phẩm này' },
    { text: '🚚 Giao hàng', message: 'Chính sách giao hàng của bên mình như thế nào?' }
  ]
}

const activeSuggestions = computed(() => {
  return suggestionMap[props.serviceType] || suggestionMap.tour
})
</script>