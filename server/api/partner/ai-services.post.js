export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')

  if (!token) {
    throw createError({ statusCode: 401, message: 'Missing token' })
  }

  const body = await readBody(event)

  return await $fetch(`${config.public.gatewayUrl}/v1/api/partner/ai-services`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body
  })
})