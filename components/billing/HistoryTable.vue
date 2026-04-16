<template>
  <div class="space-y-6 text-slate-200">
    <!-- Header info -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Lịch sử giao dịch
        </h2>
        <p class="text-sm text-slate-500">Xem và quản lý các giao dịch nạp tiền của bạn</p>
      </div>
    </div>

    <!-- Table Container -->
    <div class="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl">
      <!-- Loading State -->
      <div v-if="pending" class="flex flex-col items-center justify-center p-20 space-y-4 text-center">
        <div class="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p class="text-slate-400 font-medium animate-pulse">Đang tải dữ liệu...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center p-20 text-center space-y-4">
        <div class="p-4 bg-red-500/10 rounded-full">
          <XCircleIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <h3 class="text-white font-bold text-lg">Lỗi tải dữ liệu</h3>
          <p class="text-slate-400 max-w-xs mx-auto text-sm">Không thể kết nối với máy chủ. Vui lòng thử lại sau.</p>
        </div>
        <button @click="refresh()" class="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium text-sm">
          Thử lại
        </button>
      </div>

      <!-- Content -->
      <template v-else>
        <div class="overflow-x-auto min-h-[350px]">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/5 bg-white/[0.02]">
                <th class="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Mã giao dịch</th>
                <th class="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hidden md:table-cell">Phương thức</th>
                <th class="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Số lượng</th>
                <th class="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="tx in history" :key="tx.id" class="group hover:bg-white/[0.03] transition-colors duration-300">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <div :class="tx.isDeposit ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'" 
                         class="p-2.5 rounded-xl hidden sm:flex border border-white/5">
                      <ArrowDownLeftIcon v-if="tx.isDeposit" class="w-5 h-5" />
                      <ArrowUpRightIcon v-else class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {{ tx.id }}
                      </div>
                      <div class="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                        <span>{{ tx.date }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td class="px-6 py-5 hidden md:table-cell">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                      <span class="text-[10px] font-bold text-slate-400 uppercase">{{ tx.method.substring(0, 2) }}</span>
                    </div>
                    <span class="text-sm text-slate-300 capitalize">{{ tx.method }}</span>
                  </div>
                </td>

                <td class="px-6 py-5">
                  <div class="flex flex-col">
                    <span :class="tx.isDeposit ? 'text-emerald-400' : 'text-orange-400'" class="text-sm font-bold tracking-tight">
                      {{ tx.isDeposit ? '+' : '-' }}{{ formatNumber(tx.tokenAmount) }} TKN
                    </span>
                    <span class="text-[11px] text-slate-500 font-medium">
                      {{ formatCurrency(tx.amount) }} VNĐ
                    </span>
                  </div>
                </td>

                <td class="px-6 py-5 text-right">
                  <span :class="getStatusStyles(tx.status)" 
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border">
                    <component :is="getStatusIcon(tx.status)" 
                               :class="['w-3 h-3', { 'animate-spin': tx.status === 'pending' }]" />
                    {{ getStatusText(tx.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="history?.length" class="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div class="text-xs text-slate-500 font-medium">
           <!-- Hiển thị <span class="text-slate-300">{{ history.length }}</span> / <span class="text-slate-300">{{ totalCount }}</span> giao dịch -->
          </div>
          <div class="flex items-center gap-4">
            <div class="text-xs text-slate-500 font-bold uppercase tracking-widest hidden sm:block">
              Trang <span class="text-blue-400">{{ currentPage }}</span> / {{ totalPages }}
            </div>
            <div class="flex items-center gap-1">
              <button @click="prevPage" 
                      :disabled="currentPage <= 1 || pending"
                      class="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-slate-400 hover:text-white">
                <ChevronLeftIcon class="w-4 h-4" />
              </button>
              <button @click="nextPage" 
                      :disabled="currentPage >= totalPages || pending"
                      class="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-slate-400 hover:text-white">
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!history?.length" class="flex flex-col items-center justify-center p-20 text-center space-y-4">
          <div class="p-6 bg-slate-800/50 rounded-full border border-white/5">
            <InboxIcon class="w-12 h-12 text-slate-600" />
          </div>
          <div>
            <h3 class="text-slate-200 font-bold text-lg">Chưa có giao dịch</h3>
            <p class="text-slate-500 max-w-xs text-sm">Các giao dịch nạp tiền của bạn sẽ xuất hiện tại đây.</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { 
  ArrowDownLeftIcon, 
  ArrowUpRightIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  InboxIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const headers = useRequestHeaders(['cookie'])

// Pagination states
const currentPage = ref(1)
const pageSize = ref(5)

// Tự động gọi API lấy danh sách payments
const { data: paymentsData, pending, error, refresh } = await useFetch('/api/partner/billing/payments/list', { 
  headers,
  query: { 
    page: currentPage,
    page_size: pageSize
  },
  watch: [currentPage],
  lazy: true
})

const totalCount = computed(() => paymentsData.value?.count ?? 0)
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / pageSize.value)))

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const history = computed(() => {
  // Fix data mapping: API trả về kết quả trong results field
  const rawList = paymentsData.value?.results ?? paymentsData.value?.data?.results ?? paymentsData.value?.data ?? []
  
  if (!Array.isArray(rawList)) return []

  // Đảm bảo chỉ hiển thị tối đa 5 bản ghi trên một trang trong UI
  return rawList.slice(0, 5).map(tx => {
    // Xác định loại giao dịch
    const isDeposit = true // Tạm thời mặc định là nạp tiền
    
    return {
      id: tx.transaction_id || tx.id?.substring(0, 8) || '---',
      isDeposit,
      tokenAmount: tx.token_amount || 0,
      amount: tx.amount || 0,
      method: tx.payment_method || 'payos',
      date: formatDate(tx.created_at),
      status: tx.status?.toLowerCase() || 'pending'
    }
  })
})

// Utilities
const formatNumber = (val) => {
  if (val === undefined || val === null) return '0'
  // Đảm bảo ép kiểu về số và làm tròn để tránh lỗi định dạng chuỗi từ backend
  const num = Math.floor(Number(val))
  return new Intl.NumberFormat('vi-VN').format(num)
}
const formatCurrency = (val) => {
  if (val === undefined || val === null) return '0'
  const num = Number(val)
  return new Intl.NumberFormat('vi-VN').format(num)
}

const formatDate = (dateStr) => {
  if (!dateStr) return '---'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getStatusStyles = (status) => {
  switch (status) {
    case 'success':
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
    case 'pending':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
    case 'failed':
    case 'error':
    case 'cancelled':
      return 'bg-red-500/10 text-red-400 border-red-500/20'
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
    case 'completed':
      return CheckCircleIcon
    case 'pending':
      return ClockIcon
    case 'failed':
    case 'error':
    case 'cancelled':
      return XCircleIcon
    default:
      return ClockIcon
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'success':
    case 'completed': return 'Thành công'
    case 'pending': return 'Đang xử lý'
    case 'failed': return 'Thất bại'
    case 'cancelled': return 'Đã hủy'
    default: return status
  }
}
</script>
