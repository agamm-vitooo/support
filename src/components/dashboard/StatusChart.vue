<!-- src/components/dashboard/StatusChart.vue -->
<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

const series = computed(() => [
  props.issues.filter(i => i.status === "Done").length,
  props.issues.filter(i => i.status === "Pending").length
])

const options = computed(() => ({
  labels: ["Done", "Pending"],
  colors: ["#22c55e", "#eab308"],
  legend: {
    position: "bottom"
  },
  dataLabels: {
    enabled: true
  }
}))
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <h2 class="font-semibold text-gray-800 mb-4">
      Status Issues
    </h2>

    <apexchart
      type="donut"
      height="320"
      :options="options"
      :series="series"
    />
  </div>
</template>