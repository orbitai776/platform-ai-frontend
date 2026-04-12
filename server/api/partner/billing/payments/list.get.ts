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
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.message || 'Error fetching payments list'
    })
  }
})
