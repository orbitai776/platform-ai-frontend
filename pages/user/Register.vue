<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-6 py-12">
    <div class="w-full max-w-sm relative">
      <NuxtLink to="/login" class="absolute -top-12 left-0 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition">
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to sign in
      </NuxtLink>

      <h2 class="mb-2 text-center text-2xl/9 font-bold tracking-tight text-black">
        Create your account
      </h2>

      <form class="space-y-5" @submit.prevent="handleRegister">
        <div>
          <label for="full-name" class="block text-sm/6 font-medium text-black">Full name</label>
          <div class="mt-2">
            <input
              id="full-name"
              v-model="fullName"
              type="text"
              placeholder="Your full name"
              required
              :disabled="isLoading"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-black">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
              required
              :disabled="isLoading"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-black">Password</label>
          <div class="mt-2">
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="At least 8 characters"
              required
              :disabled="isLoading"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label for="confirm-password" class="block text-sm/6 font-medium text-black">Confirm password</label>
          <div class="mt-2">
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              required
              :disabled="isLoading"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black border border-black/30 placeholder:text-black/40 focus:outline-none focus:border-black sm:text-sm/6 disabled:opacity-50"
            />
          </div>
        </div>

        <label class="flex items-start gap-3 text-sm text-gray-600">
          <input
            v-model="acceptTerms"
            type="checkbox"
            :disabled="isLoading"
            class="mt-1 h-4 w-4 rounded border border-black/30 text-black focus:ring-black"
          />
          <span>I confirm the information is correct and agree to create an account.</span>
        </label>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-800 disabled:opacity-70"
          >
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>

      <div class="mt-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-3 text-xs text-gray-500 tracking-wide">Another</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <div class="mt-4">
        <button
          type="button"
          @click="handleGoogleRegister"
          :disabled="isLoading"
          class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100 disabled:opacity-50"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-5 w-5" />
          Sign up with Google
        </button>
      </div>

      <p class="mt-6 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink to="/login" class="font-semibold text-black hover:text-gray-700">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'authAdmin'
});

const toast = useToast();
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const isLoading = ref(false);

const handleBackendAuth = async (firebaseIdToken) => {
  try {
    await useFetch('/api/auth/login', {
      method: 'POST',
      body: { idToken: firebaseIdToken },
    });

    const { data: userRolesData } = await useFetch('/api/auth/user-roles', {
      method: 'GET',
    });

    const userRoles = userRolesData.value || [];

    if (userRoles.includes('admin')) {
      window.location.href = '/admin';
    } else if (userRoles.includes('partner')) {
      window.location.href = '/partner';
    } else {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Backend auth failed:', error);
    toast.error('Tạo tài khoản xong nhưng đăng nhập vào hệ thống thất bại.');
  }
};

const validateForm = () => {
  if (!fullName.value.trim() || !email.value.trim() || !password.value || !confirmPassword.value) {
    toast.warning('Vui lòng nhập đầy đủ thông tin.');
    return false;
  }

  if (fullName.value.trim().length < 2) {
    toast.warning('Họ tên phải có ít nhất 2 ký tự.');
    return false;
  }

  if (password.value.length < 8) {
    toast.warning('Mật khẩu phải có ít nhất 8 ký tự.');
    return false;
  }

  if (password.value !== confirmPassword.value) {
    toast.error('Mật khẩu xác nhận không khớp.');
    return false;
  }

  if (!acceptTerms.value) {
    toast.warning('Bạn cần xác nhận thông tin trước khi đăng ký.');
    return false;
  }

  return true;
};

const getRegisterErrorMessage = (error) => {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Email này đã được sử dụng.';
    case 'auth/invalid-email':
      return 'Email không hợp lệ.';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu.';
    case 'auth/popup-closed-by-user':
      return 'Bạn đã đóng cửa sổ đăng nhập Google.';
    default:
      return 'Đăng ký thất bại. Vui lòng thử lại.';
  }
};

const handleRegister = async () => {
  if (!process.client || !validateForm()) return;
  isLoading.value = true;

  try {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const { auth } = await import('~/src/auth/firebase.js');

    const credential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value
    );

    await updateProfile(credential.user, {
      displayName: fullName.value.trim(),
    });

    const idToken = await credential.user.getIdToken(true);
    await handleBackendAuth(idToken);
  } catch (error) {
    console.error('Register failed:', error);
    toast.error(getRegisterErrorMessage(error));
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleRegister = async () => {
  if (!process.client) return;
  isLoading.value = true;

  try {
    const { signInWithPopup } = await import('firebase/auth');
    const { auth, provider } = await import('~/src/auth/firebase.js');

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await handleBackendAuth(idToken);
  } catch (error) {
    console.error('Google register failed:', error);
    toast.error(getRegisterErrorMessage(error));
  } finally {
    isLoading.value = false;
  }
};
</script>
