import { ref, computed } from 'vue'
import { useAuthToken } from './useAuthToken'

export function useDashboard() {
    const loading = ref(false)

    const users = ref({})
    const partners = ref({})
    const services = ref({})
    const topServices = ref([])

    const { getAccessToken } = useAuthToken()

    const fetchDashboard = async (retry = true) => {
        if (process.server) return;

        loading.value = true;

        try {
            let accessToken = await getAccessToken()

            const res = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/v1/api/admin/dashboard/services`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );


            if (res.status === 401 && retry) {
                accessToken = await getAccessToken(true)
                return await fetchDashboard(false)
            }

            if (!res.ok) {
                throw new Error("Fetch dashboard failed")
            }

            const data = await res.json()

            const payload = data.data || {}

            users.value = payload.summary?.users || {}
            partners.value = payload.summary?.partners || {}
            services.value = payload.summary?.services || {}
            topServices.value = payload.topServices || []
            
        } catch (err) {
            console.error('Dashboard error:', err)
        } finally {
            loading.value = false
        }
    }


    const statCards = computed(() => [
        {
            label: 'Users',
            value: users.value.total || 0,
            sub: `${users.value.active || 0} active`
        },
        {
            label: 'Partners',
            value: partners.value.total || 0,
            sub: `${partners.value.active || 0} active`
        },
        {
            label: 'Services',
            value: services.value.deployedTotal || 0,
            sub: `${services.value.deployedActive || 0} active`
        },
        {
            label: 'Tokens',
            value: services.value.totalTokenUsed || 0,
            sub: `30d: ${services.value.recent30dTokens || 0}`
        },
        {
            label: 'Partners Using',
            value: services.value.partnerUsingCount || 0,
            sub: 'Active usage'
        }
    ])


    const tableData = computed(() => {
        return topServices.value.map(s => ({
            name: s.name,
            type: s.type,
            partners: s.partnerCount,
            deployed: s.deployedCount,
            tokens: s.tokenUsed
        }))
    })

    return {
        loading,
        fetchDashboard,
        statCards,
        tableData,
        topServices
    }
}