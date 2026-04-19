<template>
  <div class="min-h-screen bg-white text-gray-800 p-4 md:p-8 font-sans">
    <div class="max-w-[1400px] mx-auto">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Hệ thống Quản trị</h1>
          <p class="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Quản lý tài khoản người dùng</p>
        </div>
        <button 
          @click="isModalOpen = true" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 text-sm"
        >
          + Thêm User mới
        </button>
      </div>

      <div class="border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              <th class="p-5 w-32">ID</th>
              <th class="p-5">Họ và Tên</th>
              <th class="p-5">Mật khẩu</th>
              <th class="p-5">Phân quyền</th>
              <th class="p-5 text-center">Trạng thái</th>
              <th class="p-5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="user in users" :key="user.id" class="hover:bg-blue-50/20 transition-colors">
              <td class="p-5 text-gray-400 font-mono text-[11px]">#{{ user.id }}</td>
              
              <td class="p-5 font-bold text-gray-900 text-sm">{{ user.title }}</td>
              
              <td class="p-5">
                <span class="bg-gray-100 text-blue-700 px-3 py-1 rounded-md font-mono text-xs border border-gray-200/50">
                  {{ user.password }}
                </span>
              </td>
              
              <td class="p-5">
                <select 
                  :value="user.role" 
                  @change="e => updateRole(user.id, e.target.value)"
                  class="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-[11px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                  :class="user.role === 'admin' ? 'text-red-500' : (user.role === 'editor' ? 'text-blue-500' : 'text-gray-500')"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
              </td>

              <td class="p-5 text-center">
                <button 
                  @click="toggleUserStatus(user.id)"
                  class="px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter border transition-all"
                  :class="user.completed ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'"
                >
                  {{ user.completed ? 'HOẠT ĐỘNG' : 'KHÓA' }}
                </button>
              </td>

              <td class="p-5 text-right">
                <button 
                  @click="deleteUser(user.id)" 
                  class="text-gray-300 hover:text-rose-600 text-[11px] font-bold transition-colors uppercase tracking-widest"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" @click="isModalOpen = false"></div>
      <div class="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100">
        <h2 class="text-2xl font-black text-gray-900 mb-2">Thêm tài khoản</h2>
        <p class="text-gray-400 text-xs mb-8 uppercase tracking-widest font-medium">Nhập thông tin Prototype</p>
        
        <div class="space-y-5">
          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Họ và Tên</label>
            <input v-model="form.name" type="text" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all" placeholder="Nhập tên hiển thị...">
          </div>
          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Mật khẩu</label>
            <input v-model="form.password" type="text" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all" placeholder="Đặt mật khẩu...">
          </div>
          <div>
            <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">Quyền hạn</label>
            <select v-model="form.role" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none font-bold text-blue-600">
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 mt-10">
          <button @click="isModalOpen = false" class="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-2xl text-[11px] font-bold transition">HỦY</button>
          <button @click="handleSubmit" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[11px] font-bold transition shadow-lg shadow-blue-100">XÁC NHẬN</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserAdmin } from '~/src/composables/useUserAdmin.js'

const toast = useToast()

const { users, loading, fetchUsers, addUser, updateRole, toggleUserStatus, deleteUser } = useUserAdmin()

const isModalOpen = ref(false)
const form = reactive({ name: '', password: '', role: 'user' })

onMounted(() => fetchUsers())

const handleSubmit = () => {
  if (!form.name || !form.password) return toast.warning("Thiếu thông tin!")
  addUser({ ...form })
  form.name = ''; form.password = ''; form.role = 'user'; isModalOpen.value = false
}
</script>