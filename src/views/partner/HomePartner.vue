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
import { jwtDecode } from "jwt-decode"
import { auth, signOut } from '~/src/auth/firebase.js'

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

  const token = localStorage.getItem('accessToken');

  // 1. Nếu không có token -> đá về trang Login chung
  if (!token) {
    return navigateTo('/login');
  }

  try {
    // 2. Giải mã token để lấy thông tin user
    const decoded = jwtDecode(token);
    
    // 3. Kiểm tra xem có đúng là role partner không? (Bảo mật 2 lớp)
    if (!decoded.roles || !decoded.roles.includes('partner')) {
      alert("Bạn không có quyền truy cập trang Đối tác!");
      return navigateTo('/'); // Đá về trang chủ thường
    }

    // 4. Cập nhật thông tin profile từ cục token
    profile.value = {
      uid: decoded.uid || '',
      email: decoded.email || '',
      displayName: decoded.name || decoded.full_name || '',
      // Tạm thời nếu token không chứa ảnh, dùng ảnh mặc định. Bạn có thể lấy từ db sau.
      photoURL: decoded.picture || '' 
    }

  } catch (error) {
    console.error("Lỗi xác thực Token:", error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRoles');
    return navigateTo('/login');
  }
})

const handleLogout = async () => {
  try {
    // Xóa session Firebase
    await signOut(auth);
  } catch (error) {
    console.error("Lỗi khi đăng xuất Firebase", error);
  } finally {
    // Luôn luôn dọn sạch LocalStorage khi đăng xuất
    if (process.client) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRoles');
      // Nếu code cũ của bạn có lưu các biến này thì xoá luôn cho sạch
      localStorage.removeItem('partnerAuthUser'); 
    }
    
    // Đá về trang Đăng nhập chung
    await navigateTo('/login');
  }
}
</script>