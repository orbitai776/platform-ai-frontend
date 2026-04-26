import { ref } from 'vue'
import { useAuthToken } from '~/src/composables/useAuthToken'

export default function useCatalog() {
    const catalog = ref([])
    const loading = ref(false)

    const { getAccessToken } = useAuthToken()


    const fetchCatalog = async (retry = true) => {
        if (process.server) return

        loading.value = true

        try {
            const accessToken = await getAccessToken()
           
            if (!accessToken) {
                throw new Error("No access token")
            }

            const res = await fetch(
                '/api/admin/services',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            if (res.status === 401 && retry) {
                return await fetchCatalog(false)
            }

            if (!res.ok) {
                throw new Error("Fetch catalog failed")
            }

            const data = await res.json()
            catalog.value = data.data || []

        } catch (err) {
            console.error("Fetch catalog error:", err)
        } finally {
            loading.value = false
        }
    }

    const createCatalog = async (payload) => {
        try {
            const res = await $fetch('/api/admin/services', {
                method: 'POST',
                body: payload
            })

            // refresh lại danh sách
            await fetchCatalog()

            return res

        } catch (err) {
            console.error("Create catalog error:", err)
            throw err
        }
    }

    return {
        catalog,
        loading,
        fetchCatalog,
        createCatalog
    }
}