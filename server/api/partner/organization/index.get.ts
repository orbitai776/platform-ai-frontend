import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'accessToken')

  if (!token) {
    // Return a 401 instead of crashing or letting downstream handle it
    return { data: null, message: 'Unauthorized' };
  }

  try {
    const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/partner/organization`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    
    return response
  } catch (error: any) {
    console.error('[GATEWAY ERROR] Organization GET:', {
      url: `${process.env.VITE_GATEWAY_URL}/v1/api/partner/organization`,
      statusCode: error?.response?.status,
      backendMessage: error?.response?._data
    })
    
    // Return empty data structure to prevent client crash
    return { data: null, message: error?.response?._data?.message || 'Error fetching organization info' };
  }
})
