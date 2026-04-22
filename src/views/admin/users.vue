<template>
  <div class="p-6 md:p-10 bg-slate-50 min-h-screen font-sans text-slate-900">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 class="text-4xl font-black tracking-tighter text-slate-900">Users</h1>
          <p class="text-[11px] font-bold text-blue-600 uppercase tracking-[0.3em] mt-1">Users Management</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select v-model="filterStatus"
            class="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 ring-blue-500/10 transition-all">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option> 
            <option value="deleted">Deleted</option>
          </select>

          <div class="relative flex-1 md:flex-none">
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Search by email or name..." 
              class="w-full md:w-80 bg-white border border-slate-200 rounded-2xl px-6 py-3.5 text-sm outline-none focus:border-blue-500 transition-all shadow-sm font-medium"
            />
          </div>
          
          <button @click="handleSearch" 
            class="bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-900/10">
            SEARCH
          </button>
        </div>
      </div>

      <div class="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <th class="p-8">User Profile</th>
              <th class="p-8 text-center">Status</th>
              <th class="p-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading">
              <td colspan="3" class="p-32 text-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="w-12 h-12 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronizing Database...</span>
                </div>
              </td>
            </tr>

            <tr v-for="user in users" :key="user.id" 
                class="group hover:bg-slate-50/80 transition-all"
                :class="{'opacity-30 grayscale': user.status === 'deleted'}">
              <td class="p-8">
                <div class="flex items-center gap-6">
                  <div class="w-14 h-14 rounded-3xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                    {{ user.fullName ? user.fullName.charAt(0).toUpperCase() : '?' }}
                  </div>
                  <div>
                    <div class="font-black text-slate-900 text-base group-hover:text-blue-600 transition">{{ user.fullName || 'Unnamed User' }}</div>
                    <div class="text-[12px] text-slate-400 font-bold mt-1 tracking-tight">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="p-8 text-center">
                <span class="px-5 py-2 rounded-xl text-[10px] font-black uppercase border tracking-widest transition-all"
                      :class="getStatusStyle(user.status)">
                  {{ user.status || 'active' }}
                </span>
              </td>
              <td class="p-8 text-right space-x-2">
                <button @click="openDetail(user.id)" class="text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all border border-slate-100">DETAILS</button>
                
                <button v-if="user.status === 'active'" @click="handleStatus(user.id, 'suspended')" class="text-amber-600 hover:bg-amber-50 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all">SUSPEND</button>
                <button v-if="user.status === 'suspended'" @click="handleStatus(user.id, 'active')" class="text-emerald-600 hover:bg-emerald-50 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all">ACTIVATE</button>
                
                <button v-if="user.status !== 'deleted'" @click="handleDelete(user.id)" class="text-rose-500 hover:bg-rose-50 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all">DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!loading && users.length === 0" class="p-32 text-center text-slate-300 font-black uppercase text-xs tracking-widest">
          No users found matching your criteria
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/70 backdrop-blur-md">
      <div class="bg-white w-full max-w-2xl rounded-[3.5rem] p-16 shadow-2xl relative border border-white/20 animate-in fade-in zoom-in duration-300">
        <div v-if="currentUserDetail" class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-center text-4xl font-black mb-6">
            {{ currentUserDetail.fullName?.charAt(0) }}
          </div>
          <h2 class="text-3xl font-black text-slate-900 mb-1">{{ currentUserDetail.fullName }}</h2>
          <p class="text-slate-400 font-bold mb-10">{{ currentUserDetail.email }}</p>

          <div class="grid grid-cols-2 gap-4 w-full mb-12">
            <div class="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Sessions</span>
              <span class="text-4xl font-black text-slate-900">{{ currentUserDetail.activeSessions?.length || 0 }}</span>
            </div>
            <div class="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">User Status</span>
              <span class="text-xl font-black text-blue-600 uppercase">{{ currentUserDetail.status }}</span>
            </div>
          </div>

          <button @click="isModalOpen = false" class="w-full py-6 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black text-xs tracking-[0.3em] transition-all active:scale-95">
            DISMISS INFORMATION
          </button>
        </div>
        <div v-else class="py-20 text-center font-black text-slate-200">FETCHING DATA...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import useUserAdmin from '~/src/composables/useUserAdmin'

const { users, currentUserDetail, loading, fetchUsers, fetchUserDetails, updateStatus, softDeleteUser } = useUserAdmin()

const searchQuery = ref('')
const filterStatus = ref('')
const isModalOpen = ref(false)

onMounted(() => fetchUsers())

// AUTO SEARCH
watch([searchQuery, filterStatus], () => {
  fetchUsers({
    page: 1,
    limit: 50,
    search: searchQuery.value,
    status: filterStatus.value
  })
})

const handleSearch = () => {
  fetchUsers({
    page: 1,
    limit: 50,
    search: searchQuery.value,
    status: filterStatus.value
  })
}

const openDetail = async (id) => {
  isModalOpen.value = true
  currentUserDetail.value = null
  await fetchUserDetails(id)
}

const handleStatus = async (id, status) => {
  const ok = await updateStatus(id, status)
  if (!ok) alert("Failed to update status")
}

const handleDelete = async (id) => {
  const ok = await softDeleteUser(id)
  if (!ok) alert("Error deleting user")
}

const getStatusStyle = (status) => {
  if (status === 'active') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (status === 'suspended') return 'bg-amber-50 text-amber-600 border-amber-100'
  return 'bg-slate-100 text-slate-400 border-slate-200'
}
</script>