import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/profile.vue';
import Home from '../views/home.vue';
import News from '../views/news.vue';

// Example
import AdminLayout from '../layout/admin/layoutAdmin.vue';
import HomeAdmin from '../views/admin/HomeAdmin.vue';

// THÊM DÒNG NÀY: Import trang quản lý User từ thư mục views/admin
import UserManagement from '../views/admin/users.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
    
    // Example
    // THÊM ĐOẠN NÀY: Khai báo đường dẫn cho trang quản lý User
    { 
        path: '/admin/users', 
        name: 'AdminUsers', 
        component: UserManagement 
    },

    // Giữ nguyên HomeAdmin nếu bạn cần dùng link /admin
    { 
        path: '/admin', 
        name: 'HomeAdmin', 
        component: HomeAdmin 
    },
];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;