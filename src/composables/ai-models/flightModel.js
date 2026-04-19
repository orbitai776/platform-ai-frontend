export function flightModel(text) {
  const lower = text.toLowerCase()

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const isSaigon = lower.includes('sài gòn') || lower.includes('sg') || lower.includes('hcm')
  const isHanoi = lower.includes('hà nội') || lower.includes('hn')
  const isDanang = lower.includes('đà nẵng') || lower.includes('dn')
  const isThailand = lower.includes('thái lan') || lower.includes('bangkok')

  const isWeekend = lower.includes('cuối tuần')
  const isTomorrow = lower.includes('mai')
  const isNextWeek = lower.includes('tuần sau')

  const askPrice = lower.includes('giá') || lower.includes('bao nhiêu')

  if (isSaigon && isDanang) {
    if (askPrice) {
      return random([
        `✈️ **SG → ĐÀ NẴNG**

💰 Giá vé:
- Thường: ~800k – 1.2tr (1 chiều)
- Cuối tuần: ~1.3tr – 1.8tr

💡 Tip: đặt trước 1–2 tuần để rẻ hơn`
      ])
    }

    return random([
      `✈️ Bay SG → Đà Nẵng rất nhiều chuyến/ngày

⏱️ Thời gian bay: ~1h20p  
💰 Giá trung bình: ~1tr

👉 Bạn bay ngày nào mình check giờ đẹp cho`,
      `🔥 Tuyến SG → Đà Nẵng đang có nhiều deal

👉 Bạn đi ${isWeekend ? 'cuối tuần' : 'ngày thường'} hay thời gian cụ thể?`
    ])
  }

  if (isHanoi && isDanang) {
    return random([
      `✈️ **HN → ĐÀ NẴNG**

⏱️ Bay ~1h15p  
💰 Giá: 900k – 1.5tr

👉 Có nhiều chuyến sáng và tối đẹp`,
      `🌤️ Bay từ Hà Nội vào Đà Nẵng rất tiện

👉 Bạn muốn bay giờ sáng hay tối?`
    ])
  }

  if (isThailand) {
    return random([
      `✈️ **VIỆT NAM → THÁI LAN**

💰 Giá:
- Bay thẳng: ~1.8tr – 3tr
- Khứ hồi: ~2.5tr – 4tr

⏱️ Bay ~1h30p – 2h

👉 Bạn muốn bay từ HCM hay Hà Nội?`,
      `🌴 Bay Thái Lan đang rất rẻ

🔥 Vietjet / AirAsia thường có deal

👉 Bạn dự định đi tháng mấy?`
    ])
  }

  if (isTomorrow) {
    return `⚠️ Bay ngày mai thường giá cao

💰 Có thể từ 1.5tr – 3tr

👉 Nếu linh hoạt, bạn nên dời 2–3 ngày để tiết kiệm`
  }

  if (isWeekend) {
    return `🔥 Cuối tuần giá vé thường tăng 20–40%

👉 Nếu muốn rẻ hơn:
- Bay giữa tuần
- Đặt sớm`
  }

  if (isNextWeek) {
    return `👍 Tuần sau là thời điểm đẹp để đặt vé

💰 Giá thường ổn định ~1tr – 1.5tr nội địa

👉 Bạn cho mình tuyến bay mình check cụ thể`
  }

  if (askPrice) {
    return `💰 **GIÁ VÉ THAM KHẢO**

- Nội địa: ~800k – 1.5tr
- Quốc tế gần: ~2tr – 4tr

👉 Bạn bay từ đâu → đâu mình báo chuẩn luôn`
  }

  if (lower.includes('đặt vé') || lower.includes('book')) {
    return `🎫 Mình có thể hỗ trợ bạn:

- Tìm vé rẻ
- Chọn giờ đẹp
- So sánh hãng bay

👉 Bạn cho mình:
- Điểm đi
- Điểm đến
- Ngày bay`
  }

  return random([
    `✈️ Bạn muốn bay từ đâu → đâu?

👉 Mình sẽ tìm vé tốt nhất cho bạn`,
    `🌍 Mình hỗ trợ:
- Vé nội địa
- Vé quốc tế
- Săn vé rẻ

👉 Nhập tuyến bay + ngày là ok 😎`
  ])
}