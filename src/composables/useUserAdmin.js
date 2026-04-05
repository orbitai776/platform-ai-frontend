import { ref } from 'vue'

export const useUserAdmin = () => {
  const users = useState('admin_users', () => [])
  const loading = ref(false)

  const fetchUsers = async () => {
    if (users.value.length > 0) return
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // Đổ data mẫu theo đúng yêu cầu của bạn
    users.value = [
      { id: '5abc12345', title: "Admin", password: "admin_pass_99", role: "admin", completed: true },
      { id: '1', title: "User 1", password: "user1_123", role: "user", completed: true },
      { id: '2', title: "User 2", password: "user2_456", role: "editor", completed: false },
      { id: '3', title: "User 3", password: "user3_789", role: "user", completed: false },
      { id: '4', title: "User 4", password: "user4_000", role: "editor", completed: true },
      { id: '5', title: "User 5", password: "user5_999", role: "user", completed: true },
      { id: '6', title: "User 6", password: "user6_888", role: "user", completed: true }
    ]
    loading.value = false
  }

  const addUser = (userData) => {
    // Tạo ID ngẫu nhiên cho giống mẫu của bạn (ví dụ #5abc...)
    const randomId = Math.random().toString(36).substring(2, 9)
    users.value.unshift({
      id: randomId,
      title: userData.name,
      password: userData.password,
      role: userData.role,
      completed: true
    })
  }

  const updateRole = (id, newRole) => {
    const user = users.value.find(u => u.id === id)
    if (user) user.role = newRole
  }

  const toggleUserStatus = (id) => {
    const user = users.value.find(u => u.id === id)
    if (user) user.completed = !user.completed
  }

  const deleteUser = (id) => {
    users.value = users.value.filter(u => u.id !== id)
  }

  return { users, loading, fetchUsers, addUser, updateRole, toggleUserStatus, deleteUser }
}