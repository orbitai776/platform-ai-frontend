<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
    <main class="pt-12 px-4 md:px-8 max-w-5xl mx-auto space-y-10">
      
      <BillingBalanceCard 
        :balance="balanceData?.available_tokens || 0" 
        partnerName="Orbit Partner"
        @open-modal="showModal = true" 
      />

      <BillingHistoryTable :history="historyData?.data || []" />

      <hr class="border-slate-800 my-16 opacity-50">

      <BillingPricingCards />

    </main>

    <BillingTopupModal 
      v-if="showModal" 
      :is-processing="isProcessing"
      @close-modal="showModal = false" 
      @submit-payment="handlePayment"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Middleware check Auth
definePageMeta({
  middleware: [
    async function (to, from) {
      const token = useCookie('token')
      if (!token.value) {
        return navigateTo('/') 
      }
    }
  ]
})

const token = useCookie('token')
const showModal = ref(false)
const isProcessing = ref(false)

// 1. LẤY SỐ DƯ TỪ GATEWAY (SSR)
const { data: balanceData } = await useFetch('https://platform-gateway-dev.orbitai.fun/v1/api/partner/billing/balance', {
  headers: { Authorization: `Bearer ${token.value}` }
})

// 2. LẤY LỊCH SỬ NẠP TIỀN TỪ GATEWAY (SSR)
const { data: historyData } = await useFetch('https://platform-gateway-dev.orbitai.fun/v1/api/partner/billing/payments/list', {
  query: { page: 1, status: 'completed' }, // Phân trang và lọc theo yêu cầu sếp
  headers: { Authorization: `Bearer ${token.value}` }
})

// 3. XỬ LÝ GỌI API POST KHI BẤM NẠP TIỀN Ở MODAL (Client)
const handlePayment = async (rawAmount) => {
  isProcessing.value = true
  try {
    const res = await $fetch('https://platform-gateway-dev.orbitai.fun/v1/api/partner/billing/payments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { 
        amount: Number(rawAmount), 
        payment_method: 'payos' // Chốt cứng PayOS theo doc của sếp
      }
    })

    // Nếu Gateway trả về link thanh toán thì đẩy user sang đó
    if (res.success && res.payment_url) {
      window.location.href = res.payment_url
    } else {
      alert("Khởi tạo giao dịch thất bại!")
    }
  } catch (error) {
    console.error("Lỗi nạp tiền:", error)
    alert("Không thể kết nối đến hệ thống thanh toán.")
  } finally {
    isProcessing.value = false
  }
}
</script>

/*const handlePayment = async (rawAmount) => {
  isProcessing.value = true // Nút bấm sẽ hiện "Đang chuyển hướng..."
  
  try {
    /* ---------------------------------------------------------
       1. TẠM ẨN API THẬT ĐỂ CHỜ SẾP CẤP QUYỀN
    --------------------------------------------------------- */
    // const res = await $fetch('https://platform-gateway-dev.orbitai.fun/v1/api/partner/billing/payments', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${token.value}` },
    //   body: { amount: Number(rawAmount), payment_method: 'payos' }
    // })

    /* ---------------------------------------------------------
       2. DÙNG API GIẢ (MOCK) ĐỂ TEST GIAO DIỆN CHUYỂN HƯỚNG
    --------------------------------------------------------- */
    console.log("Đang gửi số tiền lên PayOS:", rawAmount);
    
    // Giả lập mạng bị trễ 1.5 giây để test hiệu ứng Loading của nút bấm
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          payment_url: "https://pay.payos.vn/demo-link-test", // Link ảo
          transaction_id: "uuid-fake-12345"
        })
      }, 1500)
    })

    /* --------------------------------------------------------- */

    if (res.success && res.payment_url) {
      alert("Test UI Thành Công! Chuẩn bị chuyển sang PayOS...");
      // window.location.href = res.payment_url // Tạm ẩn cái này để khỏi bị văng web
    } else {
      alert("Khởi tạo giao dịch thất bại!")
    }
  } catch (error) {
    console.error("Lỗi nạp tiền:", error)
    alert("Không thể kết nối đến hệ thống thanh toán.")
  } finally {
    isProcessing.value = false // Trả lại trạng thái bình thường cho nút
  }
}*/