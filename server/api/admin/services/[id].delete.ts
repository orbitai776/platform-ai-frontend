export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  const id = getRouterParam(event, 'id') 
  const body= await readBody(event);

  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error :any) {
    const status=  error.response?.status || 500

    if (status === 409) {
      throw createError({
        statusCode: 409,
        message: 'Service đang được partner sử dụng, không thể xoá'
      })
    }

    throw createError({
      statusCode: status,
      message: error.data?.message || 'Lỗi khi thực hiện xóa mềm'
    })
  }
})