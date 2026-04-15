<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
      
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Quản lý AI Services</h2>
          <p class="text-gray-500 text-sm">Cấu hình và theo dõi dịch vụ AI dành cho đối tác</p>
        </div>
        <button 
          @click="createService" 
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-md"
        >
          <span>+ Thiết lập Service mới</span>
        </button>
      </div>

      <div v-if="loading" class="text-center py-20">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
        <p class="text-gray-400">Đang tải danh sách dịch vụ...</p>
      </div>

      <div v-else-if="services.length === 0" class="text-center py-20 border-2 border-dashed rounded-3xl">
        <p class="text-gray-400 text-lg">Bạn chưa có dịch vụ nào được thiết lập.</p>
      </div>

      <div v-else class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <div 
          v-for="item in services" 
          :key="item.id" 
          class="p-6 border rounded-2xl bg-white hover:shadow-lg transition-all border-gray-100 group"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <span 
                :class="item.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'"
                class="px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider"
              >
                {{ item.status }}
              </span>
              <h3 class="font-bold text-gray-800 text-xl mt-2 group-hover:text-indigo-600 transition-colors">
                {{ item.name }}
              </h3>
            </div>
            <button 
              @click="deleteService(item.id)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 font-mono text-xs">ID: {{ item.id }}</span>
            </div>
            
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Lưu lượng Token</span>
                <span class="font-bold">{{ Math.round((item.token_used / item.token_limit) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div 
                  class="bg-indigo-500 h-2 rounded-full transition-all" 
                  :style="{ width: (item.token_used / item.token_limit * 100) + '%' }"
                ></div>
              </div>
              <p class="text-[10px] text-gray-400 text-right">
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
import { ref, onMounted } from 'vue'

const services = ref([])
const loading = ref(false)
const API_PATH = '/api/partner/list-services'

// GET: Lấy danh sách
const fetchServices = async () => {
  loading.value = true
  try {
    const res = await $fetch(API_PATH)
    // Theo JSON bạn gửi: { status: "success", data: [...] }
    services.value = res.data || []
  } catch (err) {
    console.error('Lỗi khi fetch dữ liệu:', err)
  } finally {
    loading.value = false
  }
}

// POST: Tạo mới
const createService = async () => {
  try {
    const res = await $fetch(API_PATH, {
      method: 'POST',
      body: {
        service_id: "072ce17e-dc45-4dd3-aea4-32e67f23db22",
        name: 'Chatbot AI ' + new Date().toLocaleDateString(),
        token_limit: 10000
      }
    })
    if (res.status === 'success') {
      alert('Thiết lập dịch vụ thành công!')
      await fetchServices()
    }
  } catch (err) {
    alert('Lỗi khi tạo: ' + (err.data?.message || 'Server error'))
  }
}

// DELETE: Xóa
const deleteService = async (id) => {
  if (!confirm('Hủy dịch vụ này sẽ không thể hoàn tác. Bạn chắc chắn chứ?')) return
  try {
    await $fetch(`${API_PATH}/${id}`, { method: 'DELETE' })
    services.value = services.value.filter(s => s.id !== id)
  } catch (err) {
    alert('Không thể xóa dịch vụ này.')
  }
}

onMounted(fetchServices)
</script>