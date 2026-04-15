<template>
  <div class="flex" :class="isUser ? 'justify-end' : 'justify-start'">
    <div 
      class="max-w-[80%] rounded-2xl px-4 py-2"
      :class="isUser ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'"
    >
      <p class="text-sm whitespace-pre-wrap">{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  role: String,
  content: String
})

const isUser = computed(() => props.role === 'user')
</script>