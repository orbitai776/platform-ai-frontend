<template>
  <div class="px-4 py-6 bg-white border-y border-gray-100">
    <div class="max-w-2xl mx-auto">
      
      <div class="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
        <p class="text-gray-800">Hi there 👋</p>
        <p class="text-gray-800 mt-1">
          You are now speaking with <strong>"AI Agent du lịch"</strong>. How can I help you with your travel plans?
        </p>

        <!-- Suggest buttons với nội dung cụ thể -->
        <div class="mt-3 flex flex-wrap gap-2">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion.text"
            @click="$emit('suggest', suggestion.message)"
            class="text-sm bg-white px-3 py-1 rounded-full text-blue-600 hover:bg-blue-50 transition"
          >
            {{ suggestion.text }}
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-400 mt-1 ml-2">
        Name • AI Agent • Online
      </div>

    </div>
  </div>
</template>

<script setup>
const suggestions = [
  { text: '🏖️ Tour Đà Nẵng 3 ngày', message: 'Cho tôi xem thông tin chi tiết về tour Đà Nẵng 3 ngày 2 đêm, bao gồm lịch trình và giá cả' },
  { text: '✈️ Tour Thái Lan giá rẻ', message: 'Tư vấn cho tôi tour du lịch Thái Lan 5 ngày 4 đêm với chi phí tiết kiệm nhất' },
  { text: '🏔️ Lịch trình Đà Lạt', message: 'Gợi ý lịch trình tự túc Đà Lạt 3 ngày 2 đêm cho gia đình' }
]

defineEmits(['suggest'])
</script>