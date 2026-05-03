export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/admin/services`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?._data?.message || 'Lỗi tạo loại AI'
    })
  }
})