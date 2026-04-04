<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../src/views/navbar.vue'
import Footer from '../src/components/Footer.vue'
</script>