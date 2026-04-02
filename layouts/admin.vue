<template>
  <div class=" flex flex-col min-h-screen"> 
    <Navbar />
    <div class="flex flex-1 ">
      <main class="flex-1 p-4">
        <slot />
      </main>
   </div>
  </div>
</template>

<script setup>
import Navbar from '~/src/layout/admin/Navbar.vue';
</script>