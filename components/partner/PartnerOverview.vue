<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex items-end justify-between mb-4">
      <div>
        <h1
          class="text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight transition-colors">
          Dashboard</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm mt-1 transition-colors">Real-time telemetry for active
          deployments.</p>
      </div>
      <span
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest transition-colors">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
        System Operational
      </span>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <!-- Token Usage Chart -->
      <div
        class="col-span-12 xl:col-span-8 glass-card rounded-2xl p-8 flex flex-col relative overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <div class="flex justify-between items-start mb-8 z-10">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">Token
              Utilization</h2>
            <p
              class="text-xs text-slate-400 dark:text-white/40 mt-1 uppercase tracking-widest font-bold transition-colors">
              Last 7 days computation volume</p>
          </div>
          <div class="text-right">
            <div
              class="text-5xl font-bold text-cyan-600 dark:text-cyan-400 font-['Space_Grotesk'] shimmer-text transition-colors">
              4.2M</div>
            <div
              class="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest mt-1 transition-colors">
              +12.5% VS LAST WEEK</div>
          </div>
        </div>
        <div class="flex-1 flex items-end justify-between gap-2 mt-4 z-10 h-32">
          <div v-for="(h, i) in [40, 60, 35, 80, 100, 65, 45]" :key="i"
            class="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm relative group cursor-pointer transition-colors">
            <div :style="{ height: h + '%' }" class="absolute bottom-0 w-full transition-all group-hover:brightness-125"
              :class="i === 4 ? 'bg-gradient-to-t from-cyan-600/20 dark:from-cyan-500/20 to-cyan-600 dark:to-cyan-400 shadow-[0_-5px_15px_rgba(0,240,255,0.4)]' : 'bg-gradient-to-t from-purple-600/20 to-purple-500/60'">
            </div>
          </div>
        </div>
      </div>

      <!-- Service Health -->
      <div
        class="col-span-12 xl:col-span-4 glass-card rounded-2xl p-8 flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-8 transition-colors">
          Service Health</h2>
        <div class="space-y-4">
          <div v-for="s in healthServices" :key="s.name"
            class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <div class="flex items-center gap-3">
              <span
                class="material-symbols-outlined text-lg text-slate-400 dark:text-white/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
                style="font-variation-settings: 'FILL' 1;">{{ s.icon }}</span>
              <span class="text-sm font-medium text-slate-700 dark:text-white/80 transition-colors">{{ s.name }}</span>
            </div>
            <span class="text-[10px] font-bold flex items-center gap-1.5 transition-colors"
              :class="s.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' : s.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-white/20'">{{
                s.status }}</span>
          </div>
        </div>
      </div>

      <!-- Deployments Table -->
      <div
        class="col-span-12 glass-card rounded-2xl p-8 animate-in slide-in-from-bottom-4 duration-700 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] transition-colors">Active
            Deployments</h2>
          <button @click="openCreateModal"
            class="luminous-btn px-4 py-2 rounded-lg text-[10px] font-bold text-white dark:text-black uppercase tracking-widest shadow-lg dark:shadow-none">New
            Services</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="border-b border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-white/20 font-bold uppercase tracking-[0.2em] transition-colors">
                <th class="pb-4">Name</th>
                <th class="pb-4">Token limit</th>
                <th class="pb-4">Token used</th>
                <th class="pb-4 text-right">Status</th>
                <th class="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="service in partnerServices" :key="service.id">
                <td class="py-5">{{ service.name }}</td>
                <td class="py-5">{{ service.token_limit }}</td>
                <td class="py-5">{{ service.token_used }}</td>
                <td class="py-5 text-right">
                  <span>{{ service.status }}</span>
                </td>
                <td class="py-5 text-right">
                  <div class="flex justify-end gap-2">

                    <!-- EDIT -->
                    <button @click="openEditModal(service)" class="px-3 py-2.5 border border-slate-200 dark:border-[#424754] rounded-lg 
                            text-slate-400 dark:text-[#8c909f] 
                            hover:text-indigo-500 dark:hover:text-[#adc6ff] 
                            hover:border-indigo-200 dark:hover:border-[#adc6ff] 
                            hover:bg-indigo-50 dark:hover:bg-[#adc6ff]/5 
                            transition-all flex items-center justify-center">

                      <span class="material-symbols-outlined text-[20px]">
                        edit_square
                      </span>
                    </button>

                    <!-- DELETE -->
                    <button @click="handleDelete(service)" class="px-3 py-2.5 border border-slate-200 dark:border-[#424754] rounded-lg 
                            text-slate-400 dark:text-[#8c909f] 
                            hover:text-rose-500 dark:hover:text-[#ffb3ad] 
                            hover:border-rose-200 dark:hover:border-[#ffb3ad] 
                            hover:bg-rose-50 dark:hover:bg-[#ffb3ad]/5 
                            transition-all flex items-center justify-center">

                      <span class="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="showModal"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 dark:bg-[#09090B]/80 backdrop-blur-md p-6 transition-colors">

      <div
        class="bg-white dark:bg-[#1d2027] border border-slate-200 dark:border-[#424754] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300 transition-colors">

        <!-- HEADER -->
        <div
          class="px-8 py-6 border-b border-slate-100 dark:border-[#424754] flex justify-between items-center bg-slate-50 dark:bg-[#191b23] transition-colors">

          <h2 class="text-xl font-bold text-slate-900 dark:text-[#e1e2ec] transition-colors">
            Kích hoạt Dịch vụ AI
          </h2>

          <button @click="showModal = false"
            class="text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] transition-colors">

            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- BODY -->
        <div class="p-8 space-y-6">

          <!-- NAME -->
          <div class="flex flex-col gap-2">
            <label
              class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">
              Tên hiển thị (Partner thấy)
            </label>

            <input v-model="form.name" type="text"
              class="w-full bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-[#424754] rounded-xl px-4 py-3.5 text-slate-900 dark:text-[#e1e2ec] focus:border-indigo-500 dark:focus:border-[#adc6ff]/50 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-[#adc6ff]/50 outline-none transition-all text-sm font-medium shadow-inner transition-colors"
              placeholder="VD: ChatGPT-4o Premium" />
          </div>

          <!-- GRID -->
          <div class="grid grid-cols-2 gap-6">

            <!-- TOKEN -->
            <div class="flex flex-col gap-2">
              <label
                class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">
                Hạn mức Token
              </label>

              <input v-model.number="form.token_limit" type="number"
                class="w-full bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-[#424754] rounded-xl px-4 py-3.5 text-slate-900 dark:text-[#e1e2ec] focus:border-indigo-500 dark:focus:border-[#adc6ff]/50 outline-none transition-all text-sm font-data-mono transition-colors" />
            </div>

            <!-- AI TYPE -->
            <div class="flex flex-col gap-2">
              <label
                class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest transition-colors">
                Loại AI
              </label>

              <select v-model="form.service_id"
                class="w-full bg-slate-50 dark:bg-[#10131a] border border-slate-200 dark:border-[#424754] rounded-xl px-4 py-3.5 text-slate-900 dark:text-[#e1e2ec] focus:border-indigo-500 dark:focus:border-[#adc6ff]/50 outline-none cursor-pointer text-sm font-medium transition-colors">

                <option v-for="cat in aiCatalog" :key="cat.id" :value="cat.id" class="text-black">
                  {{ cat.name }}
                </option>

              </select>
            </div>

          </div>

          <!-- ACTIVE -->
          <div class="flex flex-col justify-end">

            <div @click="form.active = !form.active"
              class="flex items-center gap-3 bg-indigo-50 dark:bg-[#adc6ff]/5 p-3.5 rounded-xl border border-indigo-100 dark:border-[#adc6ff]/10 hover:bg-indigo-100 dark:hover:bg-[#adc6ff]/10 cursor-pointer transition-all group transition-colors">

              <div
                class="w-5 h-5 rounded border border-slate-200 dark:border-[#424754] flex items-center justify-center transition-all"
                :class="{ 'bg-indigo-600 dark:bg-[#adc6ff] border-indigo-600 dark:border-[#adc6ff]': form.active }">

                <span v-if="form.active"
                  class="material-symbols-outlined text-[16px] text-white dark:text-[#002e6a] font-bold">
                  check
                </span>
              </div>

              <span class="font-bold text-[11px] uppercase tracking-widest transition-colors"
                :class="form.active ? 'text-indigo-600 dark:text-[#adc6ff]' : 'text-slate-400 dark:text-[#8c909f]'">
                Đang hoạt động
              </span>

            </div>
          </div>

        </div>

        <!-- FOOTER -->
        <div class="px-8 py-6 bg-slate-50 dark:bg-[#191b23] flex gap-4 transition-colors">

          <button @click="showModal = false"
            class="flex-1 py-3.5 font-bold text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-200 dark:hover:bg-[#272a31] rounded-xl transition-all text-[11px] uppercase tracking-[0.2em] border border-transparent hover:border-slate-300 dark:hover:border-[#424754]">

            Hủy bỏ
          </button>

          <button @click="submitFormServices"
            class="flex-1 py-3.5 font-bold bg-indigo-600 dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl hover:bg-indigo-700 dark:hover:bg-[#4d8eff] shadow-lg shadow-indigo-200 dark:shadow-[#adc6ff]/10 transition-all text-[11px] uppercase tracking-[0.2em] active:scale-95">

            Kích hoạt
          </button>

        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const toast = useToast();

const showModal = ref(false);
const modalType = ref('create')
const currentId = ref(null)
const partnerServices = ref([])
const aiCatalog = ref([])

const form = ref({
  name: '',
  token_limit: 0,
  service_id: '',
  active: true,

})

const openCreateModal = () => {
  modalType.value = 'create' 
  form.value = {
    name: '',
    token_limit: 0,
    service_id: '',
    active: true,
  }
  currentId.value = null
  showModal.value = true

}

const openEditModal = (service) => {
  modalType.value = 'edit'
  currentId.value = service.id

  form.value = {
    name: service.name,
    token_limit: service.token_limit,
    service_id: service.services_id,
    active: service.status === 'active'
  }

  showModal.value = true
}

const fetchAllServices = async () => {
  try {
    const res = await $fetch('/api/partner/list-services')
    partnerServices.value = res.data || res || []
  } catch (err) {
    console.error('fetchServices error:', err)
  }
}

const fetchServices = async () => {
  try {
    const res = await $fetch('/api/partner/all-services')
    aiCatalog.value = res.data || res || []
  } catch (err) {
    console.error('fetchServices error:', err)
  }
}


const submitFormServices = async () => {
  try {
    if (modalType.value === 'edit') {
      await $fetch(`/api/partner/list-services/${currentId.value}`, {
        method: 'PATCH',
        body: form.value
      })
    } else {

      await $fetch('/api/partner/list-services', {
        method: 'POST',
        body: form.value
      })
    }

    toast.success(
      modalType.value === 'edit'
        ? 'Cập nhật service thành công'
        : 'Tạo service thành công'
    )

    showModal.value = false

    // reset form
    form.value = {
      name: '',
      token_limit: 0,
      service_id: '',
      active: true
    }

    // reload list
    await fetchAllServices()

  } catch (err) {
    console.error('Create service lỗi:', err)
    toast.error('Tạo/Cập nhật service thất bại')
  }
}

const handleDelete = async (service) => {
  if (!confirm('Bạn có chắc muốn xoá service này?')) return
  try {
    await $fetch(`/api/partner/list-services/${service.id}`,
      {
        method: 'DELETE'
      }
    )
    toast.success('Xóa service thành công')
    await fetchAllServices()
  } catch (err) {
    console.log(err)
    toast.error('Xóa service thất bại')
  }
}

const healthServices = [
  { name: 'Inference Core', status: '99.9%', color: 'cyan', icon: 'dns' },
  { name: 'API Gateway', status: '99.8%', color: 'purple', icon: 'api' },
  { name: 'Vector Store', status: 'Syncing', color: 'slate', icon: 'database' }
]

const defaultServices = [
  { name: 'prod-chat-us-east', type: 'Orbit Pro v2.4', latency: '42ms', status: 'active' },
  { name: 'dev-embedding-eu', type: 'Orbit Embed v1', latency: '18ms', status: 'active' }
]

onMounted(async () => {
  await fetchServices()
  await fetchAllServices()
})



</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.luminous-btn {
  background: linear-gradient(90deg, #00f0ff, #7701d0);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  transition: all 0.3s ease;
}

.shimmer-text {
  display: inline-block;
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 5s linear infinite;
  background-image: linear-gradient(90deg, #1e293b, #00f0ff, #1e293b);
  transition: color 0.5s;
}

.dark .shimmer-text {
  background-image: linear-gradient(90deg, #fff, #00f0ff, #fff);
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }

  100% {
    background-position: 200% center;
  }
}
</style>
