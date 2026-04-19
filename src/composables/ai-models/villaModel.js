export function villaModel(text) {
  const lower = text.toLowerCase()

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const intents = {
    danang: ['đà nẵng', 'da nang'],
    dalat: ['đà lạt', 'da lat'],
    phuquoc: ['phú quốc', 'phu quoc'],
    vungtau: ['vũng tàu', 'vung tau'],
    priceLow: ['rẻ', 'giá rẻ', 'budget thấp', 'tiết kiệm'],
    priceMid: ['tầm trung', 'ổn', 'ok'],
    priceHigh: ['cao cấp', 'luxury', 'resort', 'xịn'],
    couple: ['cặp đôi', 'couple', '2 người'],
    family: ['gia đình'],
    group: ['nhóm', 'bạn bè', 'team']
  }

  const match = (keywords) => keywords.some(k => lower.includes(k))

  let location = null
  if (match(intents.dalat)) location = 'dalat'
  else if (match(intents.danang)) location = 'danang'
  else if (match(intents.phuquoc)) location = 'phuquoc'
  else if (match(intents.vungtau)) location = 'vungtau'

  let price = null
  if (match(intents.priceLow)) price = 'low'
  else if (match(intents.priceHigh)) price = 'high'
  else if (match(intents.priceMid)) price = 'mid'

  let people = null
  if (match(intents.couple)) people = 'couple'
  else if (match(intents.family)) people = 'family'
  else if (match(intents.group)) people = 'group'

  if (location) {
    const locationName = {
      dalat: 'Đà Lạt',
      danang: 'Đà Nẵng',
      phuquoc: 'Phú Quốc',
      vungtau: 'Vũng Tàu'
    }[location]

    if (price === 'high') {
      return random([
        `🏨 **RESORT CAO CẤP ${locationName.toUpperCase()}**

- Villa riêng + hồ bơi
- View cực đẹp
- Dịch vụ 4–5⭐

💰 ~2tr–5tr/đêm
👉 Phù hợp nghỉ dưỡng cực chill 😎`,

        `✨ **VILLA LUXURY ${locationName}**

- Không gian riêng tư
- Full tiện nghi
- Rất hợp honeymoon 💕

👉 Bạn đi mấy người mình chọn villa chuẩn hơn`
      ])
    }

    if (price === 'low') {
      return random([
        `💸 **KHÁCH SẠN GIÁ RẺ ${locationName}**

- 300k–600k/đêm
- Sạch sẽ, đủ tiện nghi

👉 Phù hợp tiết kiệm nhưng vẫn ổn 👌`,

        `🏠 **HOMESTAY ${locationName}**

- Giá mềm
- Chill, decor đẹp

👉 Bạn cần gần trung tâm hay view đẹp?`
      ])
    }

    if (people === 'group') {
      return random([
        `👥 **VILLA NHÓM ${locationName}**

- 3–5 phòng ngủ
- Có hồ bơi riêng
- BBQ ngoài trời

💰 ~2tr–4tr/đêm (chia ra rất rẻ)
👉 Đi team cực hợp 🔥`,

        `🏡 **VILLA NGUYÊN CĂN ${locationName}**

- Không gian rộng
- Tự do ăn chơi

👉 Bạn đi bao nhiêu người mình chọn size villa chuẩn`
      ])
    }

    if (people === 'couple') {
      return random([
        `💕 **VILLA CHO CẶP ĐÔI ${locationName}**

- View đẹp, riêng tư
- Decor lãng mạn

💰 ~800k–2tr/đêm
👉 Rất hợp đi chill hoặc kỷ niệm`,

        `🌸 **HOMESTAY CHILL ${locationName}**

- Nhỏ xinh
- View xịn

👉 Bạn thích style hiện đại hay vintage?`
      ])
    }

    return random([
      `🏨 **KHÁCH SẠN ${locationName}**

- Giá: 500k – 2tr
- Nhiều lựa chọn

👉 Bạn muốn:
- Gần trung tâm
- View đẹp
- Hay giá rẻ?`,

      `🌟 **GỢI Ý LƯU TRÚ ${locationName}**

- Budget thấp → homestay
- Tầm trung → hotel
- Cao cấp → villa/resort

👉 Cho mình budget + số người mình chọn chuẩn luôn`
    ])
  }

  return random([
    `🏨 Bạn muốn ở khu vực nào?

👉 Mình có thể gợi ý:
- Đà Lạt
- Đà Nẵng
- Phú Quốc

👉 Nói mình location + budget là mình chọn chuẩn luôn 😎`,

    `😄 Bạn cần tìm khách sạn hay villa?

👉 Cho mình:
- Đi đâu
- Bao nhiêu người
- Budget

👉 Mình lọc đúng nhu cầu cho bạn luôn`
  ])
}