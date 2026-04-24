<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#09090B] text-slate-900 dark:text-[#e1e2ec] font-inter selection:bg-[#adc6ff]/30 relative overflow-hidden transition-colors duration-500">
    <!-- Ambient Background Glows -->
    <div class="absolute top-0 left-1/4 w-1/2 h-96 bg-indigo-500/5 dark:bg-[#adc6ff]/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-[#4edea3]/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 py-10 relative z-10">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="font-display-md text-[30px] font-bold tracking-tight text-slate-900 dark:text-[#e1e2ec] mb-1">B2B Partners</h1>
          <p class="text-[14px] text-slate-500 dark:text-[#8c909f]">Quản lý quyền truy cập tổ chức, hạn ngạch tài khoản và tình trạng triển khai.</p>
        </div>
        <button class="bg-[#3b82f6] dark:bg-[#adc6ff] hover:bg-[#2563eb] dark:hover:bg-[#4d8eff] text-white dark:text-[#002e6a] font-bold text-[11px] uppercase tracking-[0.15em] px-6 py-3 rounded-md flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] dark:shadow-[0_0_20px_rgba(173,198,255,0.2)] active:scale-95">
          <span class="material-symbols-outlined text-[18px]">add</span>
          Thêm tổ chức mới
        </button>
      </div>

      <!-- Data Table Card -->
      <div class="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl border border-slate-200 dark:border-[#424754] rounded-xl overflow-hidden shadow-xl dark:shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors">
        <!-- Table Controls -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-[#424754] flex flex-wrap justify-between items-center gap-4 bg-slate-50/50 dark:bg-[#191b23]/50 transition-colors">
          <div class="relative w-full md:w-72">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8c909f] text-[18px]">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Tìm kiếm tổ chức..." 
              class="w-full bg-white dark:bg-[#32353c]/50 border border-slate-200 dark:border-[#424754] rounded-md py-2 pl-10 pr-4 text-[13px] text-slate-900 dark:text-[#e1e2ec] placeholder:text-slate-400 dark:placeholder:text-[#8c909f] focus:outline-none focus:border-indigo-500 dark:focus:border-[#adc6ff] focus:ring-1 focus:ring-indigo-500 dark:focus:ring-[#adc6ff] transition-all"
            />
          </div>
          <div class="flex gap-2">
            <button class="p-2 rounded border border-slate-200 dark:border-[#424754] text-slate-400 dark:text-[#8c909f] hover:text-indigo-600 dark:hover:text-[#e1e2ec] hover:bg-slate-50 dark:hover:bg-[#32353c] transition-colors" title="Filter">
              <span class="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
            <button class="p-2 rounded border border-slate-200 dark:border-[#424754] text-slate-400 dark:text-[#8c909f] hover:text-indigo-600 dark:hover:text-[#e1e2ec] hover:bg-slate-50 dark:hover:bg-[#32353c] transition-colors" title="Export">
              <span class="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 dark:border-[#424754] bg-slate-50/30 dark:bg-[#191b23]/30">
                <th class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] px-6 py-4 uppercase tracking-widest whitespace-nowrap">Tổ chức</th>
                <th class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] px-6 py-4 uppercase tracking-widest whitespace-nowrap">Chủ sở hữu</th>
                <th class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] px-6 py-4 uppercase tracking-widest whitespace-nowrap">Tài nguyên</th>
                <th class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] px-6 py-4 uppercase tracking-widest whitespace-nowrap text-right">Bot hoạt động</th>
                <th class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] px-6 py-4 uppercase tracking-widest whitespace-nowrap">Trạng thái</th>
                <th class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] px-6 py-4 uppercase tracking-widest whitespace-nowrap text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody v-if="!loading" class="text-[13px]">
              <tr v-for="org in paginatedOrganizations" :key="org.id" 
                  class="border-b border-slate-50 dark:border-[#424754]/50 hover:bg-slate-50/80 dark:hover:bg-[#32353c]/30 transition-colors group">
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded bg-slate-100 dark:bg-[#363941] border border-slate-200 dark:border-[#424754] flex items-center justify-center text-slate-900 dark:text-[#e1e2ec] font-bold text-[14px] shadow-sm transition-colors">
                      {{ org.name?.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-[14px] font-semibold text-slate-900 dark:text-[#e1e2ec] group-hover:text-indigo-600 dark:group-hover:text-[#adc6ff] transition-colors">{{ org.name }}</div>
                      <div class="text-slate-400 dark:text-[#8c909f] text-[11px] font-data-mono mt-0.5 uppercase tracking-tighter">ID: {{ org.id?.slice(0, 8) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-slate-900 dark:text-[#e1e2ec] font-medium transition-colors">{{ org.ownerName || 'N/A' }}</span>
                    <span class="text-slate-400 dark:text-[#8c909f] text-[11px]">{{ org.email }}</span>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex flex-col gap-1.5 w-40">
                    <div class="flex justify-between items-center font-data-mono text-[10px]">
                      <span class="text-slate-900 dark:text-[#e1e2ec] transition-colors">{{ Math.floor(Math.random() * 5) + 1 }}M</span>
                      <span class="text-slate-400 dark:text-[#8c909f]">/ 10M Tokens</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 dark:bg-[#32353c] rounded-full overflow-hidden transition-colors">
                      <div class="h-full bg-indigo-500 dark:bg-[#adc6ff] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)] dark:shadow-[0_0_8px_rgba(173,198,255,0.5)] transition-all" :style="{ width: (Math.random() * 80 + 10) + '%' }"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap text-right font-data-mono text-slate-900 dark:text-[#e1e2ec] transition-colors">
                  {{ Math.floor(Math.random() * 100) + 1 }}
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <span :class="getStatusStyle(org.status)" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(org.status)"></span>
                    {{ org.status }}
                  </span>
                </td>
                <td class="px-6 py-5 whitespace-nowrap text-right">
                  <div class="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <button @click="selectedOrg = org" class="px-3 py-1.5 rounded border border-slate-200 dark:border-[#424754] text-slate-900 dark:text-[#e1e2ec] hover:border-indigo-600 dark:hover:border-[#adc6ff] hover:text-indigo-600 dark:hover:text-[#adc6ff] hover:bg-indigo-50 dark:hover:bg-[#adc6ff]/5 transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[16px]">visibility</span>
                      Chi tiết
                    </button>
                    <button class="p-1.5 rounded text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-100 dark:hover:bg-[#32353c] transition-colors">
                      <span class="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && organizations.length === 0" class="py-20 text-center">
          <span class="material-symbols-outlined text-6xl text-slate-200 dark:text-[#32353c] mb-4 transition-colors">business_center</span>
          <p class="text-slate-400 dark:text-[#8c909f] font-bold uppercase text-[12px] tracking-[0.3em] transition-colors">No organizations detected in this sector</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-20 text-center">
          <div class="w-10 h-10 border-4 border-indigo-500 dark:border-[#adc6ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-indigo-600 dark:text-[#adc6ff] font-bold uppercase text-[10px] tracking-widest transition-colors">Interrogating Registry...</p>
        </div>

        <!-- Pagination Footer -->
        <div v-if="!loading && organizations.length > 0" class="px-6 py-4 border-t border-slate-100 dark:border-[#424754] bg-slate-50/50 dark:bg-[#191b23]/50 flex items-center justify-between transition-colors">
          <div class="text-slate-400 dark:text-[#8c909f] text-[12px] font-medium transition-colors">
            Trang <span class="text-indigo-600 dark:text-[#adc6ff]">{{ currentPage }}</span> / {{ totalPages }} — Hiển thị <span class="text-slate-900 dark:text-[#e1e2ec]">{{ paginatedOrganizations.length }}</span> tổ chức
          </div>
          <div class="flex gap-2">
            <button 
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="p-2 rounded border border-slate-200 dark:border-[#424754] text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-100 dark:hover:bg-[#32353c] transition-all disabled:opacity-20 disabled:cursor-not-allowed">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="p-2 rounded border border-slate-200 dark:border-[#424754] text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-100 dark:hover:bg-[#32353c] transition-all disabled:opacity-20 disabled:cursor-not-allowed">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <transition name="modal">
      <div v-if="selectedOrg" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 dark:bg-[#09090B]/80 backdrop-blur-md transition-colors">
        <div class="bg-white dark:bg-[#1d2027] border border-slate-200 dark:border-[#424754] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
          <div class="px-8 py-6 border-b border-slate-100 dark:border-[#424754] flex justify-between items-center bg-slate-50 dark:bg-[#191b23] transition-colors">
            <h3 class="text-xl font-bold text-slate-900 dark:text-[#e1e2ec] transition-colors">{{ selectedOrg.name }}</h3>
            <button @click="selectedOrg = null" class="text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-8 grid grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Trạng thái</span>
                <span :class="getStatusStyle(selectedOrg.status)" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold w-fit transition-all">
                  {{ selectedOrg.status }}
                </span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Chủ sở hữu</span>
                <span class="text-slate-900 dark:text-[#e1e2ec] font-medium transition-colors">{{ selectedOrg.ownerName || 'N/A' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Email</span>
                <span class="text-slate-900 dark:text-[#e1e2ec] font-medium transition-colors">{{ selectedOrg.email }}</span>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Số điện thoại</span>
                <span class="text-slate-900 dark:text-[#e1e2ec] font-medium transition-colors">{{ selectedOrg.phone || 'N/A' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Địa chỉ</span>
                <span class="text-slate-900 dark:text-[#e1e2ec] font-medium text-[13px] leading-relaxed transition-colors">{{ selectedOrg.address }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Ngày tạo</span>
                <span class="text-slate-900 dark:text-[#e1e2ec] font-data-mono transition-colors">{{ formatDate(selectedOrg.createdAt) }}</span>
              </div>
            </div>
            <div class="col-span-2">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">Mô tả</span>
                <p class="text-slate-500 dark:text-[#8c909f] text-[13px] bg-slate-50 dark:bg-[#10131a] p-4 rounded-xl border border-slate-100 dark:border-[#424754] leading-relaxed transition-colors">
                  {{ selectedOrg.description || 'Không có mô tả cho tổ chức này.' }}
                </p>
              </div>
            </div>
          </div>
          <div class="px-8 py-6 bg-slate-50 dark:bg-[#191b23] flex justify-end gap-3 transition-colors">
            <button @click="selectedOrg = null" class="px-6 py-2.5 rounded-md border border-slate-200 dark:border-[#424754] text-slate-900 dark:text-[#e1e2ec] text-[11px] font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-[#32353c] transition-all">Đóng</button>
            <button class="px-6 py-2.5 rounded-md bg-indigo-600 dark:bg-[#adc6ff] text-white dark:text-[#002e6a] text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-[#4d8eff] shadow-[0_0_15px_rgba(79,70,229,0.2)] dark:shadow-[0_0_15px_rgba(173,198,255,0.2)] transition-all">Cập nhật Registry</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useOrganization } from '~/src/composables/useOrganization'

const { organizations, fetchOrganizations, loading } = useOrganization()

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 7

// MODAL
const selectedOrg = ref(null)

onMounted(async () => {
  await fetchOrganizations()
})

// Reset to first page when searching
watch(searchQuery, () => {
  currentPage.value = 1
})

// PAGINATION 
const totalPages = computed(() =>
  Math.ceil(organizations.value.length / pageSize) || 1
)

const paginatedOrganizations = computed(() => {
  // Simple client-side search filter
  const filtered = organizations.value.filter(org => 
    org.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    org.ownerName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    org.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  
  const start = (currentPage.value - 1) * pageSize
  return filtered.slice(start, start + pageSize)
})

// CHANGE PAGE
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// UTILS
const formatDate = (d) => {
  if (!d) return 'N/A'
  return new Date(d).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusStyle = (s) => {
  const isDark = document.documentElement.classList.contains('dark')
  const styles = {
    active: 'bg-emerald-50 dark:bg-[#4edea3]/10 text-emerald-600 dark:text-[#4edea3] border-emerald-100 dark:border-[#4edea3]/20 shadow-sm dark:shadow-[0_0_10px_rgba(78,222,163,0.1)]',
    healthy: 'bg-emerald-50 dark:bg-[#4edea3]/10 text-emerald-600 dark:text-[#4edea3] border-emerald-100 dark:border-[#4edea3]/20 shadow-sm dark:shadow-[0_0_10px_rgba(78,222,163,0.1)]',
    pending: 'bg-amber-50 dark:bg-[#ffb3ad]/10 text-amber-600 dark:text-[#ffb3ad] border-amber-100 dark:border-[#ffb3ad]/20',
    suspended: 'bg-rose-50 dark:bg-[#ffb3ad]/10 text-rose-600 dark:text-[#ffb3ad] border-rose-100 dark:border-[#ffb3ad]/20',
    inactive: 'bg-slate-100 dark:bg-[#272a31] text-slate-500 dark:text-[#8c909f] border-slate-200 dark:border-[#424754]'
  }
  return styles[s?.toLowerCase()] || styles.inactive
}

const getStatusDotClass = (s) => {
  const dots = {
    active: 'bg-emerald-500 dark:bg-[#4edea3] shadow-sm dark:shadow-[0_0_8px_rgba(78,222,163,0.8)]',
    healthy: 'bg-emerald-500 dark:bg-[#4edea3] shadow-sm dark:shadow-[0_0_8px_rgba(78,222,163,0.8)]',
    pending: 'bg-amber-500 dark:bg-[#ffb3ad] shadow-sm dark:shadow-[0_0_8px_rgba(255,179,173,0.8)]',
    suspended: 'bg-rose-500 dark:bg-[#ffb3ad] shadow-sm dark:shadow-[0_0_8px_rgba(255,179,173,0.8)]',
    inactive: 'bg-slate-400 dark:bg-[#8c909f]'
  }
  return dots[s?.toLowerCase()] || dots.inactive
}

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