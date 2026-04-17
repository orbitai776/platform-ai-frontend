<template>
  <div class="pointer-events-none fixed inset-x-3 bottom-3 z-[9999] sm:inset-x-auto sm:bottom-6 sm:right-6">
    <div class="pointer-events-auto ml-auto flex w-full max-w-[430px] flex-col items-end gap-3">
      <button
        class="group flex items-center gap-3 rounded-full bg-slate-900/95 px-4 py-3 text-white shadow-[0_20px_60px_rgba(15,23,42,0.28)] ring-1 ring-white/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-slate-950"
        @click="isOpen = !isOpen"
      >
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </span>
        <div class="text-left">
          <div class="text-[11px] uppercase tracking-[0.24em] text-slate-300">AI Chat</div>
          <div class="text-sm font-semibold">{{ isOpen ? 'Thu gọn cửa sổ chat' : 'Mở trợ lý ngay' }}</div>
        </div>
      </button>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-3 opacity-0 scale-[0.98]"
        enter-to-class="translate-y-0 opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100 scale-100"
        leave-to-class="translate-y-3 opacity-0 scale-[0.98]"
      >
        <div
          v-if="isOpen"
          class="chat-shell relative flex h-[calc(100vh-6.5rem)] max-h-[720px] w-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:h-[720px]"
          style="isolation: isolate;"
        >
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_40%)]"></div>

          <div class="relative border-b border-slate-200/70 bg-white/75 px-5 pb-4 pt-5 backdrop-blur-xl">
            <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(241,245,249,0.35))]"></div>

            <div class="relative flex items-start justify-between gap-4">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-3">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-slate-900 text-white shadow-lg shadow-slate-900/15">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.75 3.75h4.5m-7.5 5.5h10.5m-13 0h.75m11.5 0h.75m-10 5.5a2.75 2.75 0 015.5 0v.25h-5.5v-.25zm8 0a2.75 2.75 0 015.5 0v.25h-5.5v-.25zM8 7.5a1.25 1.25 0 11-2.5 0A1.25 1.25 0 018 7.5zm10.5 0A1.25 1.25 0 1116 7.5a1.25 1.25 0 012.5 0zM12 3.75v3" />
                    </svg>
                  </div>

                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">AI Assistant</span>
                      <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Online 24/7
                      </span>
                    </div>

                    <h2 class="mt-2 text-lg font-semibold text-slate-900">Chat hỗ trợ thông minh</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-500">
                      {{ headerSubtitle }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                    <span class="h-2 w-2 rounded-full bg-sky-500"></span>
                    {{ currentService?.name || 'Chọn trợ lý để bắt đầu' }}
                  </span>
                  <span class="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                    {{ activeTab === 'messages' ? 'Trò chuyện trực tiếp' : 'Tin tức nổi bật' }}
                  </span>
                </div>
              </div>

              <div class="flex shrink-0 items-center gap-2">
                <button
                  class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/85 text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-600"
                  title="Đổi trợ lý"
                  @click="refreshChat"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/85 text-slate-600 shadow-sm transition hover:border-rose-200 hover:text-rose-500"
                  title="Đóng chat"
                  @click="isOpen = false"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <AITabs v-model="activeTab" />

          <div
            v-if="activeTab === 'messages'"
            ref="messagesContainer"
            class="chat-scroll relative flex-1 overflow-y-auto px-4 pb-4 pt-4"
          >
            <div v-if="!currentConversationId" class="relative space-y-4">
              <section class="overflow-hidden rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
                <div class="flex items-start gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-sky-100 text-sky-700">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 8h2a2 2 0 012 2v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9a2 2 0 012-2h2m10 0V6a3 3 0 00-3-3H10a3 3 0 00-3 3v2m10 0H7" />
                    </svg>
                  </div>

                  <div class="min-w-0">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600">Bắt đầu nhanh</p>
                    <h3 class="mt-2 text-xl font-semibold text-slate-900">Chọn trợ lý phù hợp với nhu cầu của bạn</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-500">
                      Mỗi chatbox có vai trò riêng. Chọn đúng trợ lý để nhận câu trả lời sát ngữ cảnh hơn mà không cần thay đổi dữ liệu hiện tại.
                    </p>
                  </div>
                </div>
              </section>

              <div class="grid gap-3">
                <button
                  v-for="service in partnerServices"
                  :key="service.id"
                  class="group relative overflow-hidden rounded-[24px] border bg-white/85 p-4 text-left shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)]"
                  :class="selectedServiceId === service.id ? 'border-sky-400 ring-2 ring-sky-100' : 'border-white/70 hover:border-sky-200'"
                  @click="handleSelectService(service.id)"
                >
                  <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.4),rgba(241,245,249,0.25))]"></div>

                  <div class="relative flex items-start gap-4">
                    <div
                      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] text-lg font-semibold transition"
                      :class="selectedServiceId === service.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white'"
                    >
                      {{ getServiceIcon(service) }}
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="flex flex-wrap items-start justify-between gap-3">
                        <div class="min-w-0">
                          <h4 class="truncate text-base font-semibold text-slate-900">{{ service.name }}</h4>
                          <p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            {{ getServiceTypeLabel(service) }}
                          </p>
                        </div>

                        <span
                          class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
                          :class="getServiceStatusClass(service.status)"
                        >
                          {{ getServiceStatusLabel(service.status) }}
                        </span>
                      </div>

                      <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {{ service.config?.system_prompt || 'Trợ lý AI hỗ trợ bạn.' }}
                      </p>

                      <div class="mt-4 flex items-center justify-between gap-3 text-xs">
                        <span class="text-slate-400">Nhấn để mở cuộc trò chuyện mới</span>
                        <span class="font-medium text-sky-600">Kết nối ngay</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div
                v-if="partnerServices.length === 0 && !isLoading"
                class="rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-sm text-slate-500"
              >
                Chưa có trợ lý khả dụng để hiển thị.
              </div>
            </div>

            <div v-else class="relative">
              <div v-if="messages.length === 0 && !isLoading" class="space-y-4">
                <AIChatEmptyState />
                <AIChatWelcome
                  :service-name="currentService?.name"
                  :service-type="currentService?.type || currentService?.category"
                  @suggest="handleSendMessage"
                />
              </div>

              <div v-else class="space-y-5">
                <div
                  v-if="currentService"
                  class="rounded-[22px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                      {{ getServiceIcon(currentService) }}
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-slate-900">{{ currentService.name }}</p>
                      <p class="text-xs text-slate-500">
                        Phiên trò chuyện đang hoạt động và sẵn sàng phản hồi.
                      </p>
                    </div>
                  </div>
                </div>

                <AIChatMessage
                  v-for="msg in messages"
                  :key="msg.id"
                  :role="msg.role"
                  :content="msg.content"
                  :products="msg.products"
                  :is-completed="msg.isCompleted"
                />

                <div v-if="isLoading" class="flex justify-start">
                  <div class="flex items-end gap-3">
                    <div class="hidden h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white shadow-sm sm:flex">
                      AI
                    </div>

                    <div class="rounded-[24px] rounded-bl-md border border-white/70 bg-white/90 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                      <div class="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">Đang phản hồi</div>
                      <div class="flex gap-1.5">
                        <span class="h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce" style="animation-delay: 0ms"></span>
                        <span class="h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce" style="animation-delay: 150ms"></span>
                        <span class="h-2.5 w-2.5 rounded-full bg-sky-500 animate-bounce" style="animation-delay: 300ms"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="chat-scroll relative flex-1 overflow-y-auto px-4 pb-4 pt-4">
            <AINewsList @askNews="handleAskNews" />
          </div>

          <AIChatInput
            v-if="activeTab === 'messages' && currentConversationId"
            :loading="isLoading"
            @send="handleSendMessage"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useAIChatAPI } from '../../composables/useAIChatAPI'

