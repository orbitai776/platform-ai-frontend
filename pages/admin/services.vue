<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#09090B] text-slate-900 dark:text-[#e1e2ec] font-inter selection:bg-[#adc6ff]/30 relative overflow-hidden transition-colors duration-500">
    <!-- Ambient Background Glows -->
    <div class="absolute top-0 left-1/4 w-1/2 h-96 bg-indigo-500/5 dark:bg-[#adc6ff]/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-[#ffb3ad]/5 rounded-full blur-[150px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 py-10 relative z-10">
      <!-- Page Header -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 dark:border-[#272a31] pb-8 transition-colors">
        <div>
          <h1 class="font-display-lg text-[30px] font-bold tracking-tight text-slate-900 dark:text-[#e1e2ec] mb-2 transition-colors">Quản trị AI Services</h1>
          <p class="text-[14px] text-slate-500 dark:text-[#8c909f] max-w-2xl transition-colors">Quản lý danh mục, cấu hình hạn mức và trạng thái dịch vụ toàn hệ thống. Theo dõi mức tiêu thụ tài nguyên và phiên bản mô hình hoạt động.</p>
        </div>
        <button 
          @click="openModal('create')"
          class="bg-indigo-600 dark:bg-[#adc6ff] hover:bg-indigo-700 dark:hover:bg-[#4d8eff] text-white dark:text-[#002e6a] font-bold text-[11px] uppercase tracking-[0.15em] px-6 py-3 rounded-md flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] dark:shadow-[0_0_20px_rgba(173,198,255,0.2)] active:scale-95"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Thiết lập Service mới
        </button>
      </header>

      <!-- Search & Filter Controls -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div class="relative w-full md:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8c909f] text-[18px]">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm mẫu dịch vụ..." 
            class="w-full bg-white dark:bg-[#1d2027]/50 border border-slate-200 dark:border-[#424754] rounded-lg py-2.5 pl-10 pr-4 text-[13px] text-slate-900 dark:text-[#e1e2ec] placeholder:text-slate-400 dark:placeholder:text-[#8c909f] focus:outline-none focus:border-indigo-500 dark:focus:border-[#adc6ff] focus:ring-1 focus:ring-indigo-500 dark:focus:ring-[#adc6ff] transition-all"
          />
        </div>
        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1d2027]/50 border border-slate-200 dark:border-[#424754] rounded-lg text-slate-900 dark:text-[#e1e2ec] hover:bg-slate-50 dark:hover:bg-[#272a31] transition-all text-[12px] font-medium shadow-sm transition-colors">
            <span class="material-symbols-outlined text-[18px]">filter_list</span>
            Bộ lọc
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-32 text-center">
        <div class="w-12 h-12 border-4 border-indigo-600 dark:border-[#adc6ff] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p class="text-indigo-600 dark:text-[#adc6ff] font-bold uppercase text-[12px] tracking-[0.2em] animate-pulse transition-colors">Đang đồng bộ Registry...</p>
      </div>

      <!-- Catalog Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="item in filteredServices" 
          :key="item.id" 
          class="bg-white dark:bg-[#191b23]/60 backdrop-blur-md border border-slate-200 dark:border-[#272a31] rounded-xl p-6 flex flex-col relative group overflow-hidden transition-all hover:bg-slate-50/50 dark:hover:bg-[#191b23]/80 hover:border-indigo-200 dark:hover:border-[#424754] shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300"
          :class="{'opacity-40 grayscale-[0.5]': item.active === false || item.active === 0 || item.active === '0'}"
        >
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-[#adc6ff] dark:to-[#4edea3] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-[#adc6ff]/10 border border-indigo-100 dark:border-[#adc6ff]/20 flex items-center justify-center text-indigo-600 dark:text-[#adc6ff] transition-colors">
                <span class="material-symbols-outlined text-[24px]">{{ getServiceIcon(item.name) }}</span>
              </div>
              <div>
                <h3 class="text-[18px] font-bold leading-tight text-slate-900 dark:text-[#e1e2ec] group-hover:text-indigo-600 dark:group-hover:text-[#adc6ff] transition-colors">{{ item.name }}</h3>
                <span class="text-[11px] font-data-mono text-slate-400 dark:text-[#8c909f] uppercase tracking-tighter transition-colors">ID: {{ item.id?.slice(0, 8) }}</span>
              </div>
            </div>
            <span 
              :class="(item.active === false || item.active === 0 || item.active === '0') ? 'bg-rose-50 dark:bg-[#ffb3ad]/10 text-rose-600 dark:text-[#ffb3ad] border-rose-100 dark:border-[#ffb3ad]/20' : 'bg-emerald-50 dark:bg-[#4edea3]/10 text-emerald-600 dark:text-[#4edea3] border-emerald-100 dark:border-[#4edea3]/20'"
              class="px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              {{ (item.active === false || item.active === 0 || item.active === '0') ? 'Đã ẩn' : 'Active' }}
            </span>
          </div>

          <p class="text-[12px] text-slate-500 dark:text-[#c2c6d6] leading-relaxed mb-6 flex-1 transition-colors">
            Loại: <span class="text-slate-900 dark:text-[#e1e2ec] font-medium transition-colors">{{ catalog.find(c => c.id === item.service_id)?.name || item.service_id }}</span>. 
            Mô hình AI được tối ưu hóa cho hiệu suất cao và độ trễ thấp trong các tác vụ cụ thể.
          </p>

          <div class="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-[#272a31] pt-6 mb-8 transition-colors">
            <div>
              <span class="block text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest mb-1.5 transition-colors">Hạn mức Token</span>
              <span class="block text-[14px] font-data-mono text-slate-900 dark:text-[#e1e2ec] transition-colors">{{ item.token_limit?.toLocaleString() }}</span>
            </div>
            <div>
              <span class="block text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest mb-1.5 transition-colors">Đã sử dụng</span>
              <span class="block text-[14px] font-data-mono text-indigo-600 dark:text-[#adc6ff] transition-colors">{{ item.token_used?.toLocaleString() }}</span>
            </div>
            <div class="col-span-2">
              <div class="h-1.5 w-full bg-slate-100 dark:bg-[#32353c] rounded-full overflow-hidden mt-1 transition-colors">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-[#adc6ff] dark:to-[#4d8eff] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.2)] dark:shadow-[0_0_8px_rgba(173,198,255,0.4)]" :style="{ width: getUsagePercent(item) + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-auto">
            <button @click="openModal('edit', item)" class="flex-1 py-2.5 bg-indigo-600 dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-lg text-[12px] font-bold uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-[#4d8eff] transition-all shadow-lg dark:shadow-[0_0_15px_rgba(173,198,255,0.1)]">Cấu hình</button>
            <button @click="handleSoftDelete(item)" class="px-3 py-2.5 border border-slate-200 dark:border-[#424754] rounded-lg text-slate-400 dark:text-[#8c909f] hover:text-rose-500 dark:hover:text-[#ffb3ad] hover:border-rose-200 dark:hover:border-[#ffb3ad] hover:bg-rose-50 dark:hover:bg-[#ffb3ad]/5 transition-all flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">{{ item.active !== false ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <!-- Add New Card -->
        <div @click="openModal('create')" class="bg-white/50 dark:bg-[#191b23]/30 border border-dashed border-slate-300 dark:border-[#424754] rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[340px] hover:bg-slate-50 dark:hover:bg-[#191b23]/50 hover:border-indigo-500 dark:hover:border-[#adc6ff] transition-all cursor-pointer group shadow-sm hover:shadow-xl">
          <div class="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#1d2027] border border-slate-200 dark:border-[#424754] flex items-center justify-center text-slate-400 dark:text-[#8c909f] group-hover:text-indigo-600 dark:group-hover:text-[#adc6ff] group-hover:border-indigo-600 dark:group-hover:border-[#adc6ff] group-hover:bg-indigo-50 dark:group-hover:bg-[#adc6ff]/10 transition-all mb-4 shadow-sm">
            <span class="material-symbols-outlined text-[28px]">add</span>
          </div>
          <h3 class="text-[18px] font-bold text-slate-900 dark:text-[#e1e2ec] mb-2 transition-colors">Tạo Template tùy chỉnh</h3>
          <p class="text-[12px] text-slate-500 dark:text-[#8c909f] max-w-xs leading-relaxed transition-colors">Khởi tạo cấu hình dịch vụ AI mới để triển khai cho đối tác và quản lý hạn mức tập trung.</p>
        </div>
      </div>

      <!-- Pagination Footer -->
      <div v-if="!loading && services.length > 0" class="mt-8 px-6 py-4 border-t border-slate-100 dark:border-[#424754] bg-white dark:bg-[#191b23]/50 flex items-center justify-between rounded-xl shadow-xl transition-colors">
        <div class="text-slate-400 dark:text-[#8c909f] text-[12px] font-medium">
          Trang <span class="text-indigo-600 dark:text-[#adc6ff] transition-colors">{{ Math.ceil(filteredServices.length / 9) > 0 ? 1 : 0 }}</span> / {{ Math.ceil(filteredServices.length / 9) || 1 }} — Hiển thị <span class="text-slate-900 dark:text-[#e1e2ec] transition-colors">{{ filteredServices.length }}</span> dịch vụ
        </div>
        <div class="flex gap-2">
          <button class="p-2 rounded border border-slate-200 dark:border-[#424754] text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-50 dark:hover:bg-[#32353c] transition-all opacity-20 cursor-not-allowed">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="p-2 rounded border border-slate-200 dark:border-[#424754] text-slate-400 dark:text-[#e1e2ec] hover:bg-slate-50 dark:hover:bg-[#32353c] transition-all opacity-20 cursor-not-allowed">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Admin Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 dark:bg-[#09090B]/80 backdrop-blur-md p-6 transition-colors">
        <div class="bg-white dark:bg-[#1d2027] border border-slate-200 dark:border-[#424754] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300 transition-colors">
          <div class="px-8 py-6 border-b border-slate-100 dark:border-[#424754] flex justify-between items-center bg-slate-50 dark:bg-[#191b23] transition-colors">
            <h2 class="text-xl font-bold text-slate-900 dark:text-[#e1e2ec] transition-colors">
              {{ modalType === 'create' ? 'Kích hoạt Dịch vụ AI' : 'Cập nhật Cấu hình' }}
            </h2>
            <button @click="showModal = false" class="text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div class="p-8 space-y-6">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Tên hiển thị (Partner thấy)</label>
              <input v-model="form.name" type="text" class="w-full bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-[#424754] rounded-xl px-4 py-3.5 text-slate-900 dark:text-[#e1e2ec] focus:border-indigo-500 dark:focus:border-[#adc6ff]/50 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-[#adc6ff]/50 outline-none transition-all text-sm font-medium shadow-inner transition-colors" placeholder="VD: ChatGPT-4o Premium">
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Hạn mức Token</label>
                <input v-model.number="form.token_limit" type="number" class="w-full bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-[#424754] rounded-xl px-4 py-3.5 text-slate-900 dark:text-[#e1e2ec] focus:border-indigo-500 dark:focus:border-[#adc6ff]/50 outline-none transition-all text-sm font-data-mono transition-colors">
              </div>
              <div v-if="modalType === 'create'" class="flex flex-col gap-2">
                <label class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Loại AI (Catalog)</label>
                <select v-model="form.service_id" class="w-full bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-[#424754] rounded-xl px-4 py-3.5 text-slate-900 dark:text-[#e1e2ec] focus:border-indigo-500 dark:focus:border-[#adc6ff]/50 outline-none cursor-pointer text-sm font-medium transition-colors">
                  <option v-for="cat in catalog" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div v-else class="flex flex-col justify-end">
                <div @click="form.active = !form.active" class="flex items-center gap-3 bg-indigo-50 dark:bg-[#adc6ff]/5 p-3.5 rounded-xl border border-indigo-100 dark:border-[#adc6ff]/10 hover:bg-indigo-100 dark:hover:bg-[#adc6ff]/10 cursor-pointer transition-all group transition-colors">
                  <div class="w-5 h-5 rounded border border-slate-200 dark:border-[#424754] flex items-center justify-center transition-all" :class="{'bg-indigo-600 dark:bg-[#adc6ff] border-indigo-600 dark:border-[#adc6ff]': form.active}">
                    <span v-if="form.active" class="material-symbols-outlined text-[16px] text-white dark:text-[#002e6a] font-bold">check</span>
                  </div>
                  <span class="font-bold text-[11px] uppercase tracking-widest transition-colors" :class="form.active ? 'text-indigo-600 dark:text-[#adc6ff]' : 'text-slate-400 dark:text-[#8c909f]'">Đang hoạt động</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-8 py-6 bg-slate-50 dark:bg-[#191b23] flex gap-4 transition-colors">
            <button @click="showModal = false" class="flex-1 py-3.5 font-bold text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-200 dark:hover:bg-[#272a31] rounded-xl transition-all text-[11px] uppercase tracking-[0.2em] border border-transparent hover:border-slate-300 dark:hover:border-[#424754]">Hủy bỏ</button>
            <button @click="submitForm" class="flex-1 py-3.5 font-bold bg-indigo-600 dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl hover:bg-indigo-700 dark:hover:bg-[#4d8eff] shadow-lg shadow-indigo-200 dark:shadow-[#adc6ff]/10 transition-all text-[11px] uppercase tracking-[0.2em] active:scale-95">
              {{ modalType === 'create' ? 'Kích hoạt' : 'Lưu cập nhật' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useServices from '~/src/composables/useServices'

const toast = useToast()

// 1. STATE & CONFIG
const { services: catalog, fetchServices: fetchCatalog } = useServices()
const services = ref([])
const loading = ref(true)
const showModal = ref(false)
const modalType = ref('create') 
const API_PATH = '/api/partner/list-services'
const searchQuery = ref('')

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
    await fetchCatalog() 
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
    form.value = { ...item, active: !(item.active === false || item.active === 0 || item.active === '0') }
  } else {
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
      await fetchData() 
    }
  } catch (err) {
    toast.error('Lỗi: ' + (err.data?.message || 'Không thể lưu dữ liệu'))
  }
}

// 5. XỬ LÝ XÓA MỀM (SOFT DELETE)
const handleSoftDelete = async (item) => {
  const isHidden = (item.active === false || item.active === 0 || item.active === '0')
  const confirmMsg = isHidden ? 'Khôi phục hiển thị dịch vụ này?' : 'Bạn có chắc muốn ẩn dịch vụ này khỏi đối tác?'
  
  if (!(await toast.askConfirm(confirmMsg))) return

  try {
    if (!isHidden) {
      await $fetch(`${API_PATH}/${item.id}`, { method: 'DELETE' })
      toast.success('Đã ẩn dịch vụ.')
    } else {
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

// UTILS
const filteredServices = computed(() => {
  return services.value.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getUsagePercent = (item) => {
  if (!item.token_limit) return 0
  return Math.min((item.token_used / item.token_limit) * 100, 100)
}

const getServiceIcon = (name) => {
  const n = name?.toLowerCase() || ''
  if (n.includes('chat') || n.includes('gpt')) return 'forum'
  if (n.includes('image') || n.includes('dalle')) return 'image'
  if (n.includes('code')) return 'terminal'
  if (n.includes('audio') || n.includes('voice')) return 'settings_voice'
  if (n.includes('travel') || n.includes('tourism')) return 'flight_takeoff'
  return 'smart_toy'
}

onMounted(() => {
  fetchData()
})

definePageMeta({
  layout: 'layout-admin'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-data-mono {
  font-family: 'JetBrains Mono', monospace;
}

.font-display-lg {
  font-family: 'Inter', sans-serif;
}

/* Modal Animations */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.3);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(173, 198, 255, 0.3);
}
</style>