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
  const activeOrgId = ref('e3845d6c-9bf8-4a2e-a766-33e67f23db22')
  const DEFAULT_SERVICE_ID = "1392a458-889d-4825-a2b9-9dc1bc4c6e69"
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

  const callAPI = async (url, options = {}, isPublic = false) => {
    let headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }

    let token = null

    if (!isPublic) {
      token = await getBackendToken()
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
      headers["x-org-id"] = activeOrgId.value
    }

    if (isPublic && activeOrgId.value) {
      headers["x-org-id"] = activeOrgId.value
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
      const token = accessTokenCookie.value

      let res
      if (token) {
        res = await callAPI('/v1/api/partner/ai-services')
        partnerServices.value = res?.data || []
      }

      else {
        console.log("👤 Guest mode → dùng AI public")

        partnerServices.value = [
          {
            id: "00000000-0000-0000-0000-000000000001",
            name: "AI Public Assistant",
            status: "active",
            type: "public",
            config: {
              system_prompt: "Trợ lý AI hỗ trợ khách chưa đăng nhập"
            }
          }
        ]
      }

      console.log("📦 partnerServices:", partnerServices.value)

      return partnerServices.value

    } catch (error) {
      console.error('❌ Lỗi load partner services:', error)
      partnerServices.value = []
      return []
    }
  }

  const createConversation = async (partnerServiceId) => {
    try {
      let serviceId = partnerServiceId
      if (!serviceId) {
        console.warn("⚠️ Không có service → dùng DEFAULT_SERVICE_ID")
        serviceId = DEFAULT_SERVICE_ID
      }

      const isValidUUID = /^[0-9a-fA-F-]{36}$/.test(serviceId)
      if (!isValidUUID) {
        console.error("❌ serviceId không hợp lệ:", serviceId)
        return null
      }

      let guestId = guestSessionId.value

      if (!guestId) {
        guestId = crypto.randomUUID?.() || `guest_${Date.now()}`
        guestSessionId.value = guestId
        localStorage.setItem('guest_session_id', guestId)
      }

      const res = await callAPI('/v1/api/chat/conversations', {
        method: 'POST',
        body: JSON.stringify({
          partner_service_id: serviceId,
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

      const token = accessTokenCookie.value

      const res = await callAPI(
        `/v1/api/chat/conversations/${currentConversationId.value}/messages`,
        {
          method: 'POST',
          body: JSON.stringify({ content: text })
        },
        !token
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
    if (!id) return
    try {
      const res = await callAPI(`/v1/api/chat/conversations/${id}/messages`)

      if (!res) {
        console.warn("⚠️ Không thể tải lịch sử cuộc trò chuyện. Có thể phiên đã hết hạn hoặc không có quyền.")
        resetChat()
        return
      }

      messages.value = (res?.data || []).map((m, i) => ({
        id: i,
        role: m.role,
        content: m.content,
        products: m.products || []
      }))
    } catch (e) {
      console.error("Load history error:", e)
      resetChat()
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

  const loadOrganization = async () => {
    try {
      const res = await $fetch('/api/partner/organization')
      if (res?.data?.id) {
        activeOrgId.value = res.data.id
        console.log("🏢 Cập nhật Org ID mới:", activeOrgId.value)
      }
    } catch (err) {
      console.warn("⚠️ Không lấy được Org ID từ Profile, dùng mặc định")
    }
  }

  const resetChat = () => {
    localStorage.removeItem('current_conversation_id')
    localStorage.removeItem('guest_session_id')
    currentConversationId.value = null
    guestSessionId.value = ''
    messages.value = []
    console.log("🧹 Đã xóa sạch dữ liệu chat phiên cũ")
  }

  return {
    messages,
    isLoading,
    currentConversationId,
    conversationsList,
    partnerServices,
    loadPartnerServices,
    loadOrganization,
    createConversation,
    sendMessage,
    loadConversationHistory,
    loadConversations,
    resetChat
  }
}