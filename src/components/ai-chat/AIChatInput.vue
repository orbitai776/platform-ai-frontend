<template>
  <div class="border-t border-slate-200/70 bg-white/80 px-4 pb-4 pt-3 backdrop-blur-xl">
    <div class="rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div class="flex items-end gap-3">
        <button
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white"
          title="Nhập giọng nói"
          @click="startVoiceInput"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>

        <div class="min-w-0 flex-1">
          <textarea
            ref="textareaRef"
            v-model="inputText"
            :disabled="loading"
            rows="1"
            class="composer-textarea min-h-[48px] w-full resize-none bg-transparent px-1 py-2 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Nhập câu hỏi của bạn..."
            @input="resizeTextarea"
            @keydown.enter.prevent="handleSend"
          ></textarea>

          <div class="mt-2 flex items-center justify-between gap-3 text-[11px]">
            <span class="text-slate-400">
              {{ loading ? 'Trợ lý đang phản hồi...' : 'Nhấn Enter để gửi nhanh' }}
            </span>
            <span class="font-medium text-slate-300">{{ inputText.trim().length }}/1000</span>
          </div>
        </div>

        <button
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition"
          :class="inputText.trim() && !loading ? 'bg-slate-900 hover:-translate-y-0.5 hover:bg-slate-950' : 'bg-slate-300'"
          :disabled="!inputText.trim() || loading"
          title="Gửi tin nhắn"
          @click="handleSend"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

const inputText = ref('')
const textareaRef = ref(null)

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send'])

const resizeTextarea = async () => {
  await nextTick()

  if (!textareaRef.value) return

  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = `${Math.min(textareaRef.value.scrollHeight, 160)}px`
}

const handleSend = () => {
  if (!inputText.value.trim() || props.loading) return

  emit('send', inputText.value)
  inputText.value = ''
  resizeTextarea()
}

const startVoiceInput = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'vi-VN'
    recognition.continuous = false

    recognition.onresult = (event) => {
      inputText.value = event.results[0][0].transcript
      resizeTextarea()
    }

    recognition.start()
  } else {
    alert('Trình duyệt của bạn không hỗ trợ nhập giọng nói')
  }
}

onMounted(() => {
  resizeTextarea()
})
</script>

<style scoped>
.composer-textarea {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.6) transparent;
}

.composer-textarea::-webkit-scrollbar {
  width: 5px;
}

.composer-textarea::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.6);
}
</style>
