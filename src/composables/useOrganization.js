import { ref } from 'vue'
import { useAuthToken } from './useAuthToken'

export function useOrganization() {
    const loading = ref(false)
    const organizations = ref([])
    const pagination = ref({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    })

    const { getAccessToken } = useAuthToken()

    const fetchOrganizations = async (_, retry = true) => {
        if (process.server) return

        loading.value = true

        try {
            let accessToken = await getAccessToken()

            const res = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/v1/api/admin/organizations`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            if (res.status === 401 && retry) {
                accessToken = await getAccessToken(true)
                return await fetchOrganizations({}, false)
            }

            if (!res.ok) {
                throw new Error("Fetch organizations failed")
            }

            const data = await res.json()

            organizations.value = data.data || []

            
            pagination.value.total = organizations.value.length

        } catch (err) {
            console.error('Organization error:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        organizations,
        pagination,
        fetchOrganizations
    }
}