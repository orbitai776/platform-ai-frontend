<template>
  <button 
    class="fixed bottom-5 right-5 text-white px-4 py-2 rounded-full shadow-lg z-50 transition-all flex items-center gap-2 bg-[#6c4de6] hover:bg-[#5a3dd4]"
    @click="isOpen = !isOpen"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
    </svg>
    <span v-if="!isOpen">Chat</span>
  </button>

  <div 
    v-if="isOpen"
    class="fixed bottom-20 right-5 w-[450px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999]"
    style="position: fixed; isolation: isolate;"
  >
    <div class="bg-[#6c4de6] text-white px-4 py-2 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span class="text-lg">🤖</span>
        </div>
        <div>
          <span class="font-semibold text-sm">AI Travel Assistant</span>
          <div class="text-xs text-white/70">Online • 24/7</div>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button @click="backToServices" class="p-1.5 hover:bg-white/20 rounded-lg">
          ←
        </button>
        <button @click="refreshChat" class="p-1.5 hover:bg-white/20 rounded-lg">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
            </path>
          </svg>
        </button>
        <button @click="isOpen = false" class="p-1.5 hover:bg-white/20 rounded-lg">
          ✕
        </button>

      </div>
    </div>

    <AITabs v-model="activeTab" />

    <div ref="messagesContainer" v-if="activeTab === 'messages'" class="flex-1 overflow-y-auto bg-[#f5f2ec]">
      
      <div v-if="!currentConversationId" class="p-6 space-y-4">
        <div class="text-center space-y-2">
          <h3 class="font-bold text-gray-800 text-lg">Chào mừng bạn!</h3>
          <p class="text-sm text-gray-500">Vui lòng chọn trợ lý ảo để bắt đầu hỗ trợ:</p>
        </div>
        
        <div class="grid gap-3">
          <button 
            v-for="service in partnerServices" 
            :key="service.id"
            @click="handleSelectService(service.id)"
            :class="[
              'flex flex-col items-start p-4 rounded-xl shadow-sm transition-all text-left border-2',
              selectedServiceId === service.id
                ? 'border-[#6c4de6] bg-[#f3f0ff]'
                : 'border-transparent bg-white hover:border-[#6c4de6]'
            ]"
          >
            <div class="flex items-center justify-between w-full">
              <span class="font-bold text-[#6c4de6]">
                {{ service.name }}
              </span>

              <!-- trạng thái -->
              <span class="text-[10px] px-2 py-0.5 rounded-full"
                :class="service.status === 'active'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'">
                {{ service.status || 'inactive' }}
              </span>
            </div>

            <span class="text-xs text-gray-500 mt-1 line-clamp-2">
              {{ service.config?.system_prompt || 'Trợ lý AI hỗ trợ bạn.' }}
            </span>
          </button>
        </div>

        <div v-if="partnerServices.length === 0 && !isLoading" class="text-center py-10 text-gray-400">
           <p>Không có trợ lý nào khả dụng.</p>
        </div>
      </div>

      <div v-else>
        <div v-if="messages.length === 0 && !isLoading">
          <AIChatEmptyState />
          <AIChatWelcome 
            :service-name="currentService?.name" 
            :service-type="currentService?.type || currentService?.category"
            @suggest="handleSendMessage" 
          />
        </div>

        <div v-for="msg in messages" :key="msg.id">
          <AIChatMessage 
            :role="msg.role"
            :content="msg.content"
            :products="msg.products"
          />

          <!-- HIỂN THỊ SẢN PHẨM NGAY SAU TIN NHẮN -->
          <div v-if="msg.products && msg.products.length" class="mt-2 space-y-2">
            <div 
              v-for="(p, i) in msg.products" 
              :key="i"
              class="bg-white border rounded-lg p-3 shadow-sm"
            >
              <div class="font-semibold text-sm text-gray-800">
                {{ p.name }}
              </div>

              <div class="text-xs text-gray-500">
                {{ p.desc }}
              </div>

              <div class="text-sm font-bold text-[#6c4de6] mt-1">
                {{ p.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex-1 overflow-y-auto bg-[#f5f2ec]">
      <AINewsList @askNews="handleAskNews" />
    </div>

    <AIChatInput 
      v-if="activeTab === 'messages' && currentConversationId" 
      @send="handleSendMessage" 
      :loading="isLoading" 
    />
  </div>
</template>

<!-- <script setup>
import { ref, nextTick, watch, onMounted, computed } from 'vue'
import { useAIChatAPI } from '../../composables/useAIChatAPI'

import AITabs from './AITabs.vue'
import AIChatMessage from './AIChatMessage.vue'
import AIChatInput from './AIChatInput.vue'
import AIChatWelcome from './AIChatWelcome.vue'
import AIChatEmptyState from './AIChatEmptyState.vue'
import AINewsList from './AINewsList.vue'
import { useAIChat } from '../../composables/useAIChat'

const isOpen = ref(true)
const activeTab = ref('messages')
const messagesContainer = ref(null)
const selectedServiceId = ref(null)

const {
  messages,
  isLoading,
  sendMessage,
  resetChat,
  createConversation,
  loadConversationHistory,
  loadConversations,
  loadPartnerServices,
  loadOrganization,
  partnerServices,
  conversationsList,
  currentConversationId
} = useAIChatAPI()

const currentService = computed(() => {
  if (selectedServiceId.value) {
    return partnerServices.value.find(s => s.id === selectedServiceId.value)
  }
  
  if (currentConversationId.value && conversationsList.value.length > 0) {
    const conv = conversationsList.value.find(c => c.conversation_id === currentConversationId.value)
    if (conv) {
      return partnerServices.value.find(s => s.id === conv.partner_service_id)
    }
  }
  
  return null
})

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

watch(() => messages.value.length, () => {
  scrollToBottom()
})

const accessToken = useCookie('accessToken')
watch(accessToken, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log("🔄 Phát hiện thay đổi phiên làm việc, đang reset chat...")
    resetChat()
    loadOrganization()
    loadPartnerServices()
  }
})

onMounted(async () => {
  // Ưu tiên xác định ID tổ chức của tài khoản hiện tại
  // await loadOrganization()
  // await loadPartnerServices()
  // await loadConversations()

  const savedConvId = localStorage.getItem('current_conversation_id')
  const token = useCookie('accessToken').value

  // Nếu không có token (đã logout) nhưng vẫn còn ID cũ -> dọn sạch
  if (!token && savedConvId) {
    console.log("🚫 Không tìm thấy Token, đang dọn sạch phiên cũ...")
    resetChat()
    return
  }

  if (savedConvId) {
    currentConversationId.value = savedConvId
    await loadConversationHistory(savedConvId)
    scrollToBottom()
  }
})

const handleSelectService = async (serviceId) => {
  if (!serviceId) return

  console.log("✅ SELECTED ID (partner_service_id):", serviceId)

  selectedServiceId.value = serviceId
  isLoading.value = true

  try {
    const convId = await createConversation(serviceId)

    console.log("🧠 CONVERSATION ID:", convId)

    if (!convId) {
      console.error("❌ Không tạo được conversation")
      return
    }

    await loadConversationHistory(convId)
    await scrollToBottom()

  } catch (err) {
    console.error("🔥 ERROR createConversation:", err)
  } finally {
    isLoading.value = false
  }
}

const handleSendMessage = async (text) => {
  if (!text || !text.trim() || isLoading.value) return
  await sendMessage(text)
  scrollToBottom()
}

const handleAskNews = (news) => {
  activeTab.value = 'messages'
  setTimeout(() => {
    let prompt = `Tôi muốn hỏi về: ${news.title}. Bạn tư vấn thêm được không?`
    handleSendMessage(prompt)
  }, 200)
}

const refreshChat = async () => {
  if (confirm('Bạn có muốn kết thúc cuộc trò chuyện này để chọn trợ lý khác?')) {
    resetChat()
  }
}
</script> -->
<script setup>
import { ref, nextTick, watch, computed } from 'vue'
import { useAIChat } from '../../composables/useAIChat'

import AITabs from './AITabs.vue'
import AIChatMessage from './AIChatMessage.vue'
import AIChatInput from './AIChatInput.vue'
import AIChatWelcome from './AIChatWelcome.vue'
import AIChatEmptyState from './AIChatEmptyState.vue'
import AINewsList from './AINewsList.vue'

const isOpen = ref(true)
const activeTab = ref('messages')
const messagesContainer = ref(null)

const {
  messages,
  isLoading,
  sendMessage,
  resetChat,
  createConversation,
  partnerServices,
  currentConversationId
} = useAIChat()

const selectedServiceId = ref(null)

const currentService = computed(() =>
  partnerServices.value.find(s => s.id === selectedServiceId.value)
)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop =
      messagesContainer.value.scrollHeight
  }
}

watch(() => messages.value.length, scrollToBottom)

const handleSelectService = async (serviceId) => {
  selectedServiceId.value = serviceId
  await createConversation(serviceId)
}

const handleSendMessage = async (text) => {
  if (!text.trim()) return
  await sendMessage(text)
}

const handleAskNews = (news) => {
  activeTab.value = 'messages'
  setTimeout(() => {
    handleSendMessage(`Tôi muốn hỏi về: ${news.title}`)
  }, 200)
}

const refreshChat = () => {
  if (confirm('Xóa toàn bộ tin nhắn?')) {
    messages.value = []
  }
}

const backToServices = () => {
  if (confirm('Quay lại chọn trợ lý?')) {
    resetChat()
  }
}
</script>