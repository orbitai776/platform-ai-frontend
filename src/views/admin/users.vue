<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#09090B] text-slate-900 dark:text-[#e1e2ec] font-body-base antialiased p-6 md:p-10 transition-colors duration-500">
    <div class="max-w-[1440px] mx-auto">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
        <div class="animate-in fade-in slide-in-from-left duration-700">
          <h1 class="font-display-lg text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-[#e1e2ec] mb-2 transition-colors flex items-center gap-3">
            Global User Management
            <span v-if="!loading" class="text-lg font-normal bg-slate-100 dark:bg-[#1d2027] px-3 py-1 rounded-full text-slate-500 dark:text-[#8c909f]">
              {{ users.length }}
            </span>
          </h1>
          <p class="font-body-base text-sm text-slate-500 dark:text-[#c2c6d6] flex items-center gap-2 transition-colors">
            <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#4edea3] shadow-[0_0_8px_rgba(16,185,129,0.4)] dark:shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
            Manage identity, access, and organizational links across the orbital network.
          </p>
        </div>
        
        <div class="flex gap-3 animate-in fade-in slide-in-from-right duration-700">
          <button @click="showTrash = !showTrash" 
            :class="[
              'px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all active:scale-95 text-sm font-medium border shadow-sm',
              showTrash 
                ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50' 
                : 'bg-white dark:bg-[#1d2027]/40 text-slate-700 dark:text-[#c2c6d6] border-slate-200 dark:border-[#27272A] hover:bg-slate-50 dark:hover:bg-[#32353c]'
            ]">
            <span class="material-symbols-outlined text-[18px]">{{ showTrash ? 'person' : 'delete' }}</span>
            {{ showTrash ? 'Back to Users' : 'Trash Bin' }}
          </button>
          <button class="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-[#32353c] transition-all active:scale-95 text-sm font-medium border border-slate-200 dark:border-[#27272A] shadow-sm">
            <span class="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
          <button class="bg-indigo-600 dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-indigo-700 dark:hover:bg-[#4d8eff] transition-all active:scale-95 font-bold text-sm shadow-lg dark:shadow-[0_0_20px_rgba(173,198,255,0.3)]">
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            Invite User
          </button>
        </div>
      </div>

      <!-- Filters & Search Bar -->
      <div class="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center border border-slate-200 dark:border-[#27272A] animate-in fade-in slide-in-from-bottom duration-700 delay-100 shadow-sm transition-colors">
        <div class="w-full md:w-1/3 relative group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8c909f] group-focus-within:text-indigo-600 dark:group-focus-within:text-[#adc6ff] transition-colors" style="font-size: 20px;">search</span>
          <input 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            class="w-full bg-slate-50 dark:bg-[#0b0e15] border border-slate-200 dark:border-[#424754] rounded-lg pl-10 pr-4 py-2.5 text-slate-900 dark:text-[#e1e2ec] focus:outline-none focus:border-indigo-500 dark:focus:border-[#adc6ff] focus:ring-1 focus:ring-indigo-500 dark:focus:ring-[#adc6ff] transition-all font-body-sm text-sm placeholder:text-slate-400 dark:placeholder:text-[#424754]" 
            placeholder="Search by email or name..." 
            type="text"
          />
        </div>
        
        <div class="w-full md:w-auto flex gap-3 flex-wrap">
          <div class="relative min-w-[140px]">
            <select v-model="filterStatus"
              class="w-full bg-slate-50 dark:bg-[#0b0e15] border border-slate-200 dark:border-[#424754] rounded-lg px-4 py-2.5 text-slate-600 dark:text-[#c2c6d6] focus:outline-none focus:border-indigo-500 dark:focus:border-[#adc6ff] appearance-none font-body-sm text-sm cursor-pointer pr-10 transition-colors">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option> 
              <option value="deleted">Deleted</option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-[#8c909f] text-[18px]">expand_more</span>
          </div>
          
          <button @click="handleSearch" 
            class="bg-slate-800 dark:bg-[#32353c] hover:bg-slate-900 dark:hover:bg-[#424754] text-white dark:text-[#e1e2ec] px-6 py-2.5 rounded-lg font-bold text-xs tracking-widest transition-all active:scale-95 border border-slate-700 dark:border-[#424754] uppercase shadow-sm">
            Execute Query
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white dark:bg-[#1d2027]/40 backdrop-blur-xl rounded-xl overflow-hidden border border-slate-200 dark:border-[#27272A] animate-in fade-in slide-in-from-bottom duration-700 delay-200 shadow-xl transition-colors">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 dark:border-[#27272A] bg-slate-50/50 dark:bg-[#1d2027]/50 transition-colors">
                <th class="px-6 py-5 font-bold text-[11px] uppercase tracking-widest text-slate-400 dark:text-[#8c909f]">User Profile</th>
                <th class="px-6 py-5 font-bold text-[11px] uppercase tracking-widest text-slate-400 dark:text-[#8c909f] text-center">Status</th>
                <th class="px-6 py-5 font-bold text-[11px] uppercase tracking-widest text-slate-400 dark:text-[#8c909f] text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="font-body-sm text-sm text-slate-900 dark:text-[#e1e2ec]">
              <tr v-if="loading">
                <td colspan="3" class="p-32 text-center">
                  <div class="flex flex-col items-center gap-6">
                    <div class="relative w-16 h-16">
                      <div class="absolute inset-0 border-4 border-indigo-500/10 dark:border-[#adc6ff]/20 rounded-full"></div>
                      <div class="absolute inset-0 border-4 border-indigo-600 dark:border-[#adc6ff] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-[0.3em] animate-pulse">Synchronizing Orbital Database...</span>
                  </div>
                </td>
              </tr>

              <tr v-for="user in paginatedUsers" :key="`${user.id}-${user.status}`" 
                  class="border-b border-slate-50 dark:border-[#424754]/30 hover:bg-slate-50/80 dark:hover:bg-[#272a31]/30 transition-colors group relative"
                  :class="{'opacity-40 grayscale': user.status === 'deleted'}">
                <td class="px-6 py-5">
                  <div class="flex items-center gap-5">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#272a31] border border-slate-200 dark:border-[#424754] flex items-center justify-center text-indigo-600 dark:text-[#adc6ff] font-bold text-xl overflow-hidden group-hover:border-indigo-500 dark:group-hover:border-[#adc6ff] transition-colors shadow-sm">
                        {{ user.fullName ? user.fullName.charAt(0).toUpperCase() : '?' }}
                      </div>
                      <div v-if="user.status === 'active'" class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 dark:bg-[#4edea3] border-2 border-white dark:border-[#09090B] rounded-full shadow-sm dark:shadow-[0_0_8px_rgba(78,222,163,0.8)]"></div>
                    </div>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-[#e1e2ec] group-hover:text-indigo-600 dark:group-hover:text-[#adc6ff] transition-colors flex items-center gap-2">
                        {{ user.fullName || 'Unnamed User' }}
                        <span v-if="user.id === 'current'" class="text-[9px] bg-indigo-50 dark:bg-[#adc6ff]/10 text-indigo-600 dark:text-[#adc6ff] px-1.5 py-0.5 rounded border border-indigo-100 dark:border-[#adc6ff]/20 uppercase">You</span>
                      </div>
                      <div class="text-[12px] text-slate-400 dark:text-[#8c909f] font-data-mono mt-0.5">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5 text-center">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all"
                        :class="getStatusStyle(user.status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(user.status)"></span>
                    {{ user.status || 'active' }}
                  </span>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <template v-if="!showTrash">
                      <button @click="openDetail(user.id)" 
                        class="p-2 rounded-lg bg-slate-50 dark:bg-[#272a31] text-slate-400 dark:text-[#c2c6d6] hover:text-indigo-600 dark:hover:text-[#adc6ff] border border-slate-200 dark:border-[#424754] hover:border-indigo-500 dark:hover:border-[#adc6ff] transition-all" title="Details">
                        <span class="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      
                      <button v-if="user.status === 'active'" @click="handleStatus(user.id, 'suspended')" 
                        class="p-2 rounded-lg bg-slate-50 dark:bg-[#272a31] text-slate-400 dark:text-[#c2c6d6] hover:text-rose-500 dark:hover:text-[#ffb3ad] border border-slate-200 dark:border-[#424754] hover:border-rose-500 dark:hover:border-[#ffb3ad] transition-all" title="Suspend">
                        <span class="material-symbols-outlined text-[20px]">block</span>
                      </button>
                      <button v-if="user.status === 'suspended'" @click="handleStatus(user.id, 'active')" 
                        class="p-2 rounded-lg bg-slate-50 dark:bg-[#272a31] text-slate-400 dark:text-[#c2c6d6] hover:text-emerald-500 dark:hover:text-[#4edea3] border border-slate-200 dark:border-[#424754] hover:border-emerald-500 dark:hover:border-[#4edea3] transition-all" title="Activate">
                        <span class="material-symbols-outlined text-[20px]">check_circle</span>
                      </button>
                      
                      <button @click="handleSoftDelete(user.id)" 
                        class="p-2 rounded-lg bg-slate-50 dark:bg-[#272a31] text-rose-300 dark:text-[#ffb3ad]/70 hover:text-rose-600 dark:hover:text-[#ffb3ad] border border-slate-200 dark:border-[#424754] hover:border-rose-500 dark:hover:border-[#ffb3ad] transition-all" title="Move to Trash">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </template>
                    <template v-else>
                      <button @click="handleRestore(user.id)" 
                        class="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 transition-all" title="Restore User">
                        <span class="material-symbols-outlined text-[20px]">settings_backup_restore</span>
                      </button>
                      <button @click="handleHardDelete(user.id)" 
                        class="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 border border-rose-200 dark:border-rose-900/50 transition-all" title="Delete Permanently">
                        <span class="material-symbols-outlined text-[20px]">delete_forever</span>
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div v-if="!loading && users.length > 0" class="px-6 py-4 border-t border-slate-100 dark:border-[#27272A] bg-slate-50/50 dark:bg-[#1d2027]/30 flex items-center justify-between transition-colors">
          <div class="text-slate-400 dark:text-[#8c909f] text-[12px] font-medium transition-colors">
            Trang <span class="text-indigo-600 dark:text-[#adc6ff]">{{ currentPage }}</span> / {{ totalPages }} — Hiển thị <span class="text-slate-900 dark:text-[#e1e2ec]">{{ paginatedUsers.length }}</span> người dùng
          </div>
          <div class="flex gap-2">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="p-1.5 rounded-md text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-100 dark:hover:bg-[#32353c] transition-all disabled:opacity-20 disabled:cursor-not-allowed border border-transparent hover:border-slate-200 dark:hover:border-[#424754]">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="p-1.5 rounded-md text-slate-400 dark:text-[#8c909f] hover:text-slate-900 dark:hover:text-[#e1e2ec] hover:bg-slate-100 dark:hover:bg-[#32353c] transition-all disabled:opacity-20 disabled:cursor-not-allowed border border-transparent hover:border-slate-200 dark:hover:border-[#424754]">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div v-if="!loading && users.length === 0" class="p-32 text-center">
          <div class="material-symbols-outlined text-6xl text-slate-200 dark:text-[#272a31] mb-4">database_off</div>
          <p class="text-slate-400 dark:text-[#8c909f] font-bold uppercase text-xs tracking-[0.3em] transition-colors">No entities detected in the current sector</p>
        </div>
      </div>
    </div>

    <!-- User Detail Modal (Glassmorphic) -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 dark:bg-[#09090B]/80 backdrop-blur-md transition-all">
      <div class="bg-white dark:bg-[#1d2027] w-full max-w-xl rounded-2xl p-10 border border-slate-200 dark:border-[#424754] shadow-2xl animate-in fade-in zoom-in duration-300 transition-colors">
        <div v-if="currentUserDetail" class="flex flex-col items-center">
          <div class="relative mb-8">
            <div class="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-[#1d2027] border-2 border-slate-200 dark:border-[#424754] text-indigo-600 dark:text-[#adc6ff] flex items-center justify-center text-4xl font-bold shadow-sm dark:shadow-[0_0_30px_rgba(173,198,255,0.1)] transition-colors">
              {{ currentUserDetail.fullName?.charAt(0) }}
            </div>
            <div class="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-50 dark:bg-[#4edea3]/10 text-emerald-600 dark:text-[#4edea3] text-[10px] font-bold border border-emerald-200 dark:border-[#4edea3]/30 rounded-full uppercase tracking-tighter transition-all">
              {{ currentUserDetail.status }}
            </div>
          </div>
          
          <h2 class="text-2xl font-bold text-slate-900 dark:text-[#e1e2ec] mb-1 transition-colors">{{ currentUserDetail.fullName }}</h2>
          <p class="text-slate-500 dark:text-[#8c909f] font-data-mono text-sm mb-10 transition-colors">{{ currentUserDetail.email }}</p>

          <div class="grid grid-cols-2 gap-4 w-full mb-10">
            <div class="bg-slate-50 dark:bg-[#0b0e15] p-6 rounded-xl border border-slate-100 dark:border-[#27272A] flex flex-col items-center group hover:border-indigo-500 dark:hover:border-[#adc6ff] transition-colors shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest mb-2 transition-colors">Active Sessions</span>
              <span class="text-3xl font-bold text-slate-900 dark:text-[#e1e2ec] group-hover:text-indigo-600 dark:group-hover:text-[#adc6ff] transition-colors">{{ currentUserDetail.activeSessions?.length || 0 }}</span>
            </div>
            <div class="bg-slate-50 dark:bg-[#0b0e15] p-6 rounded-xl border border-slate-100 dark:border-[#27272A] flex flex-col items-center group hover:border-rose-500 dark:hover:border-[#ffb3ad] transition-colors shadow-sm">
              <span class="text-[10px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-widest mb-2 transition-colors">Security Clearance</span>
              <span class="text-lg font-bold text-slate-900 dark:text-[#e1e2ec] group-hover:text-rose-600 dark:group-hover:text-[#ffb3ad] transition-colors uppercase">{{ currentUserDetail.role || 'Member' }}</span>
            </div>
          </div>

          <div class="w-full space-y-3">
            <button @click="isModalOpen = false" class="w-full py-4 bg-slate-800 dark:bg-[#32353c] hover:bg-slate-900 dark:hover:bg-[#424754] text-white dark:text-[#e1e2ec] rounded-lg font-bold text-xs tracking-[0.2em] transition-all active:scale-95 border border-slate-700 dark:border-[#424754] uppercase shadow-lg">
              Close Terminal
            </button>
          </div>
        </div>
        <div v-else class="py-20 text-center">
          <div class="w-10 h-10 border-4 border-indigo-600 dark:border-[#adc6ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <span class="text-[11px] font-bold text-slate-400 dark:text-[#8c909f] uppercase tracking-[0.2em] animate-pulse transition-colors">Interrogating Node...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-data-mono {
  font-family: 'JetBrains Mono', monospace;
}

.font-display-lg {
  font-family: 'Space Grotesk', sans-serif;
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
  background: #cbd5e1;
  border-radius: 3px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #272a31;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
.dark ::-webkit-scrollbar-thumb:hover {
  background: #424754;
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-left {
  from { transform: translateX(-20px); }
  to { transform: translateX(0); }
}

@keyframes slide-in-from-right {
  from { transform: translateX(20px); }
  to { transform: translateX(0); }
}

@keyframes slide-in-from-bottom {
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
}

@keyframes zoom-in {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}

.animate-in {
  animation-fill-mode: both;
}

.fade-in { animation-name: fade-in; }
.slide-in-from-left { animation-name: slide-in-from-left; }
.slide-in-from-right { animation-name: slide-in-from-right; }
.slide-in-from-bottom { animation-name: slide-in-from-bottom; }
.zoom-in { animation-name: zoom-in; }

.duration-700 { animation-duration: 700ms; }
.duration-300 { animation-duration: 300ms; }
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
</style>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import useUserAdmin from '~/src/composables/useUserAdmin'

const { 
  users, 
  currentUserDetail, 
  loading, 
  fetchUsers, 
  fetchUserDetails, 
  updateStatus, 
  softDeleteUser, 
  restoreUser, 
  hardDeleteUser 
} = useUserAdmin()

const showTrash = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const isModalOpen = ref(false)

// Pagination State
const currentPage = ref(1)
const itemsPerPage = 100

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage) || 1)

const paginatedUsers = computed(() => {
  console.log(`[UI DEBUG] paginatedUsers updated. Total in users.value: ${users.value.length}`);
  const start = (currentPage.value - 1) * itemsPerPage
  return users.value.slice(start, start + itemsPerPage)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const refresh = () => {
  fetchUsers({
    page: 1,
    limit: 1000,
    search: searchQuery.value,
    status: filterStatus.value
  })
  currentPage.value = 1
}

// Update status filter based on Trash toggle
watch(showTrash, (newVal) => {
  filterStatus.value = newVal ? 'deleted' : ''
  refresh()
})

onMounted(() => refresh())

// Reset to first page when searching or filtering
watch([searchQuery, filterStatus], () => {
  if (!showTrash.value) { // Only auto-refresh if not in trash mode or manually triggered
     refresh()
  }
})

const handleSearch = () => {
  currentPage.value = 1
  refresh()
}

const openDetail = async (id) => {
  isModalOpen.value = true
  currentUserDetail.value = null
  await fetchUserDetails(id)
}

const handleStatus = async (id, status) => {
  const ok = await updateStatus(id, status)
  if (!ok) alert("Failed to update status")
  // refresh() is NOT needed because useUserAdmin updates local state immediately
}

const handleSoftDelete = async (id) => {
  const ok = await softDeleteUser(id)
  if (!ok) alert("Error deleting user")
  // refresh() is NOT needed
}

const handleRestore = async (id) => {
  await restoreUser(id)
  refresh()
}

const handleHardDelete = async (id) => {
  await hardDeleteUser(id)
  refresh()
}

const getStatusStyle = (status) => {
  if (status === 'active') return 'bg-emerald-50 dark:bg-[#4edea3]/10 text-emerald-600 dark:text-[#4edea3] border-emerald-100 dark:border-[#4edea3]/20 shadow-sm dark:shadow-[0_0_10px_rgba(78,222,163,0.1)]'
  if (status === 'suspended') return 'bg-rose-50 dark:bg-[#ffb3ad]/10 text-rose-600 dark:text-[#ffb3ad] border-rose-100 dark:border-[#ffb3ad]/20'
  return 'bg-slate-100 dark:bg-[#272a31] text-slate-500 dark:text-[#8c909f] border-slate-200 dark:border-[#424754]'
}

const getStatusDotClass = (status) => {
  if (status === 'active') return 'bg-emerald-500 dark:bg-[#4edea3] shadow-sm dark:shadow-[0_0_8px_rgba(78,222,163,0.8)]'
  if (status === 'suspended') return 'bg-rose-500 dark:bg-[#ffb3ad] shadow-sm dark:shadow-[0_0_8px_rgba(255,179,173,0.8)]'
  return 'bg-slate-400 dark:bg-[#8c909f]'
}
</script>