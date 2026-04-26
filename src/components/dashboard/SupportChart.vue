<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

/* =========================
   NORMALIZE TEXT
========================= */
const normalizeText = (text) => {
  return (text || "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
}

/* =========================
   FORMAT LABEL
========================= */
const formatName = (text) => {
  const clean = normalizeText(text)

  if (!clean) return "Unknown"

  return clean
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/* =========================
   GROUP BY PIC SUPPORT
========================= */
const chartData = computed(() => {
  const map = {}

  props.issues.forEach((item) => {
    const rawPIC = item.pic_support || "Unknown"

    const key = normalizeText(rawPIC) || "unknown"
    const label = key === "unknown"
      ? "Unknown"
      : formatName(rawPIC)

    if (!map[key]) {
      map[key] = {
        label,
        total: 0
      }
    }

    map[key].total++
  })

  return Object.values(map).sort((a, b) => b.total - a.total)
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
    toolbar: { show: false },
    fontFamily: "Inter, sans-serif"
  },

  plotOptions: {
    bar: {
      borderRadius: 8,
      distributed: true,
      columnWidth: "45%"
    }
  },

  colors: [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6"
  ],

  xaxis: {
    categories: chartData.value.map((item) => item.label),
    labels: {
      style: {
        fontSize: "12px"
      }
    }
  },

  yaxis: {
    labels: {
      formatter: (val) => Math.floor(val)
    }
  },

  dataLabels: {
    enabled: false
  },

  tooltip: {
    y: {
      formatter: (val) => `${val} issues handled`
    }
  },

  grid: {
    strokeDashArray: 4
  },

  legend: {
    show: false
  }
}))
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

    <h2 class="font-semibold text-gray-800 mb-4">
      Issues per PIC Support
    </h2>

    <apexchart
      type="bar"
      height="320"
      :options="options"
      :series="series"
    />

  </div>
</template>