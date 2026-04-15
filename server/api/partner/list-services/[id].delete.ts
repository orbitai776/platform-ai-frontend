export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  const id = event.context.params.id // Lấy ID từ URL

  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: 'Lỗi khi xóa dịch vụ'
    })
  }
})