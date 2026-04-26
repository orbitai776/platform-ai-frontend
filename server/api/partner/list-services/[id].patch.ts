export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  const id = getRouterParam(event, 'id')
  const body = await readBody(event) 

  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

  try {
    return await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: body
    })
  } catch (error : any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: 'Lỗi khi cập nhật thông tin dịch vụ'
    })
  }
})