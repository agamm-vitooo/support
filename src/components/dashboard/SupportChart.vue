<!-- src/components/dashboard/SupportChart.vue -->
<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

const chartData = computed(() => {
  const map = {}

  props.issues.forEach(item => {
    const name = item.nama_support || "Unknown"
    map[name] = (map[name] || 0) + 1
  })

  return map
})

const series = computed(() => [
  {
    name: "Issues",
    data: Object.values(chartData.value)
  }
])

const options = computed(() => ({
  chart: {
    toolbar: { show: false }
  },
  xaxis: {
    categories: Object.keys(chartData.value)
  },
  dataLabels: {
    enabled: false
  }
}))
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <h2 class="font-semibold text-gray-800 mb-4">
      Issues per Support
    </h2>

    <apexchart
      type="bar"
      height="320"
      :options="options"
      :series="series"
    />
  </div>
</template>