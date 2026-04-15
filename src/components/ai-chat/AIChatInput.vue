<template>
  <div class="border-t bg-white p-4">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-end gap-2 bg-gray-100 rounded-2xl p-2">
        <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full" title="Đính kèm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
        </button>
        
        <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full" title="Cảm xúc">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
        
        <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full font-semibold text-sm" title="GIF">
          GIF
        </button>

        <button @click="startVoiceInput" class="p-2 text-gray-500 hover:text-gray-700 rounded-full" title="Nhập giọng nói">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
        </button>

        <textarea
          v-model="inputText"
          @keydown.enter.prevent="handleSend"
          :disabled="loading"
          placeholder="Đặt câu hỏi..."
          rows="1"
          class="flex-1 bg-transparent resize-none outline-none py-2 px-1 text-gray-700 placeholder-gray-400 font-sans"
        ></textarea>

        <button
          @click="handleSend"
          :disabled="!inputText.trim() || loading"
          class="p-2 rounded-full transition-all"
          :class="inputText.trim() && !loading ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-400'"
          title="Gửi tin nhắn"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      </div>
      
      <div class="text-center text-xs text-gray-400 mt-2">
        Powered by ""
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputText = ref('')
const props = defineProps(['loading'])
const emit = defineEmits(['send'])

const handleSend = () => {
  if (!inputText.value.trim() || props.loading) return
  emit('send', inputText.value)
  inputText.value = ''
}

const startVoiceInput = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'vi-VN'
    recognition.continuous = false
    
    recognition.onresult = (event) => {
      inputText.value = event.results[0][0].transcript
    }
    
    recognition.start()
  } else {
    alert('Trình duyệt của bạn không hỗ trợ nhập giọng nói')
  }
}
</script>