import { ref } from 'vue'
import { getAuth } from "firebase/auth"
import { auth, provider, signInWithPopup } from "../auth/firebase"

export const useAIChatAPI = () => {
  const messages = ref([])
  const isLoading = ref(false)
  const currentConversationId = ref(localStorage.getItem('current_conversation_id'))
  const guestSessionId = ref(localStorage.getItem('guest_session_id') || '')
  const conversationsList = ref([])
  const partnerServices = ref([])
  const currentServiceName = ref(localStorage.getItem('current_service_name') || 'tourist')

  const BASE_URL = 'https://platform-gateway-dev.orbitai.fun'
  const ORG_ID = 'e3845d6c-9bf8-4a2e-a766-33e67f23db22'
  const DEFAULT_SERVICE_ID = "1392a458-889d-4825-a2b9-9dc1bc4c6e69"
  const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiMGU4NjhjMi01NDk3LTQ3ODEtYjJkNC0yNjNmZmZlMTNhMDQiLCJyb2xlcyI6WyJ1c2VyIiwicGFydG5lciJdLCJlbWFpbCI6InRyaXRpbmgyODFAZ21haWwuY29tIiwibmFtZSI6Im5ndXnhu4VuIHTDrW5oIiwiZnVsbF9uYW1lIjoibmd1eeG7hW4gdMOtbmgiLCJpYXQiOjE3NzcwMDYzNzIsImV4cCI6MTc3NzA5Mjc3MiwiYXVkIjoicGxhdGZvcm0tYWktYmFja2VuZC1hdWRpZW5jZSIsImlzcyI6InBsYXRmb3JtLWFpLWJhY2tlbmQifQ.RTIiwqvrZxpNwowLm_aP-2aZG5HCaxnZmAfkJtBuzF8"


  const accessToken = useCookie('accessToken')

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

  const callAPI = async (url, options = {}, requireAuth = false) => {
    const token = useCookie('accessToken').value || TEST_TOKEN

    let headers = {
      "Content-Type": "application/json",
      "x-org-id": ORG_ID,
      ...(options.headers || {})
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
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
    const res = await callAPI('/v1/api/partner/ai-services-all', {}, false)
    if (res?.data?.length) {
      partnerServices.value = res.data.map((service, index) => ({
        ...service,
        id: index === 0 ? DEFAULT_SERVICE_ID : null,
        status: index === 0 ? (service.status || 'active') : 'coming_soon',
        service_name: index === 0 ? 'tourist' : service.type
      }))
      return partnerServices.value
    }

    // Fallback nếu BE không trả data
    partnerServices.value = [{
      id: DEFAULT_SERVICE_ID,
      name: "Tư vấn Tour Du lịch",
      description: "Tư vấn lịch trình, booking vé máy bay và khách sạn",
      status: "active",
      type: "tour",
      service_name: "tourist"
    }]
    return partnerServices.value
  }

  const createConversation = async (partnerServiceId, serviceName) => {
    if (serviceName) {
      currentServiceName.value = serviceName
      localStorage.setItem('current_service_name', serviceName)
    }

    const existingGuestId = localStorage.getItem('guest_session_id') || ''

    const body = {
      partner_service_id: partnerServiceId || DEFAULT_SERVICE_ID,
      guest_session_id: existingGuestId
    }

    const res = await callAPI('/v1/api/chat/conversations', {
      method: 'POST',
      body: JSON.stringify(body)
    }, false)

    if (res?.status === "success") {
      const id = res.data.conversation_id
      currentConversationId.value = id
      localStorage.setItem('current_conversation_id', id)

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
        body: JSON.stringify({
          content: text,
          service_name: currentServiceName.value || 'tourist'
        })
      },
      false
    )

    const ai = res?.data || {}

    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: ai.content || "AI không phản hồi.",
      products: ai.products || []
    })

    isLoading.value = false
  }

  const loadConversationHistory = async (id) => {
    const res = await callAPI(`/v1/api/chat/conversations/${id}/messages`, {}, false)
    messages.value = (res?.data || []).map((m, i) => ({
      id: i,
      role: m.role,
      content: m.content,
      products: m.products || []
    }))
  }

  const loadConversations = async () => {
    if (isGuestMode()) return
    const res = await callAPI('/v1/api/chat/conversations', {}, true)
    conversationsList.value = res?.data || []
  }

  const resetChat = () => {
    localStorage.removeItem('current_conversation_id')
    currentConversationId.value = null
    messages.value = []
  }

  return {
    messages,
    isLoading,
    currentConversationId,
    conversationsList,
    partnerServices,
    currentServiceName,
    loadPartnerServices,
    createConversation,
    sendMessage,
    loadConversationHistory,
    loadConversations,
    resetChat
  }
}