<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity">
    <div class="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
      
      <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
        <h3 class="text-xl font-bold text-white">Chọn gói Nạp Token</h3>
        <button @click="$emit('close-modal')" class="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div class="space-y-3">
          <div v-for="pkg in tokenPackages" :key="pkg.id"
               @click="selectedPackage = pkg"
               :class="selectedPackage.id === pkg.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/30'"
               class="flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all">
            
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xl font-black text-white">{{ pkg.tokens }} <span class="text-sm text-slate-400 font-medium">TKN</span></span>
                <span v-if="pkg.bonus !== '0'" class="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                  Thưởng {{ pkg.bonus }}
                </span>
              </div>
              <div class="text-sm font-medium text-slate-400 mt-1">Giá: <span class="text-blue-400">{{ pkg.price }}</span></div>
            </div>
            
            <div :class="selectedPackage.id === pkg.id ? 'text-blue-500 scale-100' : 'text-transparent scale-50'" class="transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 pt-2">
        <button 
          @click="handleTopup" 
          :disabled="isProcessing"
          class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95 disabled:opacity-50"
        >
          {{ isProcessing ? 'Đang chuyển hướng...' : 'Thanh toán ngay' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isProcessing: Boolean
})

const emit = defineEmits(['close-modal', 'submit-payment'])

// Thêm trường rawAmount để gửi lên BE chuẩn xác
const tokenPackages = [
  { id: 1, tokens: '1,000', price: '100.000 VNĐ', bonus: '0', rawAmount: 100000 },
  { id: 2, tokens: '5,500', price: '500.000 VNĐ', bonus: '+10%', rawAmount: 500000 },
  { id: 3, tokens: '12,000', price: '1.000.000 VNĐ', bonus: '+20%', rawAmount: 1000000 },
]

const selectedPackage = ref(tokenPackages[0])

const handleTopup = () => {
  // Bắn sự kiện kèm theo số tiền gốc (rawAmount) lên file cha xử lý
  emit('submit-payment', selectedPackage.value.rawAmount)
}
</script>