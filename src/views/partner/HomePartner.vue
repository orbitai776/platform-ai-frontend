<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10">
    <div class="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <!-- HEADER -->
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-5">
          <img v-if="profile.photoURL" :src="profile.photoURL" alt="Partner avatar"
            class="h-20 w-20 rounded-full border border-slate-200 object-cover" />
          <div v-else
            class="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
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

        <!-- LOGOUT -->
        <button type="button"
          class="h-fit rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          @click="handleLogout">
          Đăng xuất
        </button>
      </div>

      <!-- INFO -->
      <div class="mt-8 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Email</p>
          <p class="mt-1 font-medium text-slate-900">{{ profile.email || 'N/A' }}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">Mã Đối Tác (UID)</p>
          <p class="mt-1 font-medium text-slate-900 text-xs break-all">
            {{ profile.uid || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- SERVICES -->
      <div class="mt-10">
        <h2 class="text-xl font-semibold text-slate-800 mb-4">Services</h2>

        <!-- Loading -->
        <div v-if="loading" class="text-sm text-slate-500">
          Loading services...
        </div>

        <!-- Empty -->
        <div v-else-if="services.length === 0" class="text-sm text-slate-500">
          No services available
        </div>

        <!-- LIST -->
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="service in services" :key="service.id"
            class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">

            <div class="flex items-start justify-between">
              <h3 class="font-semibold text-slate-800">
                {{ service.name }}
              </h3>

              <span class="text-xs px-2 py-1 rounded-full"
                :class="service.status === 'active'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'">
                {{ service.status }}
              </span>
            </div>

            <p class="text-xs text-blue-500 mt-1">
              {{ service.type }}
            </p>

            <p class="text-sm text-slate-500 mt-2">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, signOut } from '~/src/auth/firebase.js'
import usePartnerServices from '~/src/composables/useServices'
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


const { services, loading, fetchServices } = usePartnerServices()

onMounted(() => {
  if (!process.client) return

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await navigateTo('/login')
      return
    }
    await fetchServices()
  })
})

</script>