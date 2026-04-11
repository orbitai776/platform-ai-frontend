<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between px-2">
      <h2 class="text-2xl font-bold text-white">Lịch sử giao dịch</h2>
    </div>
    
    <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div class="grid grid-cols-4 md:grid-cols-4 gap-4 px-6 py-5 border-b border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-900/50">
        <div class="col-span-1">Mã GD</div>
        <div class="hidden md:block">Loại</div>
        <div>Số lượng VND</div>
        <div class="text-right">Trạng thái</div>
      </div>

      <div class="divide-y divide-slate-800/50">
        <div v-for="tx in history" :key="tx.id" class="grid grid-cols-4 md:grid-cols-4 gap-4 px-6 py-5 items-center hover:bg-slate-800/50 transition-colors duration-200">
          <div class="text-sm font-medium text-slate-200" :title="tx.id">
            {{ tx.id.substring(0, 8) }}...
          </div>
          
          <div class="hidden md:block">
            <span class="bg-green-500/10 text-green-400 border-green-500/20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider">
              <span class="bg-green-400 w-1.5 h-1.5 rounded-full"></span>
              Nạp
            </span>
          </div>
          
          <div class="text-green-400 text-sm font-bold">
            +{{ tx.amount.toLocaleString() }} đ
          </div>
          
          <div class="text-right text-sm font-bold flex justify-end items-center gap-1" :class="tx.status === 'completed' ? 'text-blue-400' : 'text-yellow-400'">
            <svg v-if="tx.status === 'completed'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ tx.status === 'completed' ? 'Thành công' : 'Chờ xử lý' }}
          </div>
        </div>
        
        <div v-if="!history?.length" class="p-8 text-center text-slate-500 font-medium">
          Chưa có giao dịch nào phát sinh.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  history: { type: Array, default: () => [] }
})
</script>