import AITabs from './AITabs.vue'
import AIChatMessage from './AIChatMessage.vue'
import AIChatInput from './AIChatInput.vue'
import AIChatWelcome from './AIChatWelcome.vue'
import AIChatEmptyState from './AIChatEmptyState.vue'
import AINewsList from './AINewsList.vue'

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
    return partnerServices.value.find(service => service.id === selectedServiceId.value)
  }

  if (currentConversationId.value && conversationsList.value.length > 0) {
    const conversation = conversationsList.value.find(item => item.conversation_id === currentConversationId.value)

    if (conversation) {
      return partnerServices.value.find(service => service.id === conversation.partner_service_id)
    }
  }

  return null
})

const headerSubtitle = computed(() => {
  if (currentService.value?.name) {
    return `Đang kết nối với ${currentService.value.name}. Bạn có thể tiếp tục hỏi đáp trong cùng một cửa sổ chat.`
  }

  return 'Chọn một trợ lý bên dưới để bắt đầu cuộc trò chuyện theo đúng nhu cầu.'
})

const getServiceIcon = (service) => {
  const source = `${service?.type || ''} ${service?.category || ''} ${service?.name || ''}`.toLowerCase()

  if (source.includes('tour') || source.includes('travel')) return '✈'
  if (source.includes('villa') || source.includes('hotel') || source.includes('room')) return '⌂'
  if (source.includes('inventory') || source.includes('product') || source.includes('shop')) return '◫'

  return 'AI'
}

const getServiceTypeLabel = (service) => {
  const type = service?.type || service?.category || 'assistant'
  return String(type).replace(/_/g, ' ')
}

const getServiceStatusLabel = (status) => {
  return status === 'active' ? 'Sẵn sàng' : 'Tạm tắt'
}

const getServiceStatusClass = (status) => {
  return status === 'active'
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-slate-100 text-slate-500'
}

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

watch(() => currentConversationId.value, (value) => {
  if (!value) {
    selectedServiceId.value = null
  }
})

const accessToken = useCookie('accessToken')

watch(accessToken, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log('Phát hiện thay đổi phiên làm việc, đang reset chat...')
    resetChat()
    selectedServiceId.value = null
    loadOrganization()
    loadPartnerServices()
  }
})

onMounted(async () => {
  await loadOrganization()
  await loadPartnerServices()
  await loadConversations()

  const savedConvId = localStorage.getItem('current_conversation_id')
  const token = useCookie('accessToken').value

  if (!token && savedConvId) {
    console.log('Không tìm thấy token, đang dọn sạch phiên cũ...')
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

  console.log('Selected partner_service_id:', serviceId)

  selectedServiceId.value = serviceId
  isLoading.value = true

  try {
    const convId = await createConversation(serviceId)

    console.log('Conversation ID:', convId)

    if (!convId) {
      console.error('Không tạo được conversation')
      return
    }

    await loadConversationHistory(convId)
    await scrollToBottom()
  } catch (err) {
    console.error('Error createConversation:', err)
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
    const prompt = `Tôi muốn hỏi về: ${news.title}. Bạn tư vấn thêm được không?`
    handleSendMessage(prompt)
  }, 200)
}

const refreshChat = async () => {
  if (confirm('Bạn có muốn kết thúc cuộc trò chuyện này để chọn trợ lý khác?')) {
    resetChat()
    selectedServiceId.value = null
    activeTab.value = 'messages'
  }
}
</script>

<style scoped>
.chat-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.12), transparent 28%);
}

.chat-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.72) transparent;
}

.chat-scroll::-webkit-scrollbar {
  width: 6px;
}

.chat-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.chat-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.72);
}
</style>
