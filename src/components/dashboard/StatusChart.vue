<!-- src/components/dashboard/StatusChart.vue -->
<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

/* =========================
   STATUS COUNT
========================= */
const selesai = computed(() =>
  props.issues.filter(
    i => String(i.status || "").trim().toLowerCase() === "selesai"
  ).length
)

const progress = computed(() =>
  props.issues.filter(
    i => String(i.status || "").trim().toLowerCase() === "progress"
  ).length
)

const open = computed(() =>
  props.issues.filter(
    i => String(i.status || "").trim().toLowerCase() === "open"
  ).length
)

/* =========================
   CHART SERIES
========================= */
const series = computed(() => [
  selesai.value,
  progress.value,
  open.value
])

/* =========================
   CHART OPTIONS
========================= */
const options = computed(() => ({
  chart: {
    toolbar: {
      show: false
    }
  },
  labels: ["Selesai", "Progress", "Open"],
  colors: ["#22c55e", "#eab308", "#ef4444"],
  legend: {
    position: "bottom"
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    width: 0
  }
}))
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <h2 class="font-semibold text-gray-800 mb-4">
      Status Issues
    </h2>

    <apexchart
      v-if="issues.length"
      type="donut"
      height="320"
      :options="options"
      :series="series"
    />

    <div
      v-else
      class="h-[320px] flex items-center justify-center text-sm text-gray-400"
    >
      Belum ada data
    </div>
  </div>
</template>