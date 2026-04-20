<template>
    <div class="bg-white p-4 rounded-xl border">
        <h3 class="text-sm font-semibold mb-2">Top Services</h3>
        <Bar :data="chartData" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
    services: Array
})

const chartData = computed(() => ({
    labels: props.services.map(s => s.name),
    datasets: [
        {
            label: 'Tokens',
            data: props.services.map(s => s.token_used),
            backgroundColor: [
                '#6366f1',
                '#22c55e',
                '#f59e0b',
                '#ef4444',
                '#06b6d4'
            ],
            borderRadius: 6
        }
    ]
}))
</script>