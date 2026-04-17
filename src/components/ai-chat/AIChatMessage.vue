<template>
  <div class="flex gap-3" :class="isUser ? 'justify-end' : 'justify-start'">
    <div
      v-if="!isUser"
      class="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white shadow-sm sm:flex"
    >
      AI
    </div>

    <div class="max-w-[88%] min-w-0">
      <div class="mb-2 flex items-center gap-2" :class="isUser ? 'justify-end' : 'justify-start'">
        <span
          class="text-[11px] font-semibold uppercase tracking-[0.22em]"
          :class="isUser ? 'text-slate-400' : 'text-sky-600'"
        >
          {{ isUser ? 'Bạn' : 'Trợ lý AI' }}
        </span>

        <span
          v-if="!isUser && !isCompleted"
          class="inline-flex items-center rounded-full bg-sky-100 px-2 py-1 text-[10px] font-medium text-sky-700"
        >
          Đang phản hồi
        </span>
      </div>

      <div
        class="overflow-hidden rounded-[24px] border px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
        :class="bubbleClass"
      >
        <p class="whitespace-pre-wrap break-words text-sm leading-6">{{ content }}</p>
      </div>
    </div>

    <div
      v-if="isUser"
      class="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-[11px] font-semibold text-white shadow-sm sm:flex"
    >
      Bạn
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  role: String,
  content: {
    type: String,
    default: ''
  },
  products: {
    type: Array,
    default: () => []
  },
  isCompleted: {
    type: Boolean,
    default: true
  }
})

const isUser = computed(() => props.role === 'user')

const bubbleClass = computed(() => (
  isUser.value
    ? 'border-sky-500/15 bg-gradient-to-br from-sky-500 to-cyan-500 text-white rounded-br-md'
    : 'border-white/80 bg-white/90 text-slate-700 backdrop-blur rounded-bl-md'
))
</script>
