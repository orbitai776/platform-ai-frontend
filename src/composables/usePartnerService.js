import { ref } from 'vue'
import { useState } from '#app'
import { useAuthToken } from './useAuthToken'
import useToast from '~/composables/useToast'

export const usePartnerServices = () => {
  const toast = useToast()
  //const services = ref([])
  //const loading = ref(false)
  const services = useState('ai_public_services', () => [])
  const loading = useState('ai_public_services_loading', () => false)

  const loadServices = async () => {
    loading.value = true
    try {
      // Gọi qua Proxy của Nguyên để an toàn
      const res = await $fetch('/api/partner/list-services')
      const data = res.data || res;
      services.value = Array.isArray(data) ? data : (data.services || data.data || []);
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
    console.log('[Client API] loadPublicServices started');
    const { getAccessToken } = useAuthToken()
    loading.value = true;
    try {
      const token = await getAccessToken()
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      const res = await $fetch('/api/partner/all-services', { headers })
      console.log('[Client API] Raw response from all-services:', res);

      const data = res.data || res;
      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (data && typeof data === 'object') {
        finalData = data.services || data.data || data.items || [];
      }
      
      console.log('[Client API] Extracted services:', finalData.length);
      services.value = finalData;
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