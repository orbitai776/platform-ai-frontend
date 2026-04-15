import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  // 1. Lấy token từ Cookie HttpOnly
  const accessTokenCookie = getCookie(event, 'accessToken')
  const userRolesCookie = getCookie(event, 'userRoles')

  // Nếu không có Token
  if (!accessTokenCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Miss Access Token Vui lòng đăng nhập!'
    })
  }

  if (!userRolesCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Miss User Roles Vui lòng đăng nhập!'
    })
  }

  try {
    // 2. Decode token để lấy thông tin người dùng
    const payloadBase64 = accessTokenCookie.split('.')[1]
    const decoded = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())

    return {
      success: true,
      accessTokenCookie,
      userRolesCookie,
      user: { 
        name: decoded.name || decoded.full_name || 'User', 
        email: decoded.email || 'no-email@orbitai.fun',
        roles: decoded.roles || []
      },
      // Các phần dưới này vẫn để mock nếu gateway chưa trả về wallet thật
      wallet: { balance: 0 },
      history: []
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token không hợp lệ hoặc đã hết hạn.'
    })
  }
})
