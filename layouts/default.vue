<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Import Navbar từ components hiện tại
import Navbar from '../src/views/navbar.vue'
</script>