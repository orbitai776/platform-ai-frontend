export function productModel(text) {
  const lower = text.toLowerCase()

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const productsByLocation = {
    'đà lạt': [
      { name: 'Mứt dâu Đà Lạt', price: '120.000đ', desc: 'Ngọt nhẹ, dẻo' },
      { name: 'Trà Atiso', price: '80.000đ', desc: 'Thanh nhiệt, tốt sức khỏe' },
      { name: 'Dâu tây tươi', price: '150.000đ/kg', desc: 'Hái tại vườn' },
      { name: 'Hồng treo gió', price: '200.000đ', desc: 'Dẻo, ngọt tự nhiên' },
      { name: 'Cà phê Arabica', price: '180.000đ', desc: 'Thơm, vị đậm' }
    ],

    'đà nẵng': [
      { name: 'Chả bò Đà Nẵng', price: '250.000đ/kg', desc: 'Dai ngon, đậm vị' },
      { name: 'Mực rim me', price: '180.000đ', desc: 'Chua cay, bắt vị' },
      { name: 'Bánh khô mè', price: '50.000đ', desc: 'Giòn, thơm mè' },
      { name: 'Rong biển Mỹ Khê', price: '100.000đ', desc: 'Tươi, giàu dinh dưỡng' },
      { name: 'Nước mắm Nam Ô', price: '150.000đ', desc: 'Đậm đà truyền thống' }
    ],

    'phú quốc': [
      { name: 'Nước mắm Phú Quốc', price: '200.000đ', desc: 'Nguyên chất' },
      { name: 'Hồ tiêu Phú Quốc', price: '150.000đ', desc: 'Thơm, cay nhẹ' },
      { name: 'Rượu sim', price: '250.000đ', desc: 'Đặc sản nổi tiếng' },
      { name: 'Khô cá thiều', price: '180.000đ', desc: 'Ngon, dễ bảo quản' },
      { name: 'Bánh tét mật cật', price: '120.000đ', desc: 'Đậm chất miền biển' }
    ]
  }

  let location = null

  if (lower.includes('đà lạt')) location = 'đà lạt'
  if (lower.includes('đà nẵng')) location = 'đà nẵng'
  if (lower.includes('phú quốc')) location = 'phú quốc'

  const askProduct =
    lower.includes('đặc sản') ||
    lower.includes('mua gì') ||
    lower.includes('quà') ||
    lower.includes('gợi ý')

  if (location && productsByLocation[location]) {
    return {
      text: `🛍️ Đặc sản ${location.toUpperCase()} bạn nên mua:`,
      products: productsByLocation[location]
    }
  }

  if (askProduct) {
    return {
      text: random([
        `🎁 Bạn muốn tìm đặc sản ở đâu?

👉 Mình gợi ý chuẩn cho:
- Đà Lạt
- Đà Nẵng
- Phú Quốc`
      ]),
      products: []
    }
  }

  return {
    text: `🛍️ Bạn muốn mua đặc sản ở đâu?

👉 Nhập địa điểm mình gợi ý chi tiết luôn`,
    products: []
  }
}