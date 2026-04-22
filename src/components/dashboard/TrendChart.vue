<!-- src/components/dashboard/TrendChart.vue -->
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
    const date = item.tanggal
      ? String(item.tanggal).slice(0, 10)
      : "Unknown"

    map[date] = (map[date] || 0) + 1
  })

  return map
})

const sortedDates = computed(() =>
  Object.keys(chartData.value).sort()
)

const series = computed(() => [
  {
    name: "Issues",
    data: sortedDates.value.map(date => chartData.value[date])
  }
])

const options = computed(() => ({
  chart: {
    toolbar: { show: false }
  },
  xaxis: {
    categories: sortedDates.value
  },
  stroke: {
    curve: "smooth",
    width: 2   // diperkecil dari 3 → 2
  },
  dataLabels: {
    enabled: false
  }
}))
</script>

<template>
  <div class="bg-white rounded-lg p-3 shadow-sm">

    <h2 class="font-semibold text-gray-700 mb-2 text-sm">
      Issues Over Time
    </h2>

    <apexchart
      type="line"
      height="220"
      :options="options"
      :series="series"
    />
  </div>
</template>