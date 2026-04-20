<template>
    <div class="bg-white p-4 rounded-xl border">
        <h3 class="text-sm font-semibold mb-2">Token Usage by Service</h3>
        <Doughnut :data="chartData" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
    services: Array
})

const chartData = computed(() => ({
    labels: props.services.map(s => s.name),
    datasets: [
        {
            data: props.services.map(s => s.token_used),
            backgroundColor: [
                '#6366f1', // indigo
                '#22c55e', // green
                '#f59e0b', // amber
                '#ef4444', // red
                '#06b6d4'  // cyan
            ],
            borderWidth: 1
        }
    ]
}))
</script>