<template>
  <div class="border-b px-4 py-2 flex gap-6 bg-white">
    <button 
      @click="$emit('update:modelValue', 'messages')" 
      class="pb-2 text-sm font-medium transition-colors"
      :class="modelValue === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
    >
      Tin nhắn
    </button>
    <button 
      @click="$emit('update:modelValue', 'news')" 
      class="pb-2 text-sm font-medium transition-colors relative"
      :class="modelValue === 'news' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
    >
      Tin tức
      <span class="absolute -top-1 -right-3 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>