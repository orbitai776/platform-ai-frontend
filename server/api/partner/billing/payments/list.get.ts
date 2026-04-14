import { defineEventHandler, getCookie, createError, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const query = getQuery(event)

  try {
    const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/partner/billing/payments/list`, {
      headers: { Authorization: `Bearer ${token}` },
      query
    })
    return response
  } catch (error: any) {
    console.error('[GATEWAY ERROR] Payments List Endpoint:', {
      url: `${process.env.VITE_GATEWAY_URL}/v1/api/partner/billing/payments/list`,
      statusCode: error?.response?.status,
      backendMessage: error?.response?._data
    })
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?._data?.message || error?.message || 'Error fetching payments list'
    })
  }
})
