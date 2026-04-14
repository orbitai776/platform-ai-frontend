<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">AI Services</h2>
        <button
          @click="createService"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Tạo Service
        </button>
      </div>

      <!-- EMPTY -->
      <div v-if="services.length === 0" class="text-center text-gray-500 py-10">
        Chưa có service nào 
      </div>

      <!-- LIST -->
      <div class="space-y-4">
        <div
          v-for="s in services"
          :key="s.id"
          class="border rounded-xl p-4 flex justify-between items-center hover:shadow"
        >
          <div>
            <p class="font-semibold text-lg">{{ s.name }}</p>
            <p class="text-sm text-gray-500 break-all">
              ID: {{ s.id }}
            </p>
            <p class="text-sm text-gray-500">
              Token: {{ s.token_used }} / {{ s.token_limit }}
            </p>
          </div>

          <button
            @click="deleteService(s.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Xóa
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const services = ref([])

// GET
const fetchServices = async () => {
  try {
    const res = await fetch('/api/partner/ai-services')
    const data = await res.json()
    services.value = data.data || []
  } catch (err) {
    console.error(err)
  }
}

// POST
const createService = async () => {
  try {
    const existing = services.value.find(
      s => s.service_id === "072ce17e-dc45-4dd3-aea4-32e67f23db22"
    )

    if (existing) {
      alert("Service này đã tồn tại rồi!")
      return
    }

    const res = await fetch('/api/partner/ai-services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: "072ce17e-dc45-4dd3-aea4-32e67f23db22",
        name: 'Service ' + Date.now(),
        token_limit: 1000
      })
    })

    const data = await res.json()
    console.log(data)

    fetchServices()
  } catch (err) {
    console.error(err)
  }
}

// DELETE
const deleteService = async (id) => {
  try {
    const res = await fetch(`/api/partner/ai-services/${id}`, {
      method: 'DELETE'
    })

    const data = await res.json()
    console.log('DELETE:', data)

    fetchServices()
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchServices)
</script>