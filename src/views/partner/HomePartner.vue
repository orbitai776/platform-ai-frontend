<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10">
    <div class="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex flex-wrap items-center gap-5">
        <img v-if="profile.photoURL" :src="profile.photoURL" alt="Partner avatar"
          class="h-20 w-20 rounded-full border border-slate-200 object-cover" />
        <div v-else
          class="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
          {{ initials }}
        </div>

        <div>
          <h1 class="text-2xl font-bold text-slate-900">HomePartner</h1>
          <p class="mt-1 text-sm text-slate-600">
            Welcome, {{ profile.displayName || 'Partner User' }}
          </p>
          <p class="mt-1 text-xs uppercase tracking-wide text-slate-400">
            Login provider: {{ profile.provider || 'unknown' }}
          </p>
        </div>
      </div>

      <div class="mt-8 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Email</p>
          <p class="mt-1 font-medium text-slate-900">{{ profile.email || 'N/A' }}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Last Login</p>
          <p class="mt-1 font-medium text-slate-900">{{ formattedLastLogin }}</p>
        </div>
      </div>

      <div class="mt-8">
        <button type="button"
          class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          @click="handleLogout">
          Logout
        </button>
      </div>
      <div class="mt-10">
        <h2 class="text-xl font-bold text-slate-900 mb-4">
          My Services
        </h2>

        <!-- loading -->
        <div v-if="loading" class="text-sm text-slate-500">
          Loading services...
        </div>

        <!-- empty -->
        <div v-else-if="services.length === 0" class="text-sm text-slate-500">
          No services available
        </div>

        <!-- list -->
        <div v-else class="grid gap-4 sm:grid-cols-2">
          <div v-for="service in services" :key="service.id" class="p-4 border rounded-xl shadow-sm bg-white">
            <h3 class="font-semibold text-lg text-slate-900">
              {{ service.name }}
            </h3>

            <p class="text-sm text-blue-500">
              Type: {{ service.type }}
            </p>

            <p class="text-sm text-slate-600 mt-2">
              {{ service.description }}
            </p>

            <span class="inline-block mt-3 px-2 py-1 text-xs rounded" :class="service.status === 'active'
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-500'">
              {{ service.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { auth, signOut } from '~/src/auth/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import usePartnerServices from '../../composables/usePartnerServices'

const { services, loading, fetchServices } = usePartnerServices();

const profile = ref({
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  provider: '',
  lastLoginAt: ''
})

const initials = computed(() => {
  const name = profile.value.displayName || profile.value.email || 'P'
  return name.trim().charAt(0).toUpperCase()
})

const formattedLastLogin = computed(() => {
  if (!profile.value.lastLoginAt) {
    return 'Unknown'
  }

  return new Date(profile.value.lastLoginAt).toLocaleString()
})

onMounted(async () => {
  if (!process.client) return

  const raw = localStorage.getItem('partnerAuthUser')

  if (!raw) {
    await navigateTo('/partner/loginPartner')
    return
  }

  try {
    profile.value = JSON.parse(raw)
  } catch (error) {
    localStorage.removeItem('partnerAuthUser')
    await navigateTo('/partner/loginPartner')
    return
  }

  // chờ cho Firebase ready -> để có thể lấy thông tin xác thực
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("NO USER FROM FIREBASE")
      await navigateTo('/partner/loginPartner')
      return
    }

    await fetchServices()
  })
})

const handleLogout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    // Ignore logout errors and still clear local session.
  } finally {
    if (process.client) {
      localStorage.removeItem('partnerAuthUser')
    }
    await navigateTo('/partner/loginPartner')
  }
}
</script>
