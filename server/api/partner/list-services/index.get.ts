export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Không tìm thấy Token. Vui lòng đăng nhập lại.'
    })
  }

  try {
    const response = await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    return response
  } catch (error) {
    console.error('Lỗi từ Gateway:', error.response?._data || error.message)
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?._data?.message || 'Lỗi kết nối đến Gateway'
    })
  }
})