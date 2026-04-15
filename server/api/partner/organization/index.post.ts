import { defineEventHandler, getCookie, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'accessToken')
  const body = await readBody(event)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/partner/organization`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body
    })
    
    return response
  } catch (error: any) {
    console.error('[GATEWAY ERROR] Organization POST:', {
      url: `${process.env.VITE_GATEWAY_URL}/v1/api/partner/organization`,
      statusCode: error?.response?.status
    })
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?._data?.message || 'Error creating organization'
    })
  }
})
