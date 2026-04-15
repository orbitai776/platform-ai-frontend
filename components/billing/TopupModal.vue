<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300">
    <!-- Modal Container -->
    <div class="bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-[480px] overflow-hidden transform transition-all scale-100 relative">
      
      <!-- Top Glow -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none"></div>

      <!-- Header -->
      <div class="p-8 pb-4 border-b border-white/5 flex justify-between items-center relative z-10">
        <div>
          <h3 class="text-2xl font-black text-white tracking-tight">Nạp thêm Token</h3>
          <p class="text-sm text-slate-500 font-medium">Chọn gói phù hợp với nhu cầu của bạn</p>
        </div>
        <button @click="$emit('close-modal')" 
                class="text-slate-500 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full p-2.5 group">
          <XMarkIcon class="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-8 space-y-8 relative z-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
        
        <!-- Error Notice -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-if="errorMsg" class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 group">
            <div class="p-2 bg-red-500/20 rounded-lg text-red-400">
              <ExclamationCircleIcon class="w-5 h-5" />
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-red-400">Có lỗi xảy ra</h4>
              <p class="text-[11px] text-red-300/80 font-medium leading-relaxed mt-1">{{ errorMsg }}</p>
            </div>
            <button @click="errorMsg = ''" class="p-1 text-red-400/50 hover:text-red-400 transition-colors">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
        </Transition>

        <!-- Package Selection -->
        <div class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <span class="text-xs font-black uppercase tracking-widest text-slate-500">1. Chọn gói nạp</span>
          </div>
          <div class="space-y-3">
            <div v-for="pkg in tokenPackages" :key="pkg.id"
                 @click="selectedPackageId = pkg.id; errorMsg = ''"
                 :class="selectedPackageId === pkg.id 
                    ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'"
                 class="flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 group">
              
              <div class="flex items-center gap-4">
                <div :class="selectedPackageId === pkg.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'" 
                     class="w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                  <TicketIcon class="w-6 h-6" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                      {{ pkg.tokens }} <span class="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">TKN</span>
                    </span>
                    <span v-if="pkg.bonus !== '0'" 
                          class="px-2 py-0.5 text-[9px] font-black bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 uppercase tracking-tighter">
                      +{{ pkg.bonus }} bonus
                    </span>
                  </div>
                  <div class="text-xs font-bold text-slate-500">Giá: <span class="text-blue-400/80">{{ pkg.price }}</span></div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div :class="selectedPackageId === pkg.id ? 'bg-blue-500 scale-100 opacity-100' : 'bg-slate-800 scale-75 opacity-0'" 
                     class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300">
                  <CheckIcon class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <span class="text-xs font-black uppercase tracking-widest text-slate-500">2. Phương thức thanh toán</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="method in paymentMethods" :key="method.id"
                 @click="selectedMethodId = method.id; errorMsg = ''"
                 :class="selectedMethodId === method.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10'"
                 class="flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 group gap-2">
              <img :src="method.icon" :alt="method.name" class="h-8 object-contain filter " :class="selectedMethodId === method.id ? '' : 'grayscale opacity-50'">
              <span :class="selectedMethodId === method.id ? 'text-white' : 'text-slate-500'" class="text-[11px] font-bold uppercase tracking-widest">{{ method.name }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Action -->
      <div class="p-8 pt-0 relative z-10">
        <button @click="handleTopup" 
                :disabled="isLoading" 
                class="group relative w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-lg rounded-[1.25rem] transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] active:scale-95 disabled:hover:shadow-none">
          <div v-if="isLoading" class="flex items-center justify-center gap-3">
            <div class="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>Đang tạo đơn hàng...</span>
          </div>
          <div v-else class="flex items-center justify-center gap-2">
            <span>Thanh toán ngay</span>
            <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
        <p class="text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-6">
          Giao dịch an toàn & bảo mật qua <span class="text-slate-400">PayOS</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  XMarkIcon, 
  CheckIcon, 
  TicketIcon, 
  ArrowRightIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(['close-modal'])

const selectedPackageId = ref(1)
const selectedMethodId = ref('payos')
const isLoading = ref(false)
const errorMsg = ref('')

const tokenPackages = [
  { id: 1, tokens: '1,000', price: '100.000 VNĐ', bonus: '0' },
  { id: 2, tokens: '5,500', price: '500.000 VNĐ', bonus: '10%' },
  { id: 3, tokens: '12,000', price: '1.000.000 VNĐ', bonus: '20%' },
]

const paymentMethods = [
  { id: 'payos', name: 'PayOS', icon: 'https://payos.vn/docs/img/logo.svg' },
  { id: 'vnpay', name: 'VNPAY', icon: 'https://static.cdnlogo.com/logos/v/99/vnpay.svg' }
]

const handleTopup = async () => {
  const pkg = tokenPackages.find(p => p.id === selectedPackageId.value)
  if (!pkg) return

  isLoading.value = true
  errorMsg.value = ''
  
  try {
    const rawPrice = parseInt(pkg.price.replace(/\D/g, ''))
    const rawTokens = parseInt(pkg.tokens.replace(/\D/g, ''))

    // Gửi yêu cầu nạp tiền với dữ liệu đã được map đúng từ UI
    const response = await $fetch('/api/partner/billing/payments', {
      method: 'POST',
      body: {
        package_id: pkg.id,
        amount: rawPrice,
        tokens: rawTokens,
        payment_method: selectedMethodId.value
      }
    })
    
    if (response?.payment_url) {
       // Chuyển hướng sang cổng thanh toán
       window.location.href = response.payment_url
    } else {
       console.error('Không tìm thấy link thanh toán trong response:', response)
       errorMsg.value = 'Hệ thống đã tạo đơn hàng nhưng chưa có đường dẫn thanh toán. Vui lòng thử lại sau.'
    }

  } catch (error) {
    console.error('Lỗi thanh toán:', error)
    errorMsg.value = error?.response?._data?.message || error?.message || 'Đã xảy ra lỗi khi tạo yêu cầu thanh toán. Vui lòng kiểm tra lại kết nối.'
  } finally {
    isLoading.value = false
  }
}
</script>
