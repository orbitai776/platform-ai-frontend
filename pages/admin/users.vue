<template>
  <div>
    <UserManagement />
  </div>
</template>

<script setup>
import UserManagement from '~/src/views/admin/users.vue'

definePageMeta({
  
  layout: 'layout-admin' 
})
</script>