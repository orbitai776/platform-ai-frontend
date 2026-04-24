import { ref } from 'vue'
import { auth } from '~/src/auth/firebase'
import { onAuthStateChanged } from 'firebase/auth'

let accessTokenCache = null;
let lastUserUid = null;

const users = ref([]);
const originalUsers = ref([]); 
const currentUserDetail = ref(null);
const loading = ref(false);
const totalPages = ref(1);

export default function useUserAdmin() {

    const waitForAuth = () => {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };

    const getValidToken = async () => {
        if (process.server) return null;
        const user = await waitForAuth();
        if (!user) {
            accessTokenCache = null;
            lastUserUid = null;
            return null;
        }

        // If user changed, clear cache
        if (lastUserUid !== user.uid) {
            accessTokenCache = null;
            lastUserUid = user.uid;
        }

        if (accessTokenCache) return accessTokenCache;
        try {
            const idToken = await user.getIdToken(true);
            const gatewayUrl = import.meta.env?.VITE_GATEWAY_URL || process.env.VITE_GATEWAY_URL;
            const res = await fetch(`${gatewayUrl}/v1/api/auth`, {
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

            const gatewayUrl = import.meta.env?.VITE_GATEWAY_URL || process.env.VITE_GATEWAY_URL;
            const res = await fetch(`${gatewayUrl}/v1/api/admin/users?page=1&limit=1000&t=${Date.now()}`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            const result = await res.json();
            console.log("[DEBUG] Raw users from server:", result.data);
            
            // FETCH LOCAL BLACKLIST FOR SYNCING
            let blacklist = [];
            try {
                const blRes = await fetch('/api/admin/blacklist');
                if (blRes.ok) {
                    const blData = await blRes.json();
                    blacklist = blData.blacklist || [];
                }
            } catch (e) { console.error("Failed to fetch local blacklist", e); }

            // Map _id to id and normalize status
            const rawUsers = result.data || [];
            originalUsers.value = rawUsers.map(u => {
                const id = u.id || (u._id?.$oid ? u._id.$oid : u._id);
                let status = (u.status || 'active').toLowerCase();
                
                // IF USER IS IN LOCAL BLACKLIST MAP, OVERRIDE STATUS
                if (blacklist[id]) {
                    // Force the status to match our local intended state (suspended or deleted)
                    status = blacklist[id];
                }
                
                return { ...u, id, status };
            });

            let filtered = [...originalUsers.value];
            console.log(`[FILTER DEBUG] Total raw users: ${filtered.length}`);
            console.log(`[FILTER DEBUG] Current statuses in list:`, [...new Set(filtered.map(u => u.status))]);

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
                console.log(`[FILTER DEBUG] Filtering by status: "${params.status}"`);
                filtered = filtered.filter(u => u.status === params.status);
            } else {
                console.log(`[FILTER DEBUG] Default filter: Excluding "deleted"`);
                filtered = filtered.filter(u => u.status !== 'deleted');
            }

            console.log(`[FILTER DEBUG] Final users count: ${filtered.length}`);
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
            const gatewayUrl = import.meta.env?.VITE_GATEWAY_URL || process.env.VITE_GATEWAY_URL;
            const res = await fetch(`${gatewayUrl}/v1/api/admin/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status })
            });
            
            const result = await res.json();
            console.log(`[DEBUG] Server response for status update (${status}):`, {
                ok: res.ok,
                status: res.status,
                data: result
            });
            
            if (res.ok) {
                // SYNC LOCAL BLACKLIST
                try {
                    const syncRes = await fetch('/api/admin/blacklist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            uid: id, 
                            action: status === 'deleted' ? 'delete' : (status === 'suspended' ? 'suspend' : 'activate') 
                        })
                    });
                    console.log("[DEBUG] Blacklist sync status:", syncRes.status);
                } catch (err) { console.error('Blacklist sync failed', err); }

                // Update originalUsers to keep the master list in sync
                originalUsers.value = originalUsers.value.map(u => {
                    if (u.id === id) return { ...u, status: status.toLowerCase() };
                    return u;
                });

                // RE-APPLY THE EXACT SAME FILTER LOGIC LOCALLY
                // This guarantees the user disappears/appears correctly without waiting for a server refresh
                const isTrashMode = (users.value.length > 0 && users.value.every(u => u.status === 'deleted'));
                
                let filtered = [...originalUsers.value];
                if (isTrashMode || status === 'deleted') {
                    // Filter for trash: only show deleted
                    users.value = filtered.filter(u => u.status === 'deleted');
                } else {
                    // Normal mode: exclude deleted
                    users.value = filtered.filter(u => u.status !== 'deleted');
                }
                
                return true;
            } else {
                console.error(`[DEBUG] Status update failed for ID: ${id}. Server returned:`, result);
                alert(`Không thể cập nhật: ${result.message || 'Lỗi không xác định'}`);
                return false;
            }
        } catch (e) { 
            return false; 
        }
    };

    const softDeleteUser = async (id) => {
        if (!confirm("Xác nhận chuyển người dùng này vào thùng rác?")) return false;
        return await updateStatus(id, 'deleted');
    };

    const restoreUser = async (id) => {
        if (!confirm("Xác nhận khôi phục người dùng này?")) return false;
        console.log(`[DEBUG] Restoring user: ${id}`);
        const ok = await updateStatus(id, 'active');
        if (ok) console.log(`[DEBUG] Restore successful for ${id}`);
        return ok;
    };

    const hardDeleteUser = async (id) => {
        if (!confirm("CẢNH BÁO: Xóa vĩnh viễn người dùng này? Thao tác này không thể hoàn tác và bạn sẽ không thể dùng email này để đăng ký lại ngay lập tức (tùy thuộc vào Gateway).")) return false;
        try {
            const token = await getValidToken();
            const gatewayUrl = import.meta.env?.VITE_GATEWAY_URL || process.env.VITE_GATEWAY_URL;
            const res = await fetch(`${gatewayUrl}/v1/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(`[DEBUG] Hard delete response for ${id}:`, res.status);

            if (res.ok) {
                // Ensure they are blocked forever locally
                try {
                    await fetch('/api/admin/blacklist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: id, action: 'delete' })
                    });
                    console.log(`[DEBUG] User ${id} permanently blacklisted locally`);
                } catch (err) { console.warn('Blacklist sync failed', err); }

                // Remove from local lists entirely
                users.value = users.value.filter(u => u.id !== id);
                originalUsers.value = originalUsers.value.filter(u => u.id !== id);
                return true;
            } else {
                const errData = await res.json();
                console.error("[DEBUG] Hard delete error data:", errData);
                return false;
            }
        } catch (e) { 
            console.error("[DEBUG] Hard delete catch error:", e);
            return false; 
        }
    };

    const fetchUserDetails = async (id) => {
        try {
            const token = await getValidToken();
            const gatewayUrl = import.meta.env?.VITE_GATEWAY_URL || process.env.VITE_GATEWAY_URL;
            const res = await fetch(`${gatewayUrl}/v1/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            currentUserDetail.value = await res.json();
        } catch (e) { console.error(e); }
    };

    return { users, currentUserDetail, loading, totalPages, fetchUsers, fetchUserDetails, updateStatus, softDeleteUser, restoreUser, hardDeleteUser };
}