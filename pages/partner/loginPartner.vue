<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
    <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 class="text-center text-2xl font-bold text-slate-900">Partner Login</h1>
      <p class="mt-2 text-center text-sm text-slate-500">Access your partner workspace</p>

      <form class="mt-8 space-y-5" @submit.prevent="handleEmailPasswordLogin">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700">Email</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            autocomplete="email"
            placeholder="you@company.com"
            class="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter your password"
            class="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            required
          />
          <div class="mt-2 flex justify-end">
            <button
              type="button"
              class="text-sm font-semibold text-blue-600 hover:text-blue-700"
              :disabled="isForgotLoading"
              @click="handleForgotPassword"
            >
              {{ isForgotLoading ? 'Sending...' : 'Forgot password ?' }}
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {{ successMessage }}
        </p>

        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isLoginLoading || isGoogleLoading"
        >
          {{ isLoginLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="my-6 flex items-center gap-3">
        <div class="h-px flex-1 bg-slate-200" />
        <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">or</span>
        <div class="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        class="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isGoogleLoading || isLoginLoading"
        @click="handleGoogleLogin"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M12.24 10.285V14.4h5.806c-.24 1.368-1.617 4.013-5.806 4.013-3.492 0-6.336-2.893-6.336-6.413s2.844-6.413 6.336-6.413c1.989 0 3.32.848 4.083 1.579l2.785-2.688C17.285 2.773 14.99 1.8 12.24 1.8 6.981 1.8 2.72 6.061 2.72 11.32s4.261 9.52 9.52 9.52c5.493 0 9.136-3.861 9.136-9.296 0-.624-.067-1.1-.153-1.559H12.24z"
          />
          <path
            fill="#34A853"
            d="M3.96 7.63l3.383 2.48c.916-2.722 3.497-4.523 6.897-4.523 1.989 0 3.32.848 4.083 1.579l2.785-2.688C19.82 2.773 17.525 1.8 14.775 1.8 10.138 1.8 6.14 4.457 3.96 7.63z"
          />
          <path
            fill="#FBBC05"
            d="M3.96 16.37c2.18 3.173 6.178 5.83 10.815 5.83 2.639 0 4.858-.873 6.46-2.365l-3.12-2.55c-.885.617-2.013.988-3.34.988-3.38 0-6.24-2.278-7.267-5.348L3.96 16.37z"
          />
          <path
            fill="#4285F4"
            d="M22.84 11.544c0-.624-.067-1.1-.153-1.559H14.775V14.1h4.54c-.194 1.046-.795 2.63-2.12 3.57l3.12 2.55c1.867-1.723 2.946-4.258 2.946-8.676z"
          />
        </svg>
        <span>{{ isGoogleLoading ? 'Logging in...' : 'Login with google accout' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, provider } from '~/src/auth/firebase.js'

definePageMeta({
  layout: 'auth-admin'
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoginLoading = ref(false)
const isGoogleLoading = ref(false)
const isForgotLoading = ref(false)

const mapFirebaseError = (error) => {
  const errorMap = {
    'auth/invalid-email': 'Invalid email format.',
    'auth/user-not-found': 'No account was found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Google login popup was closed before finishing.',
    'auth/network-request-failed': 'Network error. Please check your connection.'
  }

  return errorMap[error?.code] || 'Login failed. Please try again.'
}

const savePartnerSession = (user, loginProvider) => {
  if (!process.client) {
    return
  }

  const profile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email || 'Partner User',
    photoURL: user.photoURL || '',
    provider: loginProvider,
    lastLoginAt: new Date().toISOString()
  }

  localStorage.setItem('partnerAuthUser', JSON.stringify(profile))
  
  // Set real token/cookie for authentication
  const token = useCookie('token')
  token.value = user.accessToken || "mock_token_if_access_token_missing"
}

const goToHomePartner = async () => {
  await navigateTo('/partner/home')
}

const handleEmailPasswordLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoginLoading.value = true

  try {
    const result = await signInWithEmailAndPassword(auth, email.value, password.value)
    savePartnerSession(result.user, 'password')
    await goToHomePartner()
  } catch (error) {
    errorMessage.value = mapFirebaseError(error)
  } finally {
    isLoginLoading.value = false
  }
}

const handleForgotPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!email.value) {
    errorMessage.value = 'Please enter your email first, then click forgot password.'
    return
  }

  isForgotLoading.value = true
  try {
    await sendPasswordResetEmail(auth, email.value)
    successMessage.value = 'Password reset email sent. Please check your inbox.'
  } catch (error) {
    errorMessage.value = mapFirebaseError(error)
  } finally {
    isForgotLoading.value = false
  }
}

const handleGoogleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isGoogleLoading.value = true

  try {
    const result = await signInWithPopup(auth, provider)
    savePartnerSession(result.user, 'google')
    await goToHomePartner()
  } catch (error) {
    errorMessage.value = mapFirebaseError(error)
  } finally {
    isGoogleLoading.value = false
  }
}
</script>
