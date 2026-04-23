<template>
  <div class="min-h-screen bg-gray-100 flex justify-center">
    <div class="w-full max-w-5xl px-4 py-10">

      <!-- Title -->
      <h2 class="text-gray-900 text-xl font-semibold mb-6 text-center">
        Organizations
      </h2>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading organizations...
      </div>

      <!-- LIST -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="org in paginatedOrganizations"
          :key="org.id"
          @click="selectedOrg = org"
          class="cursor-pointer border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-gray-900 font-semibold text-lg">
              {{ org.name }}
            </h3>

            <span :class="statusClass(org.status)">
              {{ org.status }}
            </span>
          </div>

          <p class="text-gray-600 text-sm mt-1">
            Owner: {{ org.ownerName || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- PAGINATION -->
      <div class="mt-10 border-t border-gray-200 pt-4">
        <div class="flex items-center justify-between">

          <!-- TEXT -->
          <p class="text-sm text-gray-600">
            Showing
            <span class="font-medium">{{ startItem }}</span>
            to
            <span class="font-medium">{{ endItem }}</span>
            of
            <span class="font-medium">{{ organizations.length }}</span>
            results
          </p>

          <!-- CONTROLS -->
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">

            <!-- Prev -->
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-2 py-2 border border-gray-300 bg-white text-gray-400 rounded-l-md hover:bg-gray-50 disabled:opacity-40"
            >
              ‹
            </button>

            <!-- Pages -->
            <button
              v-for="p in visiblePages"
              :key="p"
              @click="changePage(p)"
              :class="[
                'px-4 py-2 text-sm border',
                currentPage === p
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ p }}
            </button>

            <!-- Next -->
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-2 py-2 border border-gray-300 bg-white text-gray-400 rounded-r-md hover:bg-gray-50 disabled:opacity-40"
            >
              ›
            </button>

          </nav>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <transition name="fade">
      <div
        v-if="selectedOrg"
        @click.self="selectedOrg = null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">

          <!-- Close -->
          <button
            @click="selectedOrg = null"
            class="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>

          <!-- Title -->
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            {{ selectedOrg.name }}
          </h3>

          <!-- Detail -->
          <div class="space-y-2 text-sm text-gray-700">
            <p><strong>Status:</strong> {{ selectedOrg.status }}</p>
            <p><strong>Owner:</strong> {{ selectedOrg.ownerName || 'N/A' }}</p>
            <p><strong>Email:</strong> {{ selectedOrg.email }}</p>
            <p><strong>Phone:</strong> {{ selectedOrg.phone || 'N/A' }}</p>
            <p><strong>Address:</strong> {{ selectedOrg.address }}</p>
            <p><strong>Description:</strong> {{ selectedOrg.description || 'No description' }}</p>
            <p><strong>Created:</strong> {{ formatDate(selectedOrg.createdAt) }}</p>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useOrganization } from '/src/composables/useOrganization'

const { organizations, fetchOrganizations, loading } = useOrganization()

const currentPage = ref(1)
const pageSize = 5

// MODAL
const selectedOrg = ref(null)


onMounted(async () => {
  await fetchOrganizations()
})

// PAGINATION 
const totalPages = computed(() =>
  Math.ceil(organizations.value.length / pageSize)
)

const paginatedOrganizations = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return organizations.value.slice(start, start + pageSize)
})

// PAGE RANGE
const startItem = computed(() =>
  (currentPage.value - 1) * pageSize + 1
)

const endItem = computed(() =>
  Math.min(currentPage.value * pageSize, organizations.value.length)
)

// CHANGE PAGE
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  selectedOrg.value = null
}

// SIMPLE PAGE LIST
const visiblePages = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1)
)

// UTILS
const formatDate = (d) => new Date(d).toLocaleString()

const statusClass = (s) => ({
  active: 'text-green-600 bg-green-100 px-2 py-1 rounded-md text-sm font-medium',
  pending: 'text-purple-600 bg-purple-100 px-2 py-1 rounded-md text-sm font-medium',
  suspended: 'text-orange-600 bg-orange-100 px-2 py-1 rounded-md text-sm font-medium',
  inactive: 'text-red-600 bg-red-100 px-2 py-1 rounded-md text-sm font-medium'
}[s] || 'text-gray-600')

definePageMeta({
  layout: 'layout-admin'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>