import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/auth/verify-reset-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || error?.statusCode || 500,
      statusMessage:
        error?.response?._data?.message ||
        error?.data?.message ||
        'Ma xac nhan khong hop le',
    })
  }
})
