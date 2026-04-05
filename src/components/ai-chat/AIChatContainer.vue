<template>
  <!-- Nút mở chat -->
  <button 
    class="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-blue-600 transition-all"
    @click="isOpen = !isOpen"
  >
    <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
    </svg>
    Chat
  </button>

  <!-- Chat popup -->
  <div 
    v-if="isOpen"
    class="fixed bottom-20 right-5 w-[450px] h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
  >
    <!-- HEADER with close and refresh buttons (đã bỏ nút mũi tên) -->
    <div class="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
      <span class="font-semibold">AI Chat</span>
      <div class="flex items-center gap-2">
        <button 
          @click="refreshChat" 
          class="p-1 hover:bg-blue-600 rounded-lg transition"
          title="Làm mới"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
        <button 
          @click="isOpen = false" 
          class="p-1 hover:bg-blue-600 rounded-lg transition"
          title="Đóng"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- TABS: Tin nhắn & Tin tức -->
    <AITabs v-model="activeTab" />

    <!-- CONTENT: Tin nhắn -->
    <div v-if="activeTab === 'messages'" class="flex-1 overflow-y-auto bg-gray-50">
      <!-- Empty state -->
      <div v-if="messages.length === 0">
        <AIChatEmptyState />
        <AIChatWelcome @suggest="sendMessage" />
      </div>

      <!-- Messages -->
      <div v-else class="space-y-4 p-4">
        <AIChatMessage 
          v-for="msg in messages" 
          :key="msg.id"
          :role="msg.role"
          :content="msg.content"
        />
      </div>
    </div>

    <!-- CONTENT: Tin tức -->
    <div v-else class="flex-1 overflow-y-auto bg-gray-50">
      <AINewsList @askNews="handleAskNews" />
    </div>

    <!-- INPUT - Chỉ hiển thị ở tab Tin nhắn -->
    <AIChatInput 
      v-if="activeTab === 'messages'" 
      @send="sendMessage" 
      :loading="isLoading" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAIChat } from '../../composables/useAIChat'
import AITabs from './AITabs.vue'
import AIChatMessage from './AIChatMessage.vue'
import AIChatInput from './AIChatInput.vue'
import AIChatWelcome from './AIChatWelcome.vue'
import AIChatEmptyState from './AIChatEmptyState.vue'
import AINewsList from './AINewsList.vue'

const isOpen = ref(true)
const activeTab = ref('messages')
const messages = ref([])
const isLoading = ref(false)

const { sendMessage: getAIResponse } = useAIChat()

const sendMessage = async (text) => {
  if (!text.trim() || isLoading.value) return

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text
  })

  isLoading.value = true

  const aiResponse = await getAIResponse(text)

  messages.value.push({
    id: Date.now() + 1,
    role: 'assistant',
    content: aiResponse
  })

  isLoading.value = false
}

const handleAskNews = (news) => {
  activeTab.value = 'messages'
  setTimeout(() => {
    let message = ''
    if (news.title.includes('Đà Nẵng')) {
      message = `Cho tôi hỏi về tour Đà Nẵng: ${news.description}. Cho tôi xem thêm chi tiết về tour này nhé!`
    } else if (news.title.includes('Thái Lan')) {
      message = `Cho tôi hỏi về vé máy bay đi Thái Lan: ${news.description}. Cho tôi xem thêm thông tin chi tiết về chuyến đi này!`
    } else if (news.title.includes('Đà Lạt')) {
      message = `Cho tôi hỏi về khách sạn Đà Lạt: ${news.description}. Cho tôi xem thêm thông tin ưu đãi này nhé!`
    } else {
      message = `Cho tôi hỏi về: ${news.title}. ${news.description}`
    }
    sendMessage(message)
  }, 100)
}

const refreshChat = () => {
  if (confirm('Bạn có chắc muốn làm mới cuộc trò chuyện?')) {
    messages.value = []
    isLoading.value = false
  }
}
</script>