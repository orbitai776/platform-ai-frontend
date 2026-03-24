import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/profile.vue';

import Home from '../views/home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
  