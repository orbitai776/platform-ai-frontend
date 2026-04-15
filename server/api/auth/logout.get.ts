import { defineEventHandler, deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'accessToken', {
    path: '/',
    secure: true,
    sameSite: 'strict'
  })

  return {
    success: true
  }
})