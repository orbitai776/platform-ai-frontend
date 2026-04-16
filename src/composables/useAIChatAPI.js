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

  const BASE_URL = 'https://platform-gateway-dev.orbitai.fun'
  const ORG_ID = 'e3845d6c-9bf8-4a2e-a766-33e67f23db22'
  const accessTokenCookie = useCookie('accessToken')

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
        console.log("🔐 Đang login Firebase...")
        const result = await signInWithPopup(auth, provider)
        user = result.user
      } catch (err) {
        console.error("❌ LOGIN FAIL:", err)
        return null
      }
    }

    const token = await user.getIdToken(true)
    console.log("✅ Firebase token OK")
    return token
  }

  const getBackendToken = async () => {
    try {
      if (accessTokenCookie.value) return accessTokenCookie.value

      const firebaseToken = await getFirebaseToken()
      if (!firebaseToken) return null

      const res = await fetch(`${BASE_URL}/v1/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: firebaseToken })
      })

      const data = await res.json()

      const token = data?.data?.access_token || data?.accessToken

      if (token) {
        accessTokenCookie.value = token
      }

      return token
    } catch (err) {
      console.error("Auth error:", err)
      return null
    }
  }

  const callAPI = async (url, options = {}) => {
    const token = await getBackendToken()

    if (!token) throw new Error("Unauthorized")

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "x-org-id": ORG_ID,
      ...(options.headers || {})
    }

    const res = await fetch(BASE_URL + url, {
      ...options,
      headers
    })

    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      console.warn("API ERROR:", url, result)
      return null
    }

    return result
  }

  const loadPartnerServices = async () => {
    try {
      const res = await callAPI('/v1/api/partner/ai-services')
      partnerServices.value = res?.data || []
      return partnerServices.value
    } catch (error) {
      console.error('Lỗi load partner services:', error)
      partnerServices.value = []
      return []
    }
  }

  const createConversation = async (partnerServiceId) => {
    if (!partnerServiceId) return null

    try {
      let guestId = guestSessionId.value

      if (!guestId) {
        guestId = crypto.randomUUID?.() || `guest_${Date.now()}`
        guestSessionId.value = guestId
        localStorage.setItem('guest_session_id', guestId)
      }

      const res = await callAPI('/v1/api/chat/conversations', {
        method: 'POST',
        body: JSON.stringify({
          partner_service_id: partnerServiceId,
          guest_session_id: guestId
        })
      })

      const convId = res?.data?.conversation_id

      if (convId) {
        currentConversationId.value = convId
        localStorage.setItem('current_conversation_id', convId)
        messages.value = []
      }

      return convId
    } catch (error) {
      console.error('Create conversation error:', error)
      return null
    }
  }

  const sendMessage = async (text) => {
    if (!text?.trim() || !currentConversationId.value) return

    try {
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
        products: ai.products || []
      })

    } catch (err) {
      messages.value.push({
        id: Date.now() + 2,
        role: 'assistant',
        content: `Lỗi: ${err.message}`
      })
    } finally {
      isLoading.value = false
    }
  }

  const loadConversationHistory = async (id) => {
    try {
      const res = await callAPI(`/v1/api/chat/conversations/${id}/messages`)
      messages.value = (res?.data || []).map((m, i) => ({
        id: i,
        role: m.role,
        content: m.content,
        products: m.products || []
      }))
    } catch (e) {
      console.error("Load history error:", e)
    }
  }

  const loadConversations = async () => {
    try {
      const res = await callAPI('/v1/api/chat/conversations')
      conversationsList.value = res?.data || []
    } catch (e) {
      console.error("Load conversations error:", e)
    }
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
    loadPartnerServices,
    createConversation,
    sendMessage,
    loadConversationHistory,
    loadConversations,
    resetChat
  }
}