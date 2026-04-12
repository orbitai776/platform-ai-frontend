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
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.message || 'Error fetching balance'
    })
  }
})
