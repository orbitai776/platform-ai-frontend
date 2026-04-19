import { ref } from 'vue'

export const usePartnerServices = () => {
  const services = useState('ai_public_services', () => [])
  const loading = useState('ai_public_services_loading', () => false)

  const loadServices = async () => {
    loading.value = true
    try {
      // Gọi qua Proxy của Nguyên để an toàn
      const res = await $fetch('/api/partner/list-services')
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

    const loadPublicServices = async () => {
        loading.value = true;
        try {
            const res = await $fetch('/api/partner/all-services')
            const data = res.data || res || [];
            services.value = Array.isArray(data) ? data : (data.data || []);
            return services.value;
        } catch (error) {
            console.error('Fetch public services error:', error.message);
            if (error.statusCode === 401) {
              console.warn("Session expired or unauthorized for AI services");
            }
            return [];
        } finally {
            loading.value = false;
        }
    }
  return { services, loading, loadServices, loadPublicServices }
}