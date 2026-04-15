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
          <h1 class="text-2xl font-bold text-slate-900">Partner Dashboard</h1>
          <p class="mt-1 text-sm text-slate-600">
            Welcome, {{ profile.displayName || 'Partner User' }}
          </p>
          <p class="mt-1 text-xs uppercase tracking-wide text-slate-400">
            Vai trò: Đối tác phân phối
          </p>
        </div>
      </div>

      <div class="mt-8 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Email</p>
          <p class="mt-1 font-medium text-slate-900">{{ profile.email || 'N/A' }}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Mã Đối Tác (UID)</p>
          <p class="mt-1 font-medium text-slate-900 text-xs break-all">{{ profile.uid || 'N/A' }}</p>
        </div>
      </div>

      <div class="mt-8">
        <button
          type="button"
          class="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          @click="handleLogout"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { auth, signOut } from '~/src/auth/firebase.js'
const isPartner = ref(true);

const profile = ref({
  uid: '',
  email: '',
  displayName: '',
  photoURL: ''
})

const initials = computed(() => {
  const name = profile.value.displayName || profile.value.email || 'P'
  return name.trim().charAt(0).toUpperCase()
})

onMounted(async () => {
  if (!process.client) return;

  try {
    console.log("Calling API with $fetch");

    const userRoles = await $fetch('/api/auth/user-roles', {
      method: "GET",
    });

    if (Array.isArray(userRoles) && userRoles.includes('partner')) {
      isPartner.value = true;
    } else {
      isPartner.value = false;
    }

    if (!isPartner.value) {
      console.log('Không có quyền partner, chuyển hướng về login');
      return navigateTo('/login');
    }
    
    // Dùng $fetch thay vì useFetch
    const userProfileData = await $fetch('/api/auth/user-profile', {
      method: "GET",
    });
    
    profile.value = userProfileData;
    
  } catch (error) {
    console.error("Lỗi xác thực Token:", error);
    return navigateTo('/login');
  }
})

const handleLogout = async () => {
  try {
    await signOut(auth);
    await $fetch('/api/auth/logout', {
      method: "GET",
    });
  } catch (error) {
    console.error("Lỗi khi đăng xuất Firebase", error);
  } finally {
    await navigateTo('/login');
  }
}
</script>