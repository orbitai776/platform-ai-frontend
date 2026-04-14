import { ref } from 'vue'
import apiResource from './apiResource.js'

export const usePartnerService = () => {
  const { get, post, deleteRequest, patch } = apiResource()

  const endpoint = `/api/partner/ai-services`

  const services = ref([])
  const loading = ref(false)

  const fetchServices = async () => {
    loading.value = true
    try {
      const res = await get(endpoint)

      if (res?.status === 'success') {
        services.value = res.data || []
      }
    } finally {
      loading.value = false
    }
  }

  const addService = async (data) => {
    const res = await post(endpoint, data)
    if (res?.status === 'success') {
      await fetchServices()
      return true
    }
    return false
  }

  const removeService = async (id) => {
    const res = await deleteRequest(`${endpoint}/${id}`)
    if (res?.status === 'success') {
      await fetchServices()
      return true
    }
    return false
  }

  const updateStatus = async (id, status) => {
    const res = await patch(`${endpoint}/${id}`, { status })
    return res?.status === 'success'
  }

  return {
    services,
    loading,
    fetchServices,
    addService,
    removeService,
    updateStatus
  }
}