<template>
  <div class="min-h-screen bg-gray-50">
    <navbar />
      <slot />
  </div>
</template>

<script setup>
import navbar from '~/src/views/admin/navbar.vue';
import users from '~/src/views/admin/users.vue';
</script>