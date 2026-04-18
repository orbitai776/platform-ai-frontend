import { ref, computed } from 'vue'
import { modelMap } from './ai-models'

export function useAIChat() {
  const messages = ref([])
  const isLoading = ref(false)
  const currentConversationId = ref(null)
  const conversationsList = ref([])
  const selectedServiceId = ref(null)

  const partnerServices = ref([
    { id: 'tour', name: 'AI Du Lịch', type: 'tour', status: 'active' },
    { id: 'villa', name: 'AI Khách Sạn', type: 'villa', status: 'active' },
    { id: 'flight', name: 'AI Vé Máy Bay', type: 'flight', status: 'active' },
    { id: 'product', name: 'AI Đặc Sản', type: 'product', status: 'active' },
    { id: 'news', name: 'AI Tin Tức', type: 'news', status: 'active' },
    { id: 'support', name: 'AI Hỗ Trợ', type: 'support', status: 'active' },
    { id: 'general', name: 'AI Tư Vấn Tổng', type: 'general', status: 'active' }
  ])

  const currentService = computed(() =>
    partnerServices.value.find(s => s.id === selectedServiceId.value)
  )

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const createConversation = async (serviceId) => {
    selectedServiceId.value = serviceId

    const newId = 'conv_' + Date.now()
    currentConversationId.value = newId
    messages.value = []

    conversationsList.value.push({
      conversation_id: newId,
      partner_service_id: serviceId
    })

    localStorage.setItem('current_conversation_id', newId)
    return newId
  }

 

  const generateReply = (text) => {
    const type = currentService.value?.type

    const model = modelMap[type]

    if (!model) {
      return '🤖 Model chưa hỗ trợ!'
    }

    return model(text)
  }

  const sendMessage = async (text) => {
    if (!text) return

    messages.value.push({
      id: Date.now(),
      role: 'user',
      content: text
    })

    isLoading.value = true

    await new Promise(resolve => setTimeout(resolve, 800))

    const result = generateReply(text)

    if (typeof result === 'object') {
      messages.value.push({
        id: Date.now() + 1,
        role: 'assistant',
        content: result.text,
        products: result.products,
        isCompleted: true
      })
    } else {
      messages.value.push({
        id: Date.now() + 1,
        role: 'assistant',
        content: result,
        isCompleted: true
      })
    }

    isLoading.value = false
  }

  const resetChat = () => {
    messages.value = []
    currentConversationId.value = null
    selectedServiceId.value = null
    localStorage.removeItem('current_conversation_id')
  }

  const loadConversationHistory = async () => []
  const loadConversations = async () => []
  const loadPartnerServices = async () => partnerServices.value
  const loadOrganization = async () => ({ id: 'fake-org' })

  return {
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
  }
}