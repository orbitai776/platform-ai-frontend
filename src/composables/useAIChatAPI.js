import { ref, watch } from 'vue'
import { getAuth } from "firebase/auth"
import { auth, provider, signInWithPopup } from "../auth/firebase"
import { usePartnerServices } from './usePartnerService'

export const useAIChatAPI = () => {
  const messages = ref([])
  const isLoading = ref(false)
  const conversationsList = ref([])

  const { services: partnerServices, loadPublicServices } = usePartnerServices()

  const BASE_URL = 'https://platform-gateway-dev.orbitai.fun'
  const ORG_ID = 'e3845d6c-9bf8-4a2e-a766-33e67f23db22'

  const accessToken = useCookie('accessToken')

  const getCurrentUserKey = () => {
    if (!accessToken.value) return 'guest'
    return accessToken.value.substring(0, 20)
  }

  const clearStorage = () => {
    localStorage.removeItem('current_conversation_id')
    localStorage.removeItem('guest_session_id')
    localStorage.removeItem('current_service_name')
    localStorage.removeItem('current_partner_id')
    localStorage.removeItem('chat_user_key')
  }

  const currentConversationId = ref(null)
  const guestSessionId = ref('')
  const currentServiceName = ref('')
  const currentPartnerId = ref('')

  const resetState = () => {
    currentConversationId.value = null
    guestSessionId.value = ''
    currentServiceName.value = ''
    currentPartnerId.value = ''
    messages.value = []
    conversationsList.value = []
  }

  const initFromStorage = () => {
    const savedUserKey = localStorage.getItem('chat_user_key')
    const currentUserKey = getCurrentUserKey()

    if (savedUserKey !== currentUserKey) {
      clearStorage()
      localStorage.setItem('chat_user_key', currentUserKey)
      return
    }

    currentConversationId.value = localStorage.getItem('current_conversation_id')
    guestSessionId.value = localStorage.getItem('guest_session_id') || ''
    currentServiceName.value = localStorage.getItem('current_service_name') || ''
    currentPartnerId.value = localStorage.getItem('current_partner_id') || ''
  }

  initFromStorage()

  watch(accessToken, (newToken, oldToken) => {
    if (oldToken === undefined) return

    const newKey = newToken ? newToken.substring(0, 20) : 'guest'
    const savedKey = localStorage.getItem('chat_user_key')

    if (newKey !== savedKey) {
      clearStorage()
      localStorage.setItem('chat_user_key', newKey)
      resetState()
      window.location.reload()
    }
  })

  const getFirebaseToken = async () => {
    const authInstance = getAuth()
    let user = authInstance.currentUser

    if (!user) {
      await new Promise((resolve) => {
        const unsubscribe = authInstance.onAuthStateChanged((u) => {
          user = u
          unsubscribe()
          resolve()
        })
      })
    }

    if (!user) {
      try {
        const result = await signInWithPopup(auth, provider)
        user = result.user
      } catch (err) {
        console.error("Firebase login error:", err)
        return null
      }
    }

    return await user.getIdToken(true)
  }

  const getBackendToken = async () => {
    try {
      if (accessToken.value) return accessToken.value
      const firebaseToken = await getFirebaseToken()
      if (!firebaseToken) return null
      const res = await fetch(`${BASE_URL}/v1/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: firebaseToken })
      })
      const data = await res.json()
      const token = data?.data?.access_token
      if (token) accessToken.value = token
      return token
    } catch (err) {
      console.error("getBackendToken error:", err)
      return null
    }
  }

  const isGuestMode = () => !accessToken.value

  const callAPI = async (url, options = {}) => {
    const token = accessToken.value

    const headers = {
      "Content-Type": "application/json",
      "x-org-id": ORG_ID,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }

    try {
      const res = await fetch(BASE_URL + url, {
        method: options.method || "GET",
        headers,
        body: options.body
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        console.error(`API Error [${res.status}] ${url}:`, JSON.stringify(data))
        return null
      }

      return data
    } catch (err) {
      console.error("Fetch Error:", err)
      return null
    }
  }

  const loadPartnerServices = async () => {
    await loadPublicServices()
    return partnerServices.value
  }

  const createConversation = async (partnerServiceId, serviceName) => {
    if (serviceName) {
      currentServiceName.value = serviceName
      localStorage.setItem('current_service_name', serviceName)
    }

    if (partnerServiceId) {
      currentPartnerId.value = partnerServiceId
      localStorage.setItem('current_partner_id', partnerServiceId)
    }

    const body = {
      partner_service_id: partnerServiceId || currentPartnerId.value,
      guest_session_id: guestSessionId.value || ""
    }

    const res = await callAPI('/v1/api/chat/conversations', {
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (res?.status === "success") {
      const id = res.data.conversation_id
      currentConversationId.value = id
      localStorage.setItem('current_conversation_id', id)

      localStorage.setItem('chat_user_key', getCurrentUserKey())

      if (res.data.guest_session_id) {
        guestSessionId.value = res.data.guest_session_id
        localStorage.setItem('guest_session_id', res.data.guest_session_id)
      }

      messages.value = []
      return id
    }

    return null
  }

  const sendMessage = async (text) => {
    if (!text?.trim() || !currentConversationId.value) return

    isLoading.value = true

    messages.value.push({
      id: Date.now(),
      role: 'user',
      content: text
    })

    const res = await callAPI(
      `/v1/api/chat/conversations/${currentConversationId.value}/messages`,
      {
        method: 'POST',
        body: JSON.stringify({ content: text })
      }
    )

    const ai = res?.data || {}

    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: ai.content || "AI không phản hồi.",
      is_completed: ai.is_completed || false,
      products: ai.products || []
    })

    isLoading.value = false
  }

  const loadConversationHistory = async (id) => {
    const res = await callAPI(`/v1/api/chat/conversations/${id}/messages`)
    messages.value = (res?.data || []).map((m, i) => ({
      id: i,
      role: m.role,
      content: m.content,
      is_completed: m.is_completed || false,
      products: m.products || []
    }))
  }

  const loadConversations = async () => {
    if (isGuestMode()) return
    const res = await callAPI('/v1/api/chat/conversations')
    conversationsList.value = res?.data || []
  }

  const resetChat = () => {
    clearStorage()
    resetState()
  }

  return {
    messages,
    isLoading,
    currentConversationId,
    conversationsList,
    partnerServices,
    currentServiceName,
    currentPartnerId,
    isGuestMode,
    getBackendToken,
    loadPartnerServices,
    createConversation,
    sendMessage,
    loadConversationHistory,
    loadConversations,
    resetChat
  }
}