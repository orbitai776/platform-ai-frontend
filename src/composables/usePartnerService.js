import { ref } from 'vue'

export const usePartnerServices = () => {
  const toast = useToast()
  //const services = ref([])
  //const loading = ref(false)
  const services = useState('ai_public_services', () => [])
  const loading = useState('ai_public_services_loading', () => false)

  const loadServices = async () => {
    loading.value = true
    try {
      const accessToken = useCookie('accessToken')

      const res = await fetch(
        `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-org-id": "e3845d6c-9bf8-4a2e-a766-33e67f23db22",
            Authorization: `Bearer ${accessToken.value}`
          }
        }
      )

      const json = await res.json()
      services.value = json?.data || []

    } catch (err) {
      if (err.statusCode === 401) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng login lại!")
        navigateTo('/login')
      }
    } finally {
      loading.value = false
    }
  }

  const loadPublicServices = async () => {
    loading.value = true;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-org-id": "e3845d6c-9bf8-4a2e-a766-33e67f23db22"
          }
        }
      )

      const json = await res.json()
      const data = json?.data || []

      services.value = Array.isArray(data) ? data : []
      return services.value;

    } catch (error) {
      console.error('Fetch public services error:', error.message);
      return [];
    } finally {
      loading.value = false;
    }
  }
  return { services, loading, loadServices, loadPublicServices }
}