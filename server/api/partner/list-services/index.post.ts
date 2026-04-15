export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  const body = await readBody(event)

  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body
    })
  } catch (error) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?._data?.message || 'Lỗi khi tạo Service'
    })
  }
})