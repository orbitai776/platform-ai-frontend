import { ref } from 'vue'
import { useAuthToken } from '~/src/composables/useAuthToken'

export default function useServices() {
  const services = ref([])
  const loading = ref(false)

  const { getAccessToken } = useAuthToken()

  const fetchServices = async (retry = true) => {
    if (process.server) return

    loading.value = true

    try {
      const accessToken = await getAccessToken()

      if (!accessToken) return

      const res = await fetch(
        `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services-all`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res.status === 401 && retry) {
        return await fetchServices(false)
      }

      if (!res.ok) {
        throw new Error("Fetch services failed")
      }

      const data = await res.json()
      services.value = data.data || []

    } catch (error) {
      console.error('Fetch services error:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    services,
    loading,
    fetchServices
  }
}