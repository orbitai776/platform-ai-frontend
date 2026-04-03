<template>
  <div class="min-h-screen bg-gray-50">
    <navbar />
      <slot />
  </div>
</template>

<script setup>
import navbar from '~/src/views/admin/navbar.vue';
</script>