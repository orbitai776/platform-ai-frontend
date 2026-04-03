<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Welcome to Orbit AI</h1>
    <p class="text-gray-600">This page is client-side rendered</p>
    
    <ClientOnly>
      <div class="mt-4 p-4 bg-blue-100 rounded">
        <p>This section only renders on client</p>
      </div>
      
      <!-- AI Chat Component -->
      <AIChatContainer />
    </ClientOnly>
  </div>
</template>

<script setup>
import AIChatContainer from '../src/components/ai-chat/AIChatContainer.vue'
</script>