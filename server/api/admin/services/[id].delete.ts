export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  const id = getRouterParam(event, 'id') 

  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch (error :any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.data?.message || 'Lỗi khi thực hiện xóa mềm'
    })
  }
})