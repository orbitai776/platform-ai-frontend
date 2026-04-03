<template>
  <div class="min-h-screen bg-slate-50 p-6 font-sans">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
      <p class="text-slate-400 text-sm mt-1">Welcome back, Admin · {{ today }}</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        v-for="card in statCards"
        :key="card.label"
        :class="`rounded-2xl p-5 text-white relative overflow-hidden ${card.bg}`"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="text-3xl font-bold tracking-tight">{{ card.value }}</p>
            <p class="text-sm mt-1 opacity-80">{{ card.label }}</p>
          </div>
          <button class="opacity-60 hover:opacity-100 transition text-lg">⋯</button>
        </div>
        <div class="mt-3 flex items-center gap-1 text-xs font-medium">
          <span :class="card.trend > 0 ? 'text-green-200' : 'text-red-200'">
            {{ card.trend > 0 ? '↑' : '↓' }} {{ Math.abs(card.trend) }}%
          </span>
          <span class="opacity-60">vs last month</span>
        </div>
        <!-- Mini sparkline decoration -->
        <div class="absolute bottom-0 right-0 opacity-20">
          <svg width="100" height="50" viewBox="0 0 100 50">
            <polyline
              :points="card.sparkline"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Traffic Chart + Stats row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

      <!-- Traffic Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="font-semibold text-slate-800">Traffic</h2>
            <p class="text-xs text-slate-400">January – July 2024</p>
          </div>
          <div class="flex gap-1">
            <button
              v-for="t in ['Day','Month','Year']"
              :key="t"
              @click="activeTab = t"
              :class="`px-3 py-1 rounded-lg text-xs font-medium transition ${activeTab === t ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`"
            >
              {{ t }}
            </button>
          </div>
        </div>
        <!-- SVG Chart -->
        <svg viewBox="0 0 600 180" class="w-full" preserveAspectRatio="none">
          <!-- Grid lines -->
          <line v-for="y in [30,80,130]" :key="y" x1="0" :y1="y" x2="600" :y2="y" stroke="#f1f5f9" stroke-width="1"/>
          <!-- Y labels -->
          <text x="5" y="28" fill="#94a3b8" font-size="10">250</text>
          <text x="5" y="78" fill="#94a3b8" font-size="10">150</text>
          <text x="5" y="128" fill="#94a3b8" font-size="10">50</text>
          <!-- Area fill blue -->
          <path :d="areaPath" fill="url(#blueGrad)" opacity="0.3"/>
          <!-- Line blue -->
          <polyline :points="blueLine" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Line green -->
          <polyline :points="greenLine" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Red dashed threshold -->
          <line x1="0" y1="120" x2="600" y2="120" stroke="#ef4444" stroke-width="1" stroke-dasharray="6,4"/>
          <!-- X labels -->
          <text v-for="(m, i) in months" :key="m" :x="i * 86 + 30" y="175" fill="#94a3b8" font-size="10" text-anchor="middle">{{ m }}</text>
          <!-- Gradient def -->
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b82f6"/>
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <!-- Legend -->
        <div class="flex gap-4 mt-2">
          <span class="flex items-center gap-1 text-xs text-slate-500"><span class="w-3 h-1 bg-blue-500 rounded inline-block"></span>New Clients</span>
          <span class="flex items-center gap-1 text-xs text-slate-500"><span class="w-3 h-1 bg-emerald-500 rounded inline-block"></span>Recurring</span>
          <span class="flex items-center gap-1 text-xs text-slate-500"><span class="w-3 h-1 bg-red-400 rounded inline-block border-dashed border"></span>Threshold</span>
        </div>
      </div>

      <!-- Right stats panel -->
      <div class="flex flex-col gap-4">

        <!-- Traffic & Sales -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 class="font-semibold text-slate-800 text-sm mb-3">Traffic & Sales</h3>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div v-for="s in trafficStats" :key="s.label">
              <div class="flex items-center gap-1 mb-1">
                <span class="w-1 h-4 rounded-full" :style="`background:${s.color}`"></span>
                <span class="text-xs text-slate-400">{{ s.label }}</span>
              </div>
              <p class="text-lg font-bold text-slate-800">{{ s.value }}</p>
            </div>
          </div>
          <!-- Gender bars -->
          <div class="space-y-2">
            <div v-for="g in genderStats" :key="g.label" class="flex items-center gap-2">
              <span class="text-xs text-slate-500 w-12">{{ g.label }}</span>
              <div class="flex-1 bg-slate-100 rounded-full h-1.5">
                <div class="h-1.5 rounded-full" :style="`width:${g.pct}%; background:${g.color}`"></div>
              </div>
              <span class="text-xs text-slate-500 w-6">{{ g.pct }}%</span>
            </div>
          </div>
        </div>

        <!-- Source breakdown -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1">
          <h3 class="font-semibold text-slate-800 text-sm mb-3">Traffic Sources</h3>
          <div class="space-y-3">
            <div v-for="src in sources" :key="src.name" class="flex items-center gap-2">
              <span class="text-base">{{ src.icon }}</span>
              <div class="flex-1">
                <div class="flex justify-between mb-0.5">
                  <span class="text-xs text-slate-600">{{ src.name }}</span>
                  <span class="text-xs text-slate-400">{{ src.count }} ({{ src.pct }}%)</span>
                </div>
                <div class="bg-slate-100 rounded-full h-1.5">
                  <div class="h-1.5 rounded-full bg-emerald-500" :style="`width:${src.pct}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Metrics Row -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
      <div v-for="m in metrics" :key="m.label" class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
        <p class="text-base font-bold text-slate-800">{{ m.value }}</p>
        <p class="text-xs text-slate-400 mt-0.5">{{ m.label }}</p>
        <div class="mt-2 bg-slate-100 rounded-full h-1">
          <div class="h-1 rounded-full" :style="`width:${m.pct}%; background:${m.color}`"></div>
        </div>
      </div>
    </div>

    <!-- Social Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        v-for="s in socialCards"
        :key="s.name"
        :class="`rounded-2xl p-5 text-white relative overflow-hidden`"
        :style="`background:${s.bg}`"
      >
        <div class="text-3xl mb-2">{{ s.icon }}</div>
        <div class="flex gap-4 text-sm font-bold">
          <div>
            <p>{{ s.v1 }}</p>
            <p class="text-xs font-normal opacity-70">{{ s.l1 }}</p>
          </div>
          <div>
            <p>{{ s.v2 }}</p>
            <p class="text-xs font-normal opacity-70">{{ s.l2 }}</p>
          </div>
        </div>
        <!-- wave decoration -->
        <svg class="absolute bottom-0 right-0 opacity-20" width="80" height="40" viewBox="0 0 80 40">
          <path d="M0 30 Q20 10 40 25 Q60 40 80 15" fill="none" stroke="white" stroke-width="2"/>
        </svg>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-semibold text-slate-800">Users</h3>
        <div class="flex gap-2">
          <input
            v-model="search"
            placeholder="Search user..."
            class="text-xs border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-blue-400 w-40"
          />
          <select v-model="filterStatus" class="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
            <th class="text-left px-5 py-3 font-medium">User</th>
            <th class="text-left px-5 py-3 font-medium">Country</th>
            <th class="text-left px-5 py-3 font-medium">Usage</th>
            <th class="text-left px-5 py-3 font-medium">Payment</th>
            <th class="text-left px-5 py-3 font-medium">Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.name"
            class="border-t border-slate-50 hover:bg-slate-50 transition"
          >
            <td class="px-5 py-3">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" :style="`background:${user.avatarColor}`">
                    {{ user.name[0] }}
                  </div>
                  <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" :class="user.status === 'Active' ? 'bg-green-400' : 'bg-slate-300'"></span>
                </div>
                <div>
                  <p class="font-medium text-slate-800 text-sm">{{ user.name }}</p>
                  <p class="text-xs text-slate-400">{{ user.type }} · {{ user.registered }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-3">
              <span class="text-base">{{ user.flag }}</span>
            </td>
            <td class="px-5 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-slate-700 w-8">{{ user.usage }}%</span>
                <div class="flex-1 w-24 bg-slate-100 rounded-full h-1.5">
                  <div class="h-1.5 rounded-full" :style="`width:${user.usage}%; background:${user.usageColor}`"></div>
                </div>
                <span class="text-xs text-slate-400 hidden xl:block">{{ user.period }}</span>
              </div>
            </td>
            <td class="px-5 py-3">
              <span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">{{ user.payment }}</span>
            </td>
            <td class="px-5 py-3">
              <p class="text-xs text-slate-400">Last login</p>
              <p class="text-xs font-semibold text-slate-700">{{ user.lastLogin }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <p class="text-xs text-slate-400">Showing {{ filteredUsers.length }} of {{ users.length }} users</p>
        <div class="flex gap-1">
          <button
            v-for="p in 3" :key="p"
            @click="page = p"
            :class="`w-7 h-7 rounded-lg text-xs font-medium transition ${page === p ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`"
          >{{ p }}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── Date ──────────────────────────────────────────
const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

// ── Stat Cards ────────────────────────────────────
const statCards = [
  { label: 'Total Users',     value: '12,480',    trend: -12.4, bg: 'bg-gradient-to-br from-violet-500 to-purple-700', sparkline: '10,40 25,30 40,35 55,20 70,28 85,15 100,22' },
  {  label: 'Partners',        value: '348', trend:  40.9, bg: 'bg-gradient-to-br from-blue-400 to-blue-600',    sparkline: '10,40 25,35 40,25 55,30 70,20 85,25 100,15' },
  { label: 'Organizations',   value: '92',  trend:  84.7, bg: 'bg-gradient-to-br from-amber-400 to-orange-500', sparkline: '10,35 25,30 40,38 55,25 70,30 85,20 100,28' },
  { label: 'Active Services', value: '27',    trend: -23.6, bg: 'bg-gradient-to-br from-rose-400 to-red-600',     sparkline: '10,20 25,35 40,25 55,40 70,30 85,38 100,42' },
]

// ── Traffic Chart ─────────────────────────────────
const activeTab = ref('Month')
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const blueData  = [170, 140, 200, 190, 95, 130, 95]
const greenData = [150, 165, 170, 185, 100, 115, 185]

function toPoints(data) {
  return data.map((v, i) => `${i * 86 + 30},${170 - v}`).join(' ')
}

const blueLine  = computed(() => toPoints(blueData))
const greenLine = computed(() => toPoints(greenData))
const areaPath  = computed(() => {
  const pts = blueData.map((v, i) => `${i * 86 + 30},${170 - v}`)
  return `M30,170 L${pts.join(' L')} L${6 * 86 + 30},170 Z`
})

// ── Traffic Stats ─────────────────────────────────
const trafficStats = [
  { label: 'New Clients',       value: '9,123',  color: '#3b82f6' },
  { label: 'Recurring Clients', value: '22,643', color: '#ef4444' },
  { label: 'Pageviews',         value: '78,623', color: '#f59e0b' },
  { label: 'Organic',           value: '49,123', color: '#10b981' },
]

const genderStats = [
  { label: 'Male',   pct: 53, color: '#f59e0b' },
  { label: 'Female', pct: 43, color: '#f59e0b' },
]

const sources = [
  { icon: '🔍', name: 'Organic Search', count: '191,235', pct: 56 },
  { icon: '📘', name: 'Facebook',        count: '51,223',  pct: 15 },
  { icon: '🐦', name: 'Twitter',         count: '37,564',  pct: 11 },
  { icon: '💼', name: 'LinkedIn',        count: '27,319',  pct: 8  },
]

// ── Metrics ───────────────────────────────────────
const metrics = [
  { label: 'Visits',      value: '29.7K (40%)',  pct: 40, color: '#10b981' },
  { label: 'Unique',      value: '24.1K (20%)',  pct: 20, color: '#3b82f6' },
  { label: 'Pageviews',   value: '78.7K (60%)',  pct: 60, color: '#f59e0b' },
  { label: 'New Users',   value: '22.1K (80%)',  pct: 80, color: '#ef4444' },
  { label: 'Bounce Rate', value: '40.15%',        pct: 40, color: '#8b5cf6' },
]

// ── Social Cards ──────────────────────────────────
const socialCards = [
  { icon: '📘', name: 'Facebook', bg: '#1877f2', v1: '89K',  l1: 'Friends',   v2: '459',   l2: 'Feeds'    },
  { icon: '🐦', name: 'Twitter',  bg: '#1da1f2', v1: '973K', l1: 'Followers', v2: '1,792', l2: 'Tweets'   },
  { icon: '💼', name: 'LinkedIn', bg: '#2563eb', v1: '500',  l1: 'Contacts',  v2: '1,292', l2: 'Feeds'    },
  { icon: '📅', name: 'Events',   bg: '#f59e0b', v1: '12+',  l1: 'Events',    v2: '4',     l2: 'Meetings' },
]

// ── Users Table ───────────────────────────────────
const search = ref('')
const filterStatus = ref('')
const page = ref(1)

const users = [
  { name: 'Yiorgos Avraamu',  type: 'New',       registered: 'Jan 10, 2024', flag: '🇺🇸', usage: 50, usageColor: '#10b981', period: 'Jun–Jul 2024', payment: 'Mastercard', lastLogin: '10 seconds ago', status: 'Active',   avatarColor: '#6366f1' },
  { name: 'Avram Tarasios',   type: 'Recurring', registered: 'Jan 10, 2024', flag: '🇧🇷', usage: 22, usageColor: '#3b82f6', period: 'Jun–Jul 2024', payment: 'Visa',       lastLogin: '5 minutes ago',  status: 'Inactive', avatarColor: '#f59e0b' },
  { name: 'Quintin Ed',       type: 'New',       registered: 'Jan 10, 2024', flag: '🇮🇳', usage: 74, usageColor: '#f59e0b', period: 'Jun–Jul 2024', payment: 'Stripe',     lastLogin: '1 hour ago',     status: 'Active',   avatarColor: '#10b981' },
  { name: 'Enéas Kwadwo',     type: 'New',       registered: 'Jan 10, 2024', flag: '🇫🇷', usage: 98, usageColor: '#ef4444', period: 'Jun–Jul 2024', payment: 'PayPal',     lastLogin: '1 week ago',     status: 'Inactive', avatarColor: '#8b5cf6' },
  { name: 'Agapetus Tadeáš',  type: 'New',       registered: 'Jan 10, 2024', flag: '🇪🇸', usage: 22, usageColor: '#8b5cf6', period: 'Jun–Jul 2024', payment: 'Apple Pay',  lastLogin: '3 months ago',   status: 'Active',   avatarColor: '#ec4899' },
  { name: 'Friderik Dávid',   type: 'New',       registered: 'Jan 10, 2024', flag: '🇵🇱', usage: 43, usageColor: '#10b981', period: 'Jun–Jul 2024', payment: 'Amex',       lastLogin: '1 year ago',     status: 'Active',   avatarColor: '#14b8a6' },
  { name: 'Nguyen Van A',     type: 'New',       registered: 'Feb 01, 2024', flag: '🇻🇳', usage: 61, usageColor: '#3b82f6', period: 'Jun–Jul 2024', payment: 'Visa',       lastLogin: '2 days ago',     status: 'Active',   avatarColor: '#f97316' },
  { name: 'Tran Thi B',       type: 'Recurring', registered: 'Mar 15, 2024', flag: '🇻🇳', usage: 35, usageColor: '#ef4444', period: 'Jun–Jul 2024', payment: 'Stripe',     lastLogin: '4 hours ago',    status: 'Inactive', avatarColor: '#06b6d4' },
]

const filteredUsers = computed(() =>
  users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = filterStatus.value ? u.status === filterStatus.value : true
    return matchSearch && matchStatus
  })
)
</script>