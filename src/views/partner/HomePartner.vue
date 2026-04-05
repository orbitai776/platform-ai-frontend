<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10">
    <div class="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex flex-wrap items-center gap-5">
        <img
          v-if="profile.photoURL"
          :src="profile.photoURL"
          alt="Partner avatar"
          class="h-20 w-20 rounded-full border border-slate-200 object-cover"
        />
        <div
          v-else
          class="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white"
        >
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
        <button
          type="button"
          class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { auth, signOut } from '~/src/auth/firebase.js'

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
  if (!process.client) {
    return
  }

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
  }
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

