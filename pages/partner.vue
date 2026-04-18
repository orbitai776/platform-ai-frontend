<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
      <p class="text-gray-400 font-['Sora']">Đang kiểm tra quyền truy cập...</p>
    </div>

    <div v-else-if="!isPartner && !isAdmin" class="max-w-md mx-auto mt-20 text-center p-10 bg-white rounded-3xl shadow-xl border border-red-100">
      <div class="text-5xl mb-4">🚫</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2 font-['Sora']">Truy cập hạn chế</h2>
      <p class="text-gray-500 mb-6">Bạn chưa đăng ký dịch vụ Partner. Vui lòng liên hệ Admin để được kích hoạt tài khoản.</p>
      <NuxtLink to="/" class="bg-[#e8604c] text-white px-8 py-3 rounded-full font-bold shadow-lg no-underline inline-block transition-transform hover:scale-105">
        Quay lại Trang chủ
      </NuxtLink>
    </div>

    <div v-else class="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
      
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 font-['Sora']">
            {{ isAdmin ? 'Hệ thống Quản lý AI Services' : 'Dịch vụ AI của bạn' }}
          </h2>
          <p class="text-gray-500 text-sm">Cấu hình và theo dõi lưu lượng dịch vụ AI</p>
        </div>
        
        <button 
          v-if="isAdmin"
          @click="isCreating = !isCreating" 
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-md font-semibold"
        >
          <span>{{ isCreating ? '✕ Đóng' : '+ Thiết lập Service mới' }}</span>
        </button>
      </div>

      <div v-if="isCreating && isAdmin" class="mb-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 transition-all">
        <h3 class="font-bold text-indigo-900 mb-4 font-['Sora']">Chọn loại AI muốn kích hoạt:</h3>
        <div v-if="catalog.length === 0" class="text-indigo-400 text-sm italic">
          Đang tải danh mục AI từ hệ thống...
        </div>
        <div v-else class="grid gap-4 md:grid-cols-3">
          <div 
            v-for="cat in catalog" 
            :key="cat.id"
            @click="handleCreate(cat)"
            class="p-4 bg-white border border-indigo-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
          >
            <div class="text-2xl mb-2">{{ cat.type === 'tour' ? '✈️' : (cat.type === 'villa' ? '🏨' : '🛍️') }}</div>
            <h4 class="font-bold text-gray-800 group-hover:text-indigo-600">{{ cat.name }}</h4>
            <p class="text-[10px] text-gray-500 mt-1 line-clamp-2">{{ cat.description }}</p>
            <div class="mt-3 text-[10px] font-bold text-indigo-500 uppercase">Kích hoạt ngay →</div>
          </div>
        </div>
      </div>

      <div v-if="activeServices.length === 0" class="text-center py-20 border-2 border-dashed rounded-3xl">
        <p class="text-gray-400 text-lg">Bạn chưa có dịch vụ nào được thiết lập.</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div 
          v-for="item in activeServices" 
          :key="item.id" 
          class="p-6 border rounded-2xl bg-white hover:shadow-lg transition-all border-gray-100 group relative"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <span 
                :class="item.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'"
                class="px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider"
              >
                {{ item.status }}
              </span>
              <h3 class="font-bold text-gray-800 text-xl mt-2 group-hover:text-indigo-600 transition-colors font-['Sora']">
                {{ item.name }}
              </h3>
            </div>
            
            <button 
              v-if="isAdmin"
              @click="deleteService(item.id)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Xóa mềm (Ẩn dịch vụ)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 font-mono text-[10px]">ID: {{ item.id }}</span>
            </div>
            
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 font-semibold">Lưu lượng Token đã dùng</span>
                <span class="font-bold text-indigo-600">{{ item.token_limit ? Math.round((item.token_used / item.token_limit) * 100) : 0 }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  class="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" 
                  :style="{ width: (item.token_limit ? (item.token_used / item.token_limit * 100) : 0) + '%' }"
                ></div>
              </div>
              <p class="text-[10px] text-gray-400 text-right mt-1">
                {{ item.token_used?.toLocaleString() }} / {{ item.token_limit?.toLocaleString() }} tokens
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useServices from '~/src/composables/useServices' 
import { auth } from '~/src/auth/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// State & Config
const { services: catalog, fetchServices: fetchCatalog } = useServices()
const services = ref([])
const loading = ref(true)
const isCreating = ref(false)
const isAdmin = ref(false)
const isPartner = ref(false)
const API_PATH = '/api/partner/list-services'

// LOGIC SOFT DELETE: Chỉ hiển thị những thằng có active !== false
const activeServices = computed(() => {
  return services.value.filter(s => s.active !== false)
})

// Lấy danh sách dịch vụ từ Backend
const fetchServices = async () => {
  try {
    const res = await $fetch(API_PATH)
    services.value = res.data || [] 
  } catch (err) {
    console.error("Lỗi fetchServices:", err)
  }
}

// Khởi tạo dữ liệu và Check quyền (Admin/Partner)
const initData = async () => {
  onAuthStateChanged(auth, async (user) => {
    loading.value = true
    try {
      // Gọi API lấy Role của user hiện tại
      const userRoles = await $fetch('/api/auth/user-roles', { method: "GET" });
      
      // Gán Role để xử lý giao diện
      isPartner.value = Array.isArray(userRoles) && userRoles.includes('partner');
      isAdmin.value = Array.isArray(userRoles) && userRoles.includes('admin');

      if (user && (isPartner.value || isAdmin.value)) {
        await fetchCatalog()  // Lấy danh mục AI từ đồng đội
        await fetchServices() // Lấy danh sách AI đã kích hoạt
      } else if (!user) {
        console.warn("User chưa đăng nhập Firebase");
        return navigateTo('/login');
      }
    } catch (err) {
      console.error("Lỗi khởi tạo Auth/Roles:", err);
    } finally {
      loading.value = false
    }
  })
}

// Xử lý tạo dịch vụ mới (Chỉ dành cho Admin)
const handleCreate = async (selected) => {
  try {
    const res = await $fetch(API_PATH, {
      method: 'POST',
      body: {
        service_id: selected.id,
        name: selected.name + ' - ' + new Date().toLocaleDateString(),
        token_limit: 10000
      }
    })
    
    if (res.status === 'success' || res.data) {
      alert('Kích hoạt dịch vụ thành công!')
      isCreating.value = false 
      await fetchServices()
    }
  } catch (err) {
    alert('Lỗi khi tạo: ' + (err.data?.message || 'Server error'))
  }
}
const deleteService = async (id) => {
  if (!confirm('Hủy/Ẩn dịch vụ này? (Dữ liệu vẫn được lưu trữ tại hệ thống)')) return
  try {
    // API backend của fen phải xử lý DELETE = UPDATE active = 0
    await $fetch(`${API_PATH}/${id}`, { method: 'DELETE' })
    
    // Cập nhật mảng cục bộ: đánh dấu active = false để Computed tự lọc mất khỏi UI
    services.value = services.value.map(s => 
      s.id === id ? { ...s, active: false } : s
    )
  } catch (err) {
    alert('Không thể xóa/ẩn dịch vụ này.')
  }
}

onMounted(() => {
  initData()
})
</script>