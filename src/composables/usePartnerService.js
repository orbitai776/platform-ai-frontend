export const usePartnerServices = () => {
  const services = ref([])
  const loading = ref(false)

  const loadServices = async () => {
    loading.value = true
    try {
      // Gọi qua Proxy của Nguyên để an toàn
      const res = await $fetch('/api/partner/ai-services')
      services.value = res.data || res || []
    } catch (err) {
      if (err.statusCode === 401) {
        alert("Phiên đăng nhập hết hạn, vui lòng login lại!")
        navigateTo('/login') 
      }
    } finally {
      loading.value = false
    }
  }

  return { services, loading, loadServices }
}