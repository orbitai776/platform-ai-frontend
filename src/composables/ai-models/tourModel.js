export function tourModel(text) {
  const lower = text.toLowerCase()

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const intents = {
    dalat: ['đà lạt', 'da lat', 'Đà Lạt', 'Đà lạt'],
    danang: ['đà nẵng', 'da nang', 'Đà Nẵng', 'Đà nẵng'],
    thailand: ['thái lan', 'bangkok', 'Thái Lan'],
    phuquoc: ['phú quốc', 'phu quoc', 'Phú Quốc'],
    price: ['giá', 'bao nhiêu', 'chi phí', 'budget'],
    suggest: ['gợi ý', 'đi đâu', 'du lịch đâu']
  }

  const matchIntent = (keywords) =>
    keywords.some(k => lower.includes(k))

  if (matchIntent(intents.dalat)) {
    return random([
      `🏔️ **ĐÀ LẠT 3N2Đ - HOT NHẤT**

📍 Điểm nổi bật:
- Thung lũng Tình Yêu
- Thác Datanla
- Chợ đêm

💰 Giá từ: 2.590.000đ
👉 Bạn đi gia đình hay couple vậy?`,

      `🌸 **ĐÀ LẠT CHILL**

- Săn mây Cầu Đất
- Cafe view rừng
- Homestay xịn

💡 Đi tháng 11–2 đẹp nhất
👉 Bạn đi mấy ngày mình build chi tiết luôn`,

      `🏕️ **ĐÀ LẠT CHO TEAM TRẺ**

- Check-in sống ảo
- Cafe cực chill
- Đồ ăn ngon

💰 Budget: 2tr–3tr/người
👉 Có cần mình lên lịch trình full không?`
    ])
  }

  if (matchIntent(intents.danang)) {
    return random([
      `🏖️ **ĐÀ NẴNG 3N2Đ**

- Bà Nà Hills (Cầu Vàng)
- Hội An
- Biển Mỹ Khê

💰 Giá từ: 2.990.000đ
👉 Combo biển + núi cực chill 😎`,

      `🌊 **ĐÀ NẴNG - HỘI AN**

- Ngày 1: Bà Nà
- Ngày 2: Hội An
- Ngày 3: Sơn Trà

👉 Bạn thích biển hay phố cổ hơn?`,

      `🔥 **ĐÀ NẴNG DEAL HOT**

- Vé đang rẻ
- KS nhiều ưu đãi

👉 Đi thời điểm này rất ngon 👌`
    ])
  }

  if (matchIntent(intents.thailand)) {
    return random([
      `✈️ **THÁI LAN 5N4Đ**

- Bangkok + Pattaya
- Đảo Coral
- Shopping

💰 ~6.990.000đ
👉 Bạn đi tour hay tự túc?`,

      `🌴 **THÁI LAN CHILL**

- Ăn uống siêu ngon
- Massage Thái
- Mall xịn

👉 Đi nhóm rất vui luôn 😆`,

      `🔥 **DEAL THÁI LAN**

- Vé rẻ
- KS 4*

👉 Có thể giữ slot trước cho bạn`
    ])
  }

  if (matchIntent(intents.phuquoc)) {
    return random([
      `🏝️ **PHÚ QUỐC 4N3Đ**

- VinWonders
- Cáp treo Hòn Thơm
- Sunset cực đẹp

💰 ~4.500.000đ
👉 Nghỉ dưỡng cực hợp`,

      `🌅 **PHÚ QUỐC RESORT**

- Biển trong xanh
- Hải sản ngon
- Chill max level

👉 Bạn đi nghỉ dưỡng hay khám phá?`
    ])
  }

  if (matchIntent(intents.price)) {
    return random([
      `💰 **GIÁ TOUR**

- Đà Lạt: 2tr5 – 3tr
- Đà Nẵng: 3tr – 4tr
- Thái Lan: 6tr – 8tr

👉 Budget bạn bao nhiêu mình tối ưu cho`,

      `💸 **CHI PHÍ THAM KHẢO**

- Nội địa: ~2tr – 4tr
- Quốc tế: ~6tr+

👉 Đi mấy ngày mình tính chuẩn hơn`
    ])
  }

  if (matchIntent(intents.suggest)) {
    return random([
      `🌟 **GỢI Ý HOT**

- Chill: Đà Lạt
- Biển: Đà Nẵng
- Quốc tế: Thái Lan

👉 Bạn thích vibe nào?`,

      `🎯 **ĐI ĐÂU ĐẸP**

- Couple: Đà Lạt
- Gia đình: Đà Nẵng
- Bạn bè: Thái Lan

👉 Mình build lịch trình luôn cho bạn`
    ])
  }

  return random([
    `🌍 Bạn muốn đi đâu?

👉 Mình có thể:
- Tư vấn tour
- Lên lịch trình
- Tối ưu chi phí`,

    `😎 Cho mình:
- Đi đâu
- Mấy ngày
- Budget

👉 Mình build plan xịn cho bạn luôn`
  ])
}