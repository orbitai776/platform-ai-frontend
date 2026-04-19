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

    const loadPublicServices = async () => {
        if (process.server) return;

        loading.value = true;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_GATEWAY_URL}/v1/api/partner/ai-services-all` 
            );

            if (!res.ok) {
                throw new Error("Lỗi khi lấy danh sách dịch vụ public");
            }

            const data = await res.json();
            services.value = data.data || [];

        } catch (error) {
            console.error('Fetch public services error:', error);
        } finally {
            loading.value = false;
        }
    }
  return { services, loading, loadServices, loadPublicServices }
}