
import { defineEventHandler, getCookie, createError } from 'h3'
export default defineEventHandler(async (event) => {
  // 1. Nuxt mở "Két sắt" lấy Cookie ra
  const token = getCookie(event, 'accessToken')

 // Nếu không có Token (Chưa đăng nhập hoặc đã Logout)
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Vui lòng đăng nhập để xem Ví Token!'
    })
  }

  // Trường hợp 2: Có Token -> Mang đi hỏi Backend sếp Thành
  try {
    // Lưu ý: Sau này sếp Thành làm xong API thật thì thay link /v1/api/profile này nha
    /* const response: any = await $fetch(`${process.env.VITE_GATEWAY_URL}/v1/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
    */

    // Hiện tại trả về data giả lập để test UI Billing
    return {
      user: { name: 'Hoàng Tuấn (VIP)', email: 'tuan.hoang@orbitai.fun' },
      wallet: { balance: 9999 },
      history: [
        { id: 'TXN-001', type: 'Nạp', amount: 5000, date: '02/04/2026 08:30' },
        { id: 'TXN-002', type: 'Trừ', amount: 150, date: '01/04/2026 14:20' },
        { id: 'TXN-003', type: 'Nạp', amount: 2000, date: '30/03/2026 09:00' }
      ]
    }
  } catch (error) {
    return { error: 'Lỗi khi gọi API Backend thật' }
  }
})