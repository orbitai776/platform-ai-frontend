<template>
  <div class="font-['DM_Sans'] bg-[#f5f2ec] text-[#0d0d12] overflow-x-hidden">

    <!-- HERO -->
    <section class="max-w-[1280px] mx-auto px-8 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-[1]">
      <div>
        <div class="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#e8604c] mb-6 before:content-[''] before:block before:w-5 before:h-px before:bg-[#e8604c]">
          Showcase
        </div>
        <h1 class="font-['Sora'] text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6">
          AI thực chiến<br/>cho ngành <em class="not-italic text-[#6c4de6]">du lịch</em>
        </h1>
        <p class="text-[#555] text-base leading-[1.7] max-w-[480px]">
          Hệ thống AI Chat đa dịch vụ cho Tour, Villa & kho hàng du lịch — tư vấn 24/7, tích hợp đơn giản, vận hành không cần kỹ thuật.
        </p>
        <div class="flex gap-3 flex-wrap mt-8">
          <span v-for="badge in badges" :key="badge.text" class="flex items-center gap-1 font-['Sora'] text-[0.75rem] font-semibold text-[#555] bg-white px-[0.85rem] py-[0.4rem] rounded-full border border-[rgba(13,13,18,0.12)]">
            <span class="text-[0.85rem]">{{ badge.icon }}</span>{{ badge.text }}
          </span>
        </div>
      </div>

      <div class="relative h-[320px] md:h-[320px] h-[200px]">
        <div class="absolute inset-0 flex flex-wrap items-center justify-center gap-3">
          <span v-for="(tag, i) in floatingTags" :key="i"
            class="px-4 py-2 rounded-full text-[0.8rem] font-medium font-['Sora'] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            :style="{ background: tag.bg, color: tag.color, border: `1.5px solid ${tag.border}`, animationDelay: tag.delay, animation: 'floatTag 4s ease-in-out infinite' }"
          >
            {{ tag.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- PORTAL TABS -->
    <div class="max-w-[1280px] mx-auto mb-12 px-8 relative z-[1]">

      <!-- Tab buttons -->
      <div class="flex border-b-2 border-[rgba(13,13,18,0.12)] mb-8">
        <button
          v-for="tab in tabs" :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 font-['Sora'] text-[0.8rem] font-bold tracking-[0.06em] uppercase border-none bg-none cursor-pointer border-b-2 -mb-[2px] transition-all duration-200"
          :class="activeTab === tab.id ? 'text-[#0d0d12] border-[#6c4de6]' : 'text-[#aaa] border-transparent hover:text-[#555]'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- TAB: PUBLIC -->
      <div v-if="activeTab === 'public'">
        <!-- Filter -->
        <div class="flex gap-2 flex-wrap mb-6">
          <button
            v-for="f in filters" :key="f.value"
            @click="activeFilter = f.value"
            class="px-4 py-[0.4rem] border-[1.5px] rounded-full text-[0.8rem] cursor-pointer transition-all duration-200"
            :class="activeFilter === f.value ? 'bg-[#0d0d12] border-[#0d0d12] text-white' : 'bg-transparent border-[rgba(13,13,18,0.15)] text-[#555] hover:bg-[#0d0d12] hover:border-[#0d0d12] hover:text-white'"
          >
            {{ f.label }}
          </button>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-[1.5px] bg-[rgba(13,13,18,0.12)] border-[1.5px] border-[rgba(13,13,18,0.12)] rounded-xl overflow-hidden">
          <div
            v-for="card in filteredCards" :key="card.num"
            class="bg-[#f5f2ec] p-8 cursor-pointer relative overflow-hidden flex flex-col gap-4 transition-colors duration-200 hover:bg-white"
          >
            <div class="w-full h-40 rounded-md overflow-hidden relative bg-[#e0ddd6]">
              <img :src="card.image" :alt="card.title" class="w-full h-full object-cover transition-transform duration-300 grayscale-[20%] hover:scale-[1.04] hover:grayscale-0" />
              <span class="absolute top-3 right-3 font-['Sora'] text-[0.65rem] font-bold tracking-[0.1em] text-white bg-[rgba(13,13,18,0.6)] px-2 py-[0.2rem] rounded backdrop-blur-sm">{{ card.num }}</span>
            </div>
            <div class="flex gap-1 flex-wrap">
              <span v-for="tag in card.tags" :key="tag.label" class="px-[0.6rem] py-[0.2rem] rounded-[3px] text-[0.65rem] font-bold font-['Sora'] tracking-[0.05em] uppercase" :class="tag.class">{{ tag.label }}</span>
            </div>
            <h3 class="font-['Sora'] text-base font-bold leading-[1.3] text-[#0d0d12] tracking-[-0.01em]">{{ card.title }}</h3>
            <p class="text-[0.825rem] leading-[1.65] text-[#6b6b70] flex-1">{{ card.desc }}</p>
            <ul class="list-none m-0 p-0 flex flex-col gap-[0.3rem]">
              <li v-for="feat in card.features" :key="feat" class="text-[0.78rem] text-[#6b6b70] flex items-start gap-1 before:content-['→'] before:text-[#6c4de6] before:text-[0.7rem] before:mt-[0.05rem] before:shrink-0">
                {{ feat }}
              </li>
            </ul>
            <div class="flex items-center justify-between pt-3 border-t border-[rgba(13,13,18,0.08)]">
              <button class="inline-flex items-center gap-1 font-['Sora'] text-[0.75rem] font-bold tracking-[0.06em] uppercase text-[#6c4de6] bg-none border-none cursor-pointer p-0 transition-all duration-200 hover:gap-3">
                Demo ngay
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Public Features -->
        <div class="mt-8">
          <div class="font-['Sora'] text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#aaa] mb-4">Tính năng public portal</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[rgba(13,13,18,0.1)] rounded-[10px] overflow-hidden border border-[rgba(13,13,18,0.1)]">
            <div v-for="feat in publicFeatures" :key="feat.title" class="bg-[#f5f2ec] p-6 flex gap-4 transition-colors duration-200 hover:bg-white">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-base" :class="feat.iconBg">{{ feat.icon }}</div>
              <div>
                <div class="font-['Sora'] text-[0.875rem] font-bold mb-1 text-[#0d0d12]">{{ feat.title }}</div>
                <div class="text-[0.78rem] text-[#6b6b70] leading-[1.55]">{{ feat.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB: PARTNER -->
      <div v-if="activeTab === 'partner'">
        <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <!-- Sidebar -->
          <div class="bg-[#0d0d12] rounded-lg p-5 lg:sticky lg:top-20 h-fit">
            <div v-for="section in partnerMenu" :key="section.label" class="mb-6">
              <div class="font-['Sora'] text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/35 mb-2 px-2">{{ section.label }}</div>
              <button v-for="item in section.items" :key="item" class="flex items-center gap-2 px-3 py-2 rounded-[5px] cursor-pointer text-[0.82rem] text-white/65 transition-all duration-200 hover:bg-white/10 hover:text-white w-full text-left border-none bg-none">
                {{ item }}
              </button>
            </div>
          </div>
          <!-- Stats -->
          <div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div v-for="stat in partnerStats" :key="stat.label" class="bg-white border border-[rgba(13,13,18,0.1)] rounded-lg p-5 flex flex-col gap-1">
                <div class="font-['Sora'] text-[0.72rem] text-[#999] tracking-[0.05em] uppercase">{{ stat.label }}</div>
                <div class="font-['Sora'] text-[1.75rem] font-extrabold text-[#0d0d12] leading-none">{{ stat.value }}</div>
                <div class="text-[0.72rem] font-semibold" :class="stat.down ? 'text-[#e8604c]' : 'text-[#0f6e56]'">{{ stat.change }}</div>
              </div>
            </div>
            <div class="bg-white border border-[rgba(13,13,18,0.1)] rounded-lg p-5 mb-4">
              <div class="font-['Sora'] text-[0.8rem] font-bold text-[#0d0d12] mb-4">Cài đặt dịch vụ AI — Tour du lịch</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="item in partnerSettings" :key="item.label">
                  <div class="text-[0.72rem] text-[#aaa] uppercase tracking-[0.06em] mb-1 font-['Sora']">{{ item.label }}</div>
                  <div class="bg-[#f5f2ec] rounded-md px-3 py-2 text-[0.82rem]">{{ item.value }}</div>
                </div>
              </div>
            </div>
            <div class="bg-white border border-[rgba(13,13,18,0.1)] rounded-lg p-5">
              <div class="font-['Sora'] text-[0.8rem] font-bold text-[#0d0d12] mb-4">Nhúng chat — Embed code</div>
              <div class="bg-[#0d0d12] rounded-md p-4 mb-3">
                <code class="text-[0.72rem] text-[#5dcaa5] font-mono leading-[1.8] whitespace-pre-wrap">&lt;script src="https://travelai.vn/embed.js"
  data-org="your-org-id"
  data-service="tour"
  data-lang="vi"&gt;
&lt;/script&gt;</code>
              </div>
              <div class="flex gap-2">
                <button class="inline-flex items-center gap-1 font-['Sora'] text-[0.75rem] font-bold tracking-[0.06em] uppercase text-[#6c4de6] border border-[rgba(108,77,230,0.3)] px-[0.85rem] py-[0.4rem] rounded cursor-pointer bg-none transition-all hover:gap-3">Sao chép code →</button>
                <button class="inline-flex items-center gap-1 font-['Sora'] text-[0.75rem] font-bold tracking-[0.06em] uppercase text-[#e8604c] border border-[rgba(232,96,76,0.3)] px-[0.85rem] py-[0.4rem] rounded cursor-pointer bg-none transition-all hover:gap-3">Xem sub-page →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB: ADMIN -->
      <div v-if="activeTab === 'admin'">
        <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <div class="bg-[#0d0d12] rounded-lg p-5 lg:sticky lg:top-20 h-fit">
            <div v-for="section in adminMenu" :key="section.label" class="mb-6">
              <div class="font-['Sora'] text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/35 mb-2 px-2">{{ section.label }}</div>
              <button v-for="item in section.items" :key="item" class="flex items-center gap-2 px-3 py-2 rounded-[5px] cursor-pointer text-[0.82rem] text-white/65 transition-all duration-200 hover:bg-white/10 hover:text-white w-full text-left border-none bg-none">
                {{ item }}
              </button>
            </div>
          </div>
          <div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div v-for="stat in adminStats" :key="stat.label" class="bg-white border border-[rgba(13,13,18,0.1)] rounded-lg p-5 flex flex-col gap-1">
                <div class="font-['Sora'] text-[0.72rem] text-[#999] tracking-[0.05em] uppercase">{{ stat.label }}</div>
                <div class="font-['Sora'] text-[1.75rem] font-extrabold text-[#0d0d12] leading-none">{{ stat.value }}</div>
                <div class="text-[0.72rem] font-semibold" :class="stat.down ? 'text-[#e8604c]' : 'text-[#0f6e56]'">{{ stat.change }}</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
              <div class="bg-white border border-[rgba(13,13,18,0.1)] rounded-lg p-5">
                <div class="font-['Sora'] text-[0.8rem] font-bold text-[#0d0d12] mb-4">Phân bổ dịch vụ theo loại</div>
                <div v-for="row in serviceRows" :key="row.name" class="flex items-center gap-3 py-2 border-b border-[rgba(13,13,18,0.06)] last:border-0">
                  <div class="w-2 h-2 rounded-full shrink-0" :style="{ background: row.color }"></div>
                  <div class="text-[0.8rem] flex-1">{{ row.name }}</div>
                  <div class="w-20 h-1 bg-[rgba(13,13,18,0.08)] rounded-sm overflow-hidden">
                    <div class="h-full rounded-sm" :style="{ width: row.pct, background: row.color }"></div>
                  </div>
                  <div class="text-[0.75rem] font-['Sora'] font-semibold text-[#555] min-w-[40px] text-right">{{ row.pct }}</div>
                </div>
              </div>
              <div class="bg-white border border-[rgba(13,13,18,0.1)] rounded-lg p-5">
                <div class="font-['Sora'] text-[0.8rem] font-bold text-[#0d0d12] mb-4">Nhật ký gần đây</div>
                <div class="flex flex-col gap-3">
                  <div v-for="log in adminLogs" :key="log.title" class="text-[0.75rem] border-b border-[rgba(13,13,18,0.06)] pb-2 last:border-0">
                    <div class="font-semibold" :style="{ color: log.color }">{{ log.title }}</div>
                    <div class="text-[#999]">{{ log.desc }}</div>
                    <div class="text-[#bbb] text-[0.68rem]">{{ log.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- ===== AI CHAT FLOAT ===== -->
    <ClientOnly>
      <AIChatContainer />
    </ClientOnly>
    <!-- ===== END AI CHAT ===== -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AIChatContainer from '../src/components/ai-chat/AIChatContainer.vue'

definePageMeta({
  layout: 'default'
})


const activeTab = ref('public')
const activeFilter = ref('all')

const badges = [
  { icon: '⚡', text: 'Triển khai trong 24h' },
  { icon: '🌐', text: 'Nhúng mọi website' },
  { icon: '📊', text: 'Dashboard đối tác' },
]

const floatingTags = [
  { label: 'Tư vấn Tour',    bg: '#e1f5ee', color: '#0f6e56', border: '#5dcaa5', delay: '0s' },
  { label: 'Villa & Lưu trú', bg: '#f3eeff', color: '#6c4de6', border: '#c4aff5', delay: '0.6s' },
  { label: 'Tồn kho',        bg: '#fff8e6', color: '#c4841a', border: '#f0d895', delay: '1.2s' },
  { label: 'Booking tự động', bg: '#eef4ff', color: '#3b6fe8', border: '#bdd0f7', delay: '0.3s' },
  { label: 'Đối tác',        bg: '#fff0ec', color: '#e8604c', border: '#f5c4ba', delay: '0.9s' },
  { label: 'Admin Portal',   bg: '#f5f0ff', color: '#7940e0', border: '#c9b0f5', delay: '1.5s' },
  { label: '24/7 AI',        bg: '#edfff4', color: '#1a8c50', border: '#90ddb0', delay: '0.45s' },
  { label: 'Nhúng Web',      bg: '#fffbf0', color: '#a07820', border: '#e8d5a0', delay: '1.1s' },
]

const tabs = [
  { id: 'public',  label: '🌍 Public — AI Chat Service' },
  { id: 'partner', label: '🤝 Partner Portal' },
  { id: 'admin',   label: '🛡 Admin Portal' },
]

const filters = [
  { value: 'all',       label: 'Tất cả' },
  { value: 'tour',      label: 'Tour du lịch' },
  { value: 'villa',     label: 'Villa & Lưu trú' },
  { value: 'inventory', label: 'Sản phẩm tồn kho' },
]

const cards = [
  {
    num: '01', category: 'tour',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80',
    tags: [
      { label: 'Tour', class: 'bg-[#e1f5ee] text-[#0f6e56] border border-[#5dcaa5]' },
      { label: 'Public', class: 'bg-[#eef4ff] text-[#3b6fe8] border border-[#bdd0f7]' },
    ],
    title: 'Trợ lý ảo tư vấn tour du lịch',
    desc: 'Tự động tư vấn lịch trình, điểm đến, giá tour theo ngân sách; hỗ trợ đặt chỗ và xác nhận booking tức thì 24/7.',
    features: ['Gợi ý tour theo sở thích & ngân sách', 'So sánh gói tour, thời điểm tốt nhất', 'Booking và xác nhận tự động'],
  },
  {
    num: '02', category: 'villa',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80',
    tags: [
      { label: 'Villa', class: 'bg-[#f3eeff] text-[#6c4de6] border border-[#c4aff5]' },
      { label: 'Public', class: 'bg-[#eef4ff] text-[#3b6fe8] border border-[#bdd0f7]' },
    ],
    title: 'Trợ lý ảo tư vấn villa & lưu trú',
    desc: 'Giới thiệu villa, resort, homestay theo tiêu chí khách hàng; kiểm tra lịch trống, báo giá và đặt phòng trực tiếp.',
    features: ['Lọc theo vị trí, sức chứa, tiện nghi', 'Kiểm tra phòng trống theo ngày', 'Báo giá và xác nhận đặt phòng'],
  },
  {
    num: '03', category: 'inventory',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    tags: [
      { label: 'Tồn kho', class: 'bg-[#fff8e6] text-[#c4841a] border border-[#f0d895]' },
      { label: 'Public', class: 'bg-[#eef4ff] text-[#3b6fe8] border border-[#bdd0f7]' },
    ],
    title: 'Trợ lý ảo tư vấn sản phẩm tồn kho',
    desc: 'Tự động tra cứu kho hàng du lịch (phụ kiện, quà lưu niệm, combo dịch vụ), gợi ý và chốt đơn theo thời gian thực.',
    features: ['Tra cứu tồn kho theo danh mục', 'Gợi ý upsell & bundle sản phẩm', 'Đặt hàng và cập nhật tồn ngay'],
  },
]

const filteredCards = computed(() =>
  activeFilter.value === 'all' ? cards : cards.filter(c => c.category === activeFilter.value)
)

const publicFeatures = [
  { icon: '📰', iconBg: 'bg-[#f3eeff]', title: 'Trang tin tức', desc: 'Cập nhật xu hướng du lịch, khuyến mãi mới, tin tức ngành theo thời gian thực.' },
  { icon: '👤', iconBg: 'bg-[#fff0ec]', title: 'Hồ sơ người dùng', desc: 'Quản lý thông tin cá nhân, lịch sử chat và lịch sử đặt dịch vụ.' },
  { icon: '🔐', iconBg: 'bg-[#e1f5ee]', title: 'Đăng nhập / Đăng ký', desc: 'Xác thực bảo mật, hỗ trợ đăng nhập qua mạng xã hội và email.' },
  { icon: '💬', iconBg: 'bg-[#fff8e6]', title: 'Chat AI nhúng', desc: 'Widget AI sẵn sàng tích hợp trên mọi trang public, hỗ trợ đa kênh.' },
]

const partnerMenu = [
  { label: 'Tổ chức', items: ['🏢 Thiết lập tổ chức', '👤 Hồ sơ đối tác'] },
  { label: 'Dịch vụ AI', items: ['🤖 Cài đặt dịch vụ AI', '📋 Loại dịch vụ', '🔢 Giới hạn token', '📁 Dữ liệu training', '🕐 Lịch hoạt động'] },
  { label: 'Thanh toán', items: ['💳 Token billing', '💰 Nạp token'] },
  { label: 'Nhúng & Embed', items: ['🌐 Sub-page tổ chức', '🔗 Embed chat'] },
  { label: 'Báo cáo', items: ['📊 Dashboard'] },
]

const partnerStats = [
  { label: 'Token còn lại', value: '482K', change: '↑ 12% tháng này' },
  { label: 'Dịch vụ AI',   value: '3',    change: 'Tour · Villa · Kho' },
  { label: 'Chat hôm nay', value: '247',  change: '↑ 8% so hôm qua' },
  { label: 'Leads tháng',  value: '1.2K', change: '↓ 3% vs tháng trước', down: true },
]

const partnerSettings = [
  { label: 'Loại dịch vụ',        value: '🟢 Tư vấn tour du lịch' },
  { label: 'Giới hạn token / tháng', value: '200,000 tokens' },
  { label: 'Dữ liệu training',    value: '12 tài liệu · 3.4 MB' },
  { label: 'Lịch hoạt động',      value: '24/7 · Tất cả múi giờ' },
]

const adminMenu = [
  { label: 'Tổng quan', items: ['📊 Dashboard'] },
  { label: 'Quản lý', items: ['👥 Người dùng', '🤝 Đối tác', '└ Tổ chức', '└ Token đối tác', '🤖 Dịch vụ AI'] },
  { label: 'Hệ thống', items: ['⚙️ Cấu hình', '📋 Nhật ký hành động'] },
]

const adminStats = [
  { label: 'Người dùng',    value: '1,247', change: '↑ 24% tháng này' },
  { label: 'Đối tác',       value: '38',    change: '↑ 3 mới tháng này' },
  { label: 'Dịch vụ AI',    value: '114',   change: '↑ 12 dịch vụ mới' },
  { label: 'Token tiêu thụ', value: '8.4M', change: '↑ 31% so T10', down: true },
]

const serviceRows = [
  { name: 'Tư vấn Tour du lịch', color: '#0f6e56', pct: '72%' },
  { name: 'Villa & Lưu trú',     color: '#6c4de6', pct: '54%' },
  { name: 'Sản phẩm tồn kho',    color: '#c4841a', pct: '28%' },
]

const adminLogs = [
  { title: 'Đối tác mới',      color: '#0f6e56', desc: 'Công ty TNHH Du lịch Phương Nam', time: '2 phút trước' },
  { title: 'Dịch vụ kích hoạt', color: '#6c4de6', desc: 'Villa Sunrise — Nạp 500K token',  time: '15 phút trước' },
  { title: 'Cảnh báo token',   color: '#e8604c', desc: 'TourABC — còn 5% token',           time: '1 giờ trước' },
]
</script>

<style scoped>
@keyframes floatTag {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
</style>