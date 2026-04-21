import { ref } from 'vue'
import { auth } from '~/src/auth/firebase'
import { onAuthStateChanged } from 'firebase/auth'

let accessTokenCache = null;

export default function useUserAdmin() {
    const users = ref([]);
    const originalUsers = ref([]); 
    const currentUserDetail = ref(null);
    const loading = ref(false);
    const totalPages = ref(1);

    const waitForAuth = () => {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };

    const getValidToken = async () => {
        const user = await waitForAuth();
        if (!user) return null;
        if (accessTokenCache) return accessTokenCache;
        try {
            const idToken = await user.getIdToken(true);
            const res = await fetch(`${import.meta.env.VITE_GATEWAY_URL}/v1/api/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            });
            const data = await res.json();
            accessTokenCache = data.accessToken;
            return accessTokenCache;
        } catch (e) { return null; }
    };

    //  FILTER CLIENT + SUPPORT suspended
    const fetchUsers = async (params = { page: 1, limit: 50, search: '', status: '' }) => {
        loading.value = true;
        try {
            const token = await getValidToken();

            const res = await fetch(`${import.meta.env.VITE_GATEWAY_URL}/v1/api/admin/users?page=1&limit=1000`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const result = await res.json();

            originalUsers.value = result.data || [];

            let filtered = [...originalUsers.value];
            // SEARCH
            if (params.search?.trim()) {
                const keyword = params.search.toLowerCase();
                filtered = filtered.filter(u =>
                    (u.email && u.email.toLowerCase().includes(keyword)) ||
                    (u.fullName && u.fullName.toLowerCase().includes(keyword))
                );
            }

            // FILTER STATUS 
            if (params.status) {
                filtered = filtered.filter(u => {
                    if (params.status === 'suspended') {
                        return u.status === 'suspended'; 
                    }
                    return u.status === params.status;
                });
            }

            users.value = filtered;
            totalPages.value = 1;

        } catch (e) {
            console.error("Lỗi fetch:", e);
        } finally {
            loading.value = false;
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = await getValidToken();
            const res = await fetch(`${import.meta.env.VITE_GATEWAY_URL}/v1/api/admin/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                const idx = users.value.findIndex(u => u.id === id);
                if (idx !== -1) users.value[idx].status = status;
                return true;
            }
        } catch (e) { return false; }
    };

    const softDeleteUser = async (id) => {
        if (!confirm("Xác nhận xóa người dùng này?")) return false;
        try {
            const token = await getValidToken();
            const res = await fetch(`${import.meta.env.VITE_GATEWAY_URL}/v1/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const idx = users.value.findIndex(u => u.id === id);
                if (idx !== -1) users.value[idx].status = 'deleted';
                return true;
            }
        } catch (e) { return false; }
    };

    const fetchUserDetails = async (id) => {
        try {
            const token = await getValidToken();
            const res = await fetch(`${import.meta.env.VITE_GATEWAY_URL}/v1/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            currentUserDetail.value = await res.json();
        } catch (e) { console.error(e); }
    };

    return { users, currentUserDetail, loading, totalPages, fetchUsers, fetchUserDetails, updateStatus, softDeleteUser };
}