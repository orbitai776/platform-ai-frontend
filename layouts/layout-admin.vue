<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#09090B] relative transition-colors duration-500">
    <!-- Hiệu ứng tuyết rơi nền -->
    <AtmosphericSnow />
    
    <div class="relative z-10">
      <navbar />
      <slot />
    </div>
  </div>
</template>


<script setup>
import navbar from '~/src/views/admin/navbar.vue';

</script>