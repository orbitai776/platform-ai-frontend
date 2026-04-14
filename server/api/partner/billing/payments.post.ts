import { defineEventHandler, getCookie, createError, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const body = await readBody(event)

  try {
    const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/partner/billing/payments`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body
    })
    return response
  } catch (error: any) {
    console.error('[GATEWAY ERROR] Payments POST Endpoint:', {
      url: `${process.env.VITE_GATEWAY_URL}/v1/api/partner/billing/payments`,
      statusCode: error?.response?.status,
      backendMessage: error?.response?._data
    })
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?._data?.message || error?.message || 'Error creating payment'
    })
  }
})
