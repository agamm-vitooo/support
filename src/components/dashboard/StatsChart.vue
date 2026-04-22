<script setup>
import { computed } from "vue"

const props = defineProps({
  issues: {
    type: Array,
    default: () => []
  }
})

const total = computed(() => props.issues.length)

const done = computed(() =>
  props.issues.filter(i => i.status === "Done").length
)

const pending = computed(() =>
  props.issues.filter(i => i.status === "Pending").length
)

const supports = computed(() => {
  const names = props.issues.map(i => i.nama_support).filter(Boolean)
  return new Set(names).size
})
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Total</p>
      <h2 class="text-xl font-semibold text-gray-800 mt-1">
        {{ total }}
      </h2>
    </div>

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Done</p>
      <h2 class="text-xl font-semibold text-green-600 mt-1">
        {{ done }}
      </h2>
    </div>

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Pending</p>
      <h2 class="text-xl font-semibold text-yellow-500 mt-1">
        {{ pending }}
      </h2>
    </div>

    <div class="bg-white rounded-xl p-3 shadow-sm">
      <p class="text-xs text-gray-500">Support</p>
      <h2 class="text-xl font-semibold text-blue-600 mt-1">
        {{ supports }}
      </h2>
    </div>

  </div>
</template>