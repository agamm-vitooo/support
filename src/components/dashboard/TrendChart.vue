<!-- src/components/dashboard/TrendChart.vue -->
<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

/* =========================
   GROUP BY tgl_tiket
========================= */
const chartData = computed(() => {
  const map = {}

  props.issues.forEach(item => {
    const date = item.tgl_tiket
      ? String(item.tgl_tiket).slice(0, 10)
      : "Unknown"

    map[date] = (map[date] || 0) + 1
  })

  return map
})

/* =========================
   SORT DATE
========================= */
const sortedDates = computed(() =>
  Object.keys(chartData.value)
    .filter(date => date !== "Unknown")
    .sort()
)

/* =========================
   SERIES
========================= */
const series = computed(() => [
  {
    name: "Issues",
    data: sortedDates.value.map(
      date => chartData.value[date]
    )
  }
])

/* =========================
   OPTIONS
========================= */
const options = computed(() => ({
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  xaxis: {
    categories: sortedDates.value,
    labels: {
      rotate: -45
    }
  },
  stroke: {
    curve: "smooth",
    width: 3
  },
  markers: {
    size: 4
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    y: {
      formatter: val => `${val} issue`
    }
  },
  grid: {
    borderColor: "#f1f5f9"
  }
}))
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

    <h2 class="font-semibold text-gray-800 mb-4">
      Issues Over Time
    </h2>

    <apexchart
      v-if="issues.length"
      type="line"
      height="260"
      :options="options"
      :series="series"
    />

    <div
      v-else
      class="h-[260px] flex items-center justify-center text-sm text-gray-400"
    >
      Belum ada data
    </div>

  </div>
</template>