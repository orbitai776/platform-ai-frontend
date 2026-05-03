export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  const id = getRouterParam(event, 'id') 
  const body= await readBody(event);

  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/admin/services/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body
    })
  } catch (error :any) {
    const status=  error.response?.status || 500
    const message =
      error.response?._data?.message ||
      error.data?.message ||
      'Lỗi khi cập nhật trạng thái service'
    throw createError({
      statusCode: status,
      message
    })
  }
})