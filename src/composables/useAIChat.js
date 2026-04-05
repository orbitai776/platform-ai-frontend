// composables/useAIChat.js
import { ref } from 'vue'

export function useAIChat() {
  const sendMessage = async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const lowerMessage = message.toLowerCase()
    
    // Tour Đà Nẵng
    if (lowerMessage.includes('đà nẵng') || lowerMessage.includes('da nang')) {
      return `🏖️ **TOUR ĐÀ NẴNG 3 NGÀY 2 ĐÊM** 🏖️

📅 **LỊCH TRÌNH CHI TIẾT:**

**Ngày 1: Đà Nẵng - Bà Nà Hills**
- 07:30: Xe đón tại khách sạn
- 09:00: Đến Bà Nà Hills, check-in Cáp treo (kỷ lục Guinness)
- Tham quan: Cầu Vàng (Golden Bridge), Vườn hoa Le Jardin, Đỉnh Núi Chúa
- 12:00: Buffet trưa tại nhà hàng
- Chiều: Tự do khám phá khu vui chơi Fantasy Park
- 17:00: Trở về khách sạn, nghỉ ngơi
- Tối: Tự do ăn tối, dạo biển Đà Nẵng

**Ngày 2: Hội An cổ kính**
- 08:00: Ăn sáng tại khách sạn
- 09:00: Tham quan làng gốm Thanh Hà, chợ Cẩm Thanh
- 12:00: Ăn trưa với đặc sản Cao lầu, Mì Quảng
- 14:00: Khám phá phố cổ Hội An: Chùa Cầu, Nhà cổ, Hội quán
- 17:00: Thả đèn hoa đăng trên sông Hoài
- 19:00: Tự do ăn tối, về khách sạn

**Ngày 3: Bán đảo Sơn Trà**
- 08:00: Ăn sáng, trả phòng
- 09:00: Tham quan Bán đảo Sơn Trà - Linh Ứng Tự
- 11:00: Mua sắm đặc sản tại Siêu thị Cồn
- 12:00: Ăn trưa, kết thúc tour

💰 **GIÁ TOUR:**
- Người lớn: 2,990,000đ/khách
- Trẻ em (5-11 tuổi): 1,990,000đ/khách
- Trẻ em dưới 5 tuổi: Miễn phí (phí phát sinh tự túc)

✅ **BAO GỒM:**
- Xe đưa đón theo chương trình
- Khách sạn 3-4 sao tiêu chuẩn
- Vé tham quan các điểm theo lịch trình
- 2 bữa sáng + 3 bữa trưa + nước suối
- Bảo hiểm du lịch

❌ **KHÔNG BAO GỒM:**
- Vé máy bay khứ hồi
- Chi phí cá nhân, mua sắm
- Ăn tối các ngày

💡 **LƯU Ý:** Giá có thể thay đổi theo mùa và số lượng khách. Liên hệ sớm để có giá tốt nhất!

Bạn muốn đặt tour cho ngày nào không ạ? 🌟`
    }
    
    // Tour Thái Lan
    if (lowerMessage.includes('thái lan') || lowerMessage.includes('thailand') || lowerMessage.includes('bangkok')) {
      return `✈️ **TOUR THÁI LAN 5 NGÀY 4 ĐÊM** ✈️

📅 **LỊCH TRÌNH CHI TIẾT:**

**Ngày 1: Bangkok - Chào đón**
- Xe đón tại sân bay Suvarnabhumi
- Tham quan Wat Traimit (Chùa Phật Vàng)
- Ăn tối, nhận phòng khách sạn 4 sao

**Ngày 2: Khám phá Bangkok**
- Sáng: Chùa Phật Ngọc (Wat Phra Kaew) & Cung điện Hoàng gia
- Trưa: Ăn trưa tại nhà hàng địa phương
- Chiều: Tham quan chợ nổi Damnoen Saduak
- Tối: Ngắm Bangkok về đêm trên tàu Chao Phraya River

**Ngày 3: Pattaya - Biển xanh cát trắng**
- Sáng: Di chuyển từ Bangkok đến Pattaya
- Chiều: Tham quan Sanctuary of Truth, bãi biển Jomtien
- Tối: Xem show Tiffany - Cabaret Show nổi tiếng

**Ngày 4: Đảo Cát Bà - Lặn ngắm san hô**
- Sáng: Tham quan đảo Coral - lặn ngắm san hô
- Trưa: Ăn trưa trên đảo
- Chiều: Tắm biển, thư giãn
- Tối: Walking Street Pattaya

**Ngày 5: Mua sắm - Trở về**
- Sáng: Tham quan chợ Chatuchak, mua sắm quà tặng
- Trưa: Ăn trưa, về sân bay

💰 **GIÁ TOUR:**
- Người lớn: 6,990,000đ/khách
- Trẻ em: 4,990,000đ/khách

✅ **BAO GỒM:**
- Vé máy bay khứ hồi (VietJet/AirAsia)
- Khách sạn 4 sao (2-3 người/phòng)
- Ăn theo lịch trình (4 sáng, 5 trưa, 4 tối)
- Xe đưa đón, vé tham quan
- Bảo hiểm du lịch quốc tế

Có cần tôi tư vấn thêm về visa và thủ tục không ạ? 🌴`
    }
    
    // Tour Đà Lạt
    if (lowerMessage.includes('đà lạt') || lowerMessage.includes('da lat')) {
      return `🏔️ **TOUR ĐÀ LẠT 3 NGÀY 2 ĐÊM** 🏔️

📅 **LỊCH TRÌNH CHI TIẾT:**

**Ngày 1: Khám phá Đà Lạt mộng mơ**
- 07:00: Xe đón tại điểm hẹn
- 09:00: Tham quan Thung lũng Tình Yêu
- 11:00: Nhà thờ Con Gà
- 12:30: Ăn trưa (Lẩu gà lá é)
- 14:00: Ga Đà Lạt cổ kính
- 16:00: Nhận phòng khách sạn
- 19:00: Dạo chợ đêm Đà Lạt

**Ngày 2: Thiên đường cà phê & hoa**
- 08:00: Ăn sáng, tham quan Làng Cù Lần
- 10:00: Thác Datanla (trải nghiệm máng trượt)
- 12:00: Ăn trưa tại nhà hàng
- 14:00: Vườn hoa thành phố, Hồ Xuân Hương
- 16:00: Check-in biệt thự cổ, Domaine de Marie
- Tối: Tự do ăn tối

**Ngày 3: Chốt tour - Về lại Sài Gòn**
- 08:00: Ăn sáng, tham quan Thiền viện Trúc Lâm
- 10:00: Mua sắm đặc sản (Mứt, trà, cà phê)
- 12:00: Ăn trưa, trả phòng
- 14:00: Lên xe về lại Sài Gòn

💰 **GIÁ TOUR:**
- Người lớn: 2,590,000đ/khách
- Trẻ em: 1,590,000đ/khách

✅ **BAO GỒM:**
- Xe giường nằm khứ hồi Sài Gòn - Đà Lạt
- Khách sạn 2 đêm (2-3 sao)
- 2 sáng, 3 trưa
- Vé tham quan theo lịch trình

❌ **KHÔNG BAO GỒM:**
- Chi phí cá nhân, mua sắm
- Vé máy bay (nếu từ Hà Nội)

Bạn muốn đi Đà Lạt ngày nào để tôi check phòng nhé! ☕🌸`
    }
    
    // Khách sạn
    if (lowerMessage.includes('khách sạn') || lowerMessage.includes('hotel')) {
      return `🏨 **GỢI Ý KHÁCH SẠN THEO GIÁ:**

**Giá rẻ (300k-600k/đêm):**
- Khách sạn Ngọc Mai (Đà Nẵng)
- Hostel Long (Đà Lạt)
- Coco Guesthouse (Hội An)

**Giá trung bình (700k-1.2tr/đêm):**
- Sanouva Đà Nẵng (gần biển)
- Lavender Đà Lạt (view đẹp)
- La Charm Hội An (phố cổ)

**Cao cấp (1.5tr-3tr/đêm):**
- Four Points by Sheraton (Đà Nẵng)
- Ana Mandara (Đà Lạt)
- Almanity (Hội An)

Bạn cần tôi gợi ý khách sạn cho thành phố nào cụ thể không? 🌟`
    }
    
    // Vé máy bay
    if (lowerMessage.includes('vé máy bay') || lowerMessage.includes('bay')) {
      return `✈️ **GIÁ VÉ MÁY BAY THAM KHẢO:**

**Sài Gòn - Đà Nẵng:**
- VietJet: 500k-800k (khứ hồi ~1.2tr)
- Vietnam Airlines: 800k-1.2tr (khứ hồi ~1.8tr)

**Hà Nội - Đà Nẵng:**
- Bamboo: 600k-1tr (khứ hồi ~1.5tr)
- VietJet: 550k-900k (khứ hồi ~1.3tr)

**Sài Gòn - Thái Lan:**
- VietJet/AirAsia: 1.2tr-1.8tr (khứ hồi ~2.5tr)
- Vietnam Airlines: 2.5tr-3.5tr (khứ hồi ~5tr)

💰 **MẸO ĐẶT VÉ RẺ:**
- Đặt trước 2-3 tuần
- Canh giờ vàng (12h-14h hàng ngày)
- Tránh ngày lễ, cuối tuần

Bạn cần tôi check giá vé cho ngày cụ thể không? 🎫`
    }
    
    // Gợi ý chung
    if (lowerMessage.includes('gợi ý') || lowerMessage.includes('tư vấn')) {
      return `🌟 **TOP TOUR DU LỊCH HOT NHẤT HIỆN NAY:**

1. **Tour Đà Nẵng - Bà Nà - Hội An (3N2Đ)**
   - Giá: 2,990,000đ
   - Ưu đãi: Tặng vé cáp treo Bà Nà

2. **Tour Thái Lan - Bangkok - Pattaya (5N4Đ)**
   - Giá: 6,990,000đ
   - Ưu đãi: Giảm 500k khi đặt nhóm 4 người

3. **Tour Đà Lạt (3N2Đ)**
   - Giá: 2,590,000đ
   - Ưu đãi: Tặng 1 đêm khách sạn

4. **Tour Phú Quốc (4N3Đ)**
   - Giá: 4,500,000đ
   - Ưu đãi: Vé safari miễn phí

Bạn quan tâm tour nào để tôi gửi chi tiết ạ? 🎉`
    }
    
    // Default response
    return `Cảm ơn bạn đã quan tâm đến tour du lịch! 🥰

Tôi có thể tư vấn cho bạn về:
🏖️ Tour Đà Nẵng - Hội An (3 ngày 2 đêm từ 2.99tr)
🏔️ Tour Đà Lạt - Nha Trang (4 ngày 3 đêm từ 3.5tr)
✈️ Tour Thái Lan - Singapore (5 ngày 4 đêm từ 6.99tr)
🏨 Khách sạn, vé máy bay giá tốt

Bạn muốn đi đâu vào dịp nào à? Cho tôi biết để tư vấn chi tiết hơn nhé! 💫`
  }
  
  return {
    sendMessage
  }
}