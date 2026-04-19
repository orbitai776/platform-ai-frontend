import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services-all`, {
      method: 'GET',
      headers
    })
    
    return response
  } catch (error: any) {
    console.error('Lỗi từ Gateway (all-services):', error.response?._data || error.message)
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?._data?.message || 'Lỗi kết nối đến Gateway'
    })
  }
})
