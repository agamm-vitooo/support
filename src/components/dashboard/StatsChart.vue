<script setup>
import { computed, watch } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

watch(
  () => props.issues,
  (val) => {
    console.log("DATA:", val)
    console.log("STATUS:", val.map(i => i.status))
  },
  { immediate: true }
)

const total = computed(() => props.issues.length)

const selesai = computed(() =>
  props.issues.filter(
    i => String(i.status).trim().toLowerCase() === "selesai"
  ).length
)

const progress = computed(() =>
  props.issues.filter(
    i => String(i.status).trim().toLowerCase() === "progress"
  ).length
)

const open = computed(() =>
  props.issues.filter(
    i => String(i.status).trim().toLowerCase() === "open"
  ).length
)
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Total</p>
      <h2 class="text-xl font-semibold">{{ total }}</h2>
    </div>

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Selesai</p>
      <h2 class="text-xl font-semibold text-green-600">{{ selesai }}</h2>
    </div>

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Progress</p>
      <h2 class="text-xl font-semibold text-yellow-500">{{ progress }}</h2>
    </div>

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Open</p>
      <h2 class="text-xl font-semibold text-red-600">{{ open }}</h2>
    </div>

  </div>
</template>