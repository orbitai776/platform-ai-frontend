import { defineEventHandler, readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const { idToken } = await readBody(event)
  
  const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/auth`, {
    method: 'POST',
    body: { idToken }
  })
  
  // Set HttpOnly cookie
  setCookie(event, 'accessToken', response.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 1000
  })
  
  // Trả về data user (không có token)
  return {
    success: true,
    user: response.userUsingCache
  }
})