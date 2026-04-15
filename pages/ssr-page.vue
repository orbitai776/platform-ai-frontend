<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">SSR Page</h1>
    <p class="text-gray-600">This page is server-side rendered</p>
    
    <div class="mt-4 p-4 bg-green-100 rounded">
      <p>Server time: {{ serverTime }}</p>
      <p>Rendered on: {{ isServer ? 'Server' : 'Client' }}</p>
    </div>
    
    <SSRComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isServer = process.server
const serverTime = ref('')

if (process.server) {
  serverTime.value = new Date().toISOString()
}

definePageMeta({
  ssr: true // Force SSR cho trang này
})
</script>