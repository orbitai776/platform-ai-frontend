import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  // 1. Lấy token từ Cookie HttpOnly
  const token = getCookie(event, 'accessToken')

  // Nếu không có Token
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Vui lòng đăng nhập!'
    })
  }

  try {
    // 2. Decode token để lấy thông tin người dùng
    const payloadBase64 = token.split('.')[1]
    const decoded = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())

    return {
      success: true,
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
