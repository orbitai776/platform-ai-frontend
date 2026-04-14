export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Missing token' })
  }

  const url = `${config.public.gatewayUrl}/v1/api/partner/ai-services`

  return await $fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})