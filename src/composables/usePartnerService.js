import { useState } from '#app'

export const usePartnerServices = () => {
  const toast = useToast()
  const services = useState('ai_public_services', () => [])
  const loading = useState('ai_public_services_loading', () => false)

  const loadServices = async () => {
    loading.value = true
    try {
      const token = useCookie('accessToken').value

      const res = await fetch(
        `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services`,
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "x-org-id": "e3845d6c-9bf8-4a2e-a766-33e67f23db22",
            "access-token": token
          }
        }
      )

      if (res.status === 401) throw new Error("UNAUTHORIZED")

      const json = await res.json()
      services.value = json?.data || []
      return services.value
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        toast.error("Phiên đăng nhập hết hạn!")
      }
      return []
    } finally {
      loading.value = false
    }
  }

  const loadPublicServices = async () => {
    loading.value = true
    try {
      const res = await fetch(
        `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services-all`,
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "x-org-id": "e3845d6c-9bf8-4a2e-a766-33e67f23db22"
          }
        }
      )

      if (!res.ok) return []

      const json = await res.json()
      const data = json?.data || []
      services.value = Array.isArray(data) ? data : []
      return services.value
    } catch (error) {
      return []
    } finally {
      loading.value = false
    }
  }

  return { services, loading, loadServices, loadPublicServices }
}