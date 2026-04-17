<template>
  <div class="border-b border-slate-200/70 bg-white/75 px-4 py-3 backdrop-blur-xl">
    <div class="grid grid-cols-2 gap-2 rounded-[18px] bg-slate-100/90 p-1">
      <button
        class="rounded-2xl px-3 py-2.5 text-sm font-medium transition"
        :class="modelValue === 'messages' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        @click="$emit('update:modelValue', 'messages')"
      >
        Tin nhắn
      </button>

      <button
        class="relative rounded-2xl px-3 py-2.5 text-sm font-medium transition"
        :class="modelValue === 'news' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        @click="$emit('update:modelValue', 'news')"
      >
        <span>Tin tức</span>
        <span class="absolute right-3 top-2.5 h-2 w-2 rounded-full bg-rose-400"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
