import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/profile.vue';

import Home from '../views/home.vue';


//example
import AdminLayout from '../layout/admin/AdminExampleLayout.vue';
import HomeAdmin from '../views/admin/HomeAdminExample.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
    
        //example
    {path: '/admin', component: AdminLayout, children: [
        { path: '', name: 'AdminHome', component: HomeAdmin },
    ]},
];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
  