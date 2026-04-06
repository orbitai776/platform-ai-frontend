<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold mb-4 text-center">AI Travel Assistant</h1>
      <p class="text-center text-gray-600 mb-8">Hỏi tôi bất cứ điều gì về du lịch</p>
      
      <ClientOnly>
        <div class="max-w-2xl mx-auto">
          <AIChatContainer />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import AIChatContainer from '../src/components/ai-chat/AIChatContainer.vue'
</script>