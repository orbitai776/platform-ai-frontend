import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    console.log('[Server API] Calling Gateway:', `${config.public.gatewayUrl}/v1/api/partner/ai-services-all`);
    const response = await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services-all`, {
      method: 'GET',
      headers
    })
    console.log('[Server API] Gateway Response Success, items:', Array.isArray(response) ? response.length : (response?.data?.length || 'object'));
    
    return response
  } catch (error: any) {
    console.error('Lỗi từ Gateway (all-services):', error.response?._data || error.message)
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?._data?.message || 'Lỗi kết nối đến Gateway'
    })
  }
})
