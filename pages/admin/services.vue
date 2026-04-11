<template>
  <div class="min-h-screen bg-slate-50 p-6 font-sans">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Services</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-sm text-slate-500">Loading services...</div>

    <!-- Empty -->
    <div v-else-if="services.length === 0" class="text-sm text-slate-500">No services available</div>

    <!-- List -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
      >
        <div class="flex items-start justify-between">
          <h3 class="font-semibold text-slate-800">{{ service.name }}</h3>
          <span
            class="text-xs px-2 py-1 rounded-full"
            :class="service.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'"
          >
            {{ service.status }}
          </span>
        </div>
        <p class="text-xs text-blue-500 mt-1">{{ service.type }}</p>
        <p class="text-sm text-slate-500 mt-2">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/src/auth/firebase.js'
import usePartnerServices from '~/src/composables/useServices'

const { services, loading, fetchServices } = usePartnerServices()

onMounted(() => {
  if (!process.client) return

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await navigateTo('/loginAdmin')
      return
    }
    await fetchServices()
  })
})
</script>