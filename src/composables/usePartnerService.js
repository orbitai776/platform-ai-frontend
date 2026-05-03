import { ref } from 'vue'
import { useState } from '#app'
import { useAuthToken } from './useAuthToken'
import useToast from '~/composables/useToast'

export const usePartnerServices = () => {
  const toast = useToast()
  const services = useState('ai_public_services', () => [])
  const loading = useState('ai_public_services_loading', () => false)

  const BASE_URL = 'https://platform-gateway-dev.orbitai.fun'
  const ORG_ID = 'e3845d6c-9bf8-4a2e-a766-33e67f23db22'

  const loadServices = async () => {
    loading.value = true
    try {
      const res = await $fetch('/api/partner/list-services')
      const data = res.data || res
      services.value = Array.isArray(data) ? data : (data.services || data.data || [])
    } catch (err) {
      if (err.statusCode === 401) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng login lại!")
        navigateTo('/login')
      }
    } finally {
      loading.value = false
    }
  }

  const loadPublicServices = async () => {
    console.log('[Client API] loadPublicServices started')
    loading.value = true
    try {
      const res = await $fetch(`${BASE_URL}/v1/api/partner/active-ai-services`, {
        headers: { 'x-org-id': ORG_ID }
      })

      console.log('[Client API] Raw response:', res)

      const data = res?.data || res
      let finalData = []
      if (Array.isArray(data)) {
        finalData = data
      } else if (data && typeof data === 'object') {
        finalData = data.services || data.data || data.items || []
      }

      console.log('[Client API] Extracted services:', finalData.length)

      if (!finalData.length) {
        finalData = [
          {
            partner_service_id: "1392a458-889d-4825-a2b9-9dc1bc4c6e69",
            name: "Tour Khám Phá Biển Đảo",
            description: "Dịch vụ du lịch trọn gói hè",
            status: "active",
            type: "tour",
            service_name: "tourist",
            price: 1500000,
            currency: "VND",
            metadata: {
              adults: 2, children: 1,
              start_date: "2026-05-10",
              destination: "Nha Trang",
              search_type: "Du lịch biển",
              duration_date: "3 ngày 2 đêm"
            }
          },
          {
            partner_service_id: "b1b2b3b4-1111-4444-8888-abcdefabcdef",
            name: "Bàn Tiệc Gia Đình VIP",
            description: "Đặt bàn tiệc khu vực sân thượng view biển",
            status: "active",
            type: "booking",
            service_name: "booking",
            price: 500000,
            currency: "VND",
            metadata: {
              area: "Sân thượng",
              party_size: 4,
              booking_date: "2026-05-01",
              booking_time: "19:00"
            }
          },
          {
            partner_service_id: "d1d2d3d4-2222-5555-9999-fedcbafedcba",
            name: "Lều Cắm Trại 4 Người",
            description: "Xuất kho lều cắm trại cao cấp",
            status: "active",
            type: "inventory",
            service_name: "inventory",
            price: 1200000,
            currency: "VND",
            metadata: {
              quantity: 10,
              item_name: "Lều Camping 4Pax",
              warehouse: "Kho Bình Dương",
              booking_date: "2026-04-30",
              booking_time: "08:00"
            }
          }
        ]
        console.log('[Client API] Using fallback services:', finalData.length)
      }

      services.value = finalData
      return services.value
    } catch (error) {
      console.error('Fetch public services error:', error.message)
      return []
    } finally {
      loading.value = false
    }
  }

  return { services, loading, loadServices, loadPublicServices }
}