<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      
      <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 class="text-2xl font-black text-gray-800 font-['Sora'] uppercase tracking-tight">Quản trị AI Services</h1>
          <p class="text-gray-500 text-sm">Quản lý danh mục, cấu hình hạn mức và trạng thái dịch vụ toàn hệ thống</p>
        </div>
        <button 
          @click="openModal('create')"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 font-bold font-['Sora'] text-sm"
        >
          <span>+ Thiết lập Service mới</span>
        </button>
      </div>

      <div v-if="loading" class="py-20 text-center">
        <div class="animate-spin inline-block w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
        <p class="text-gray-400 font-['Sora']">Đang đồng bộ dữ liệu hệ thống...</p>
      </div>

      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="p-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Thông tin dịch vụ</th>
              <!-- <th class="p-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">ID Hệ thống</th> -->
              <th class="p-4 text-[11px] font-black text-gray-400 uppercase tracking-wider">Hạn mức Token</th>
              <th class="p-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center">Trạng thái</th>
              <th class="p-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr 
              v-for="item in services" 
              :key="item.id" 
              class="hover:bg-gray-50/50 transition-colors"
              :class="{'opacity-60 grayscale-[0.5] bg-gray-50/30': item.active === false || item.active === 0 || item.active === '0'}"
            >
              <td class="p-4">
                <div class="font-bold text-gray-800 font-['Sora'] text-sm">{{ item.name }}</div>
                <div class="text-[10px] text-gray-400 mt-0.5 uppercase font-medium tracking-tighter">
                  Loại: {{ catalog.find(c => c.id === item.service_id)?.name || item.service_id }}
                </div>
              </td>
              <!-- <td class="p-4">
                <span class="font-mono text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">#{{ item.id }}</span>
              </td> -->
              <td class="p-4">
                <div class="text-sm font-bold text-gray-700">{{ item.token_limit?.toLocaleString() }}</div>
                <div class="text-[10px] text-gray-400 italic">Đã dùng: {{ item.token_used?.toLocaleString() }}</div>
              </td>
              <td class="p-4 text-center">
                <span 
                  :class="(item.active === false || item.active === 0 || item.active === '0') ? 'bg-red-100 text-red-600 border-red-200' : 'bg-green-100 text-green-600 border-green-200'"
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase border"
                >
                  {{ (item.active === false || item.active === 0 || item.active === '0') ? 'Đã ẩn' : 'Đang chạy' }}
                </span>
              </td>
              <td class="p-4">
                <div class="flex justify-center gap-2">
                  <button 
                    @click="openModal('edit', item)" 
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Chỉnh sửa thông tin"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="handleSoftDelete(item)" 
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    :title="item.active !== false ? 'Ẩn dịch vụ' : 'Khôi phục dịch vụ'"
                  >
                    <svg v-if="item.active !== false" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.882 9.882L3.29 3.29m17.42 17.42L14.12 14.12M21 12c0 1.268-.235 2.483-.664 3.606m-1.543-1.543a9.954 9.954 0 00.207-2.063c0-4.478-2.943-8.268-7-9.543a9.97 9.97 0 00-3.029 1.563" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
        <div class="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl border border-gray-100">
          <h2 class="text-2xl font-black mb-6 font-['Sora'] text-gray-800">
            {{ modalType === 'create' ? 'Kích hoạt Dịch vụ AI' : 'Cập nhật Cấu hình' }}
          </h2>
          
          <div class="space-y-5">
            <div>
              <label class="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Tên hiển thị (Partner thấy)</label>
              <input v-model="form.name" type="text" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold" placeholder="VD: ChatGPT-4o Premium">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Hạn mức Token</label>
                <input v-model.number="form.token_limit" type="number" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold">
              </div>
              <div v-if="modalType === 'create'">
                <label class="block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest">Loại AI (Catalog)</label>
                <select v-model="form.service_id" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-bold">
                  <option v-for="cat in catalog" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div v-else class="flex flex-col justify-end pb-1">
                <div class="flex items-center gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  <input type="checkbox" v-model="form.active" id="active" class="w-4 h-4 accent-indigo-600">
                  <label for="active" class="font-bold text-xs text-indigo-700 select-none">Đang hoạt động</label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-10">
            <button @click="showModal = false" class="flex-1 py-4 font-bold text-gray-400 hover:bg-gray-50 rounded-2xl transition-all text-sm uppercase tracking-widest">Hủy bỏ</button>
            <button @click="submitForm" class="flex-1 py-4 font-black bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all text-sm uppercase tracking-widest">
              {{ modalType === 'create' ? 'Tạo ngay' : 'Lưu cập nhật' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useServices from '~/src/composables/useServices'

const toast = useToast()

// 1. STATE & CONFIG
const { services: catalog, fetchServices: fetchCatalog } = useServices()
const services = ref([])
const loading = ref(true)
const showModal = ref(false)
const modalType = ref('create') 
const API_PATH = '/api/partner/list-services'

const form = ref({
  id: null,
  name: '',
  token_limit: 10000,
  service_id: '',
  active: true
})

// 2. FETCH DATA (Lấy danh sách cho Admin)
const fetchData = async () => {
  loading.value = true
  try {
    const res = await $fetch(API_PATH)
    services.value = res.data || []
    await fetchCatalog() // Đồng bộ danh mục từ đồng đội
  } catch (err) {
    console.error("Lỗi tải dữ liệu Admin:", err)
  } finally {
    loading.value = false
  }
}

// 3. XỬ LÝ MODAL (Đóng/Mở)
const openModal = (type, item = null) => {
  modalType.value = type
  if (type === 'edit' && item) {
    // Clone dữ liệu để sửa
    form.value = { ...item, active: !(item.active === false || item.active === 0 || item.active === '0') }
  } else {
    // Reset form cho tạo mới
    form.value = { 
      id: null, 
      name: '', 
      token_limit: 50000, 
      service_id: catalog.value[0]?.id || '', 
      active: true 
    }
  }
  showModal.value = true
}

// 4. SUBMIT: CREATE (POST) & UPDATE (PATCH)
const submitForm = async () => {
  if (!form.value.name) return toast.warning("Vui lòng nhập tên dịch vụ")
  
  try {
    const isEdit = modalType.value === 'edit'
    const method = isEdit ? 'PATCH' : 'POST'
    const url = isEdit ? `${API_PATH}/${form.value.id}` : API_PATH

    const res = await $fetch(url, {
      method,
      body: {
        service_id: form.value.service_id,
        name: form.value.name,
        token_limit: form.value.token_limit,
        active: form.value.active
      }
    })

    if (res) {
      toast.success(isEdit ? 'Cập nhật thành công!' : 'Kích hoạt dịch vụ thành công!')
      showModal.value = false
      await fetchData() // Refresh bảng dữ liệu
    }
  } catch (err) {
    toast.error('Lỗi: ' + (err.data?.message || 'Không thể lưu dữ liệu'))
  }
}

// 5. XỬ LÝ XÓA MỀM (SOFT DELETE - GỌI METHOD DELETE)
const handleSoftDelete = async (item) => {
  const isHidden = (item.active === false || item.active === 0 || item.active === '0')
  const confirmMsg = isHidden ? 'Khôi phục hiển thị dịch vụ này?' : 'Bạn có chắc muốn ẩn dịch vụ này khỏi đối tác?'
  
  if (!(await toast.askConfirm(confirmMsg))) return

  try {
    if (!isHidden) {
      // TRƯỜNG HỢP ẨN: Gọi DELETE (Backend sẽ update active = 0)
      await $fetch(`${API_PATH}/${item.id}`, { method: 'DELETE' })
      toast.success('Đã ẩn dịch vụ.')
    } else {
      // TRƯỜNG HỢP KHÔI PHỤC: Gọi PATCH để bật lại active = 1
      await $fetch(`${API_PATH}/${item.id}`, { 
        method: 'PATCH',
        body: { active: true }
      })
      toast.success('Đã khôi phục dịch vụ.')
    }
    await fetchData()
  } catch (err) {
    toast.error('Thao tác thất bại.')
  }
}

onMounted(() => {
  fetchData()
})
definePageMeta({
  layout: 'layout-admin'
})
</script>

<style scoped>
.font-sora {
  font-family: 'Sora', sans-serif;
}
</style>