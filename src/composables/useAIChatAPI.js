import { ref } from 'vue'

// ✅ IMPORT MODEL Ở TRÊN CÙNG
import { tourModel } from './ai-models/tourModel'
import { villaModel } from './ai-models/villaModel'
import { flightModel } from './ai-models/flightModel'
import { productModel } from './ai-models/productModel'
import { comboModel } from './ai-models/comboModel'

const USE_FAKE = true

export const useAIChatAPI = () => {
  const messages = ref([])
  const isLoading = ref(false)

  const currentConversationId = ref(null)
  const currentServiceId = ref(null) // ✅ FIX: lưu riêng service

  const partnerServices = ref([
    { id: 'tour', name: 'AI Du Lịch', type: 'tour', status: 'active' },
    { id: 'villa', name: 'AI Khách Sạn', type: 'villa', status: 'active' },
    { id: 'flight', name: 'AI Vé Máy Bay', type: 'flight', status: 'active' },
    { id: 'product', name: 'AI Đặc Sản', type: 'product', status: 'active' },
    { id: 'combo', name: 'AI Combo', type: 'combo', status: 'active' }
  ])

  // =========================
  // CREATE CONVERSATION
  // =========================
  const createConversation = async (serviceId) => {
    currentServiceId.value = serviceId

    const fakeId = serviceId + '_' + Date.now()
    currentConversationId.value = fakeId
    messages.value = []

    return fakeId
  }

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async (text) => {
    if (!text?.trim()) return

    messages.value.push({
      id: Date.now(),
      role: 'user',
      content: text
    })

    isLoading.value = true

    try {
      await new Promise(r => setTimeout(r, 800))

      const service = partnerServices.value.find(
        s => s.id === currentServiceId.value
      )

      let reply = ''
      let products = null

      switch (service?.type) {
        case 'tour':
          reply = tourModel(text)
          break

        case 'villa':
          reply = villaModel(text)
          break

        case 'flight':
          reply = flightModel(text)
          break

        case 'product': {
          const result = productModel(text)
          reply = result.text
          products = result.products
          break
        }

        case 'combo': {
          reply = comboModel(text)
          break
        }

        default:
          reply = '🤖 Bạn muốn hỏi gì thêm?'
      }

      messages.value.push({
        id: Date.now() + 1,
        role: 'assistant',
        content: reply,
        products,
        isCompleted: true
      })

    } catch (err) {
      console.error(err)

      messages.value.push({
        id: Date.now() + 1,
        role: 'assistant',
        content: '⚠️ Có lỗi xảy ra',
        isCompleted: true
      })
    } finally {
      isLoading.value = false
    }
  }

  // =========================
  // RESET CHAT
  // =========================
  const resetChat = () => {
    currentConversationId.value = null
    currentServiceId.value = null
    messages.value = []
  }

  return {
    messages,
    isLoading,
    partnerServices,
    currentConversationId,
    createConversation,
    sendMessage,
    resetChat
  }
}