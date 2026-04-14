import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/partner/billing/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    return response // Backend returns { data: ..., message: ...} usually
  } catch (error: any) {
    console.error('[GATEWAY ERROR] Balance Endpoint:', {
      url: `${process.env.VITE_GATEWAY_URL}/v1/api/partner/billing/balance`,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? token.substring(0, 15) + '...' : 'none',
      statusCode: error?.response?.status,
      backendMessage: error?.response?._data
    })
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?._data?.message || error?.message || 'Error fetching balance'
    })
  }
})
