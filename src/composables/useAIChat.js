import { ref, computed } from 'vue'
import { useAIChatAPI } from './useAIChatAPI'

export function useAIChat() {
  const api = useAIChatAPI()

  const messages = api.messages
  const isLoading = api.isLoading
  const currentConversationId = api.currentConversationId
  const conversationsList = api.conversationsList
  const partnerServices = api.partnerServices

  const selectedServiceId = ref(null)

  const currentService = computed(() =>
    partnerServices.value.find(s => s.id === selectedServiceId.value)
  )

  const isGuest = () => !useCookie('access_token').value

  const createConversation = async (serviceId) => {
    selectedServiceId.value = serviceId

    if (isGuest()) {
      try {
        const guestSessionId =
          localStorage.getItem('guest_session_id') || crypto.randomUUID()

        localStorage.setItem('guest_session_id', guestSessionId)

        const res = await $fetch(
          'https://platform-gateway-dev.orbitai.fun/v1/api/chat/conversations',
          {
            method: 'POST',
            body: {
              partner_service_id: serviceId,
              guest_session_id: guestSessionId
            }
          }
        )

        const convId = res?.data?.conversation_id

        currentConversationId.value = convId

        localStorage.setItem('conversation_id', convId)

        return convId
      } catch (err) {
        console.error('❌ Guest createConversation error:', err)
        return null
      }
    }

    const convId = await api.createConversation(serviceId)
    return convId
  }

  const sendMessage = async (text) => {
    if (isGuest()) {
      const conversationId =
        currentConversationId.value ||
        localStorage.getItem('conversation_id')

      if (!conversationId) {
        console.error('❌ No conversation for guest')
        return
      }

      try {
        isLoading.value = true

        // push user message trước
        messages.value.push({
          role: 'user',
          content: text
        })

        const res = await $fetch(
          `https://platform-gateway-dev.orbitai.fun/v1/api/chat/conversations/${conversationId}/messages`,
          {
            method: 'POST',
            body: {
              message: text
            }
          }
        )

        messages.value.push({
          role: 'assistant',
          content: res?.data?.response || 'Không có phản hồi'
        })
      } catch (err) {
        console.error('❌ Guest sendMessage error:', err)
      } finally {
        isLoading.value = false
      }

      return
    }

    // 👉 USER LOGIN
    await api.sendMessage(text)
  }

  const resetChat = () => {
    selectedServiceId.value = null
    api.resetChat()

    // optional: clear guest
    localStorage.removeItem('conversation_id')
  }

  const loadConversationHistory = async (id) => {
    // 👉 guest không cần load history từ BE
    if (isGuest()) return

    await api.loadConversationHistory(id)
  }

  const loadConversations = async () => {
    if (isGuest()) return
    await api.loadConversations()
  }

  const loadPartnerServices = async () => {
    return await api.loadPartnerServices()
  }

  const loadOrganization = async () => {
    return { id: 'fake-org' }
  }

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