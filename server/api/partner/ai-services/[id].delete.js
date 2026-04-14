export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Missing token' })
  }

  const id = event.context.params.id

  return await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})