<template>
  <div class="min-h-screen bg-slate-50 px-6 py-10">
    <div class="mx-auto max-w-6xl space-y-8">

      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">
           Dashboard
          </h1>
          <p class="text-sm text-slate-500">
            System overview & analytics
          </p>
        </div>
      </div>

      <!-- STAT CARDS -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-for="card in statCards" :key="card.label"
          class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <p class="text-xs text-slate-400 uppercase">
            {{ card.label }}
          </p>

          <p class="text-xl font-bold text-slate-800 mt-1">
            {{ formatNumber(card.value) }}
          </p>

          <p class="text-xs text-slate-500 mt-1">
            {{ card.sub }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TokenChart :services="rawTopServices" />
        <BarChart :services="rawTopServices" />
      </div>

      <!-- TOP SERVICES TABLE -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-slate-800">
            Top Services
          </h2>
          <span class="text-xs text-slate-400">
            Sorted by token usage
          </span>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-sm text-slate-500">
          Loading dashboard...
        </div>

        <!-- Empty -->
        <div v-else-if="tableData.length === 0" class="text-sm text-slate-500">
          No data available
        </div>

        <!-- TABLE -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-100 text-slate-600 text-xs uppercase">
                <th class="p-3 text-left">Service</th>
                <th class="p-3 text-center">Type</th>
                <th class="p-3 text-center">Partners</th>
                <th class="p-3 text-center">Deployed</th>
                <th class="p-3 text-center">Tokens</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="s in tableData" :key="s.name" class="border-t hover:bg-slate-50 transition">
                <td class="p-3 font-medium text-slate-800">
                  {{ s.name }}
                </td>

                <td class="p-3 text-center text-blue-500">
                  {{ s.type }}
                </td>

                <td class="p-3 text-center">
                  {{ s.partners }}
                </td>

                <td class="p-3 text-center">
                  {{ s.deployed }}
                </td>

                <td class="p-3 text-center font-semibold text-purple-600">
                  {{ formatNumber(s.tokens) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboard } from '~/src/composables/useDashboard'
import { auth, signOut } from '~/src/auth/firebase'
import TokenChart from '~/src/components/admin/TokenChart'
import BarChart from '~/src/components/admin/BarChart'



const { statCards, tableData, topServices, fetchDashboard, loading } = useDashboard()
const rawTopServices = topServices

onMounted(async () => {
  await fetchDashboard()
})


const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num || 0)
}
</script>