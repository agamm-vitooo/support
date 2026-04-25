<!-- src/components/dashboard/SupportChart.vue -->
<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

/* =========================
   NORMALIZE NAME
   erna / Erna / ERNA => erna
========================= */
const normalizeText = (text) => {
  return (text || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
}

/* =========================
   FORMAT NAME
   erna => Erna
========================= */
const formatName = (text) => {
  const clean = normalizeText(text)

  return clean.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  )
}

/* =========================
   GROUP DATA
========================= */
const chartData = computed(() => {
  const map = {}

  props.issues.forEach((item) => {
    const rawName = item.nama_support || "Unknown"

    const key = normalizeText(rawName) || "unknown"
    const label =
      key === "unknown"
        ? "Unknown"
        : formatName(rawName)

    if (!map[key]) {
      map[key] = {
        label,
        total: 0
      }
    }

    map[key].total++
  })

  return Object.values(map)
})

/* =========================
   SERIES
========================= */
const series = computed(() => [
  {
    name: "Issues",
    data: chartData.value.map((item) => item.total)
  }
])

/* =========================
   OPTIONS
========================= */
const options = computed(() => ({
  chart: {
    toolbar: { show: false }
  },

  plotOptions: {
    bar: {
      borderRadius: 6,
      distributed: true
    }
  },

  xaxis: {
    categories: chartData.value.map((item) => item.label)
  },

  dataLabels: {
    enabled: false
  },

  tooltip: {
    y: {
      formatter: (val) => `${val} issue`
    }
  },

  legend: {
    show: false
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