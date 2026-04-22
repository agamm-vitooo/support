<!-- src/components/FilterBar.vue -->
<script setup>
defineProps({
  keyword: String,
  startDate: String,
  endDate: String
})

const emit = defineEmits([
  "update:keyword",
  "update:startDate",
  "update:endDate"
])

const resetFilter = () => {
  emit("update:startDate", "")
  emit("update:endDate", "")
}
</script>

<template>
  <div class="bg-white rounded-2xl p-3 mb-4 border border-gray-200">

    <div class="grid md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-center">

      <!-- SEARCH -->
      <input
        :value="keyword"
        @input="emit('update:keyword', $event.target.value)"
        type="text"
        placeholder="Cari issue..."
        class="w-full px-4 py-2 text-sm rounded-xl border border-gray-200
               focus:border-blue-500 focus:ring-2 focus:ring-blue-100
               outline-none transition"
      />

      <!-- FROM -->
      <input
        :value="startDate"
        @input="emit('update:startDate', $event.target.value)"
        type="date"
        class="w-full px-3 py-2 text-sm rounded-xl border border-gray-200
               focus:border-blue-500 focus:ring-2 focus:ring-blue-100
               outline-none transition"
      />

      <!-- TO -->
      <input
        :value="endDate"
        @input="emit('update:endDate', $event.target.value)"
        type="date"
        class="w-full px-3 py-2 text-sm rounded-xl border border-gray-200
               focus:border-blue-500 focus:ring-2 focus:ring-blue-100
               outline-none transition"
      />

      <!-- RESET -->
      <button
        @click="resetFilter"
        class="px-3 py-2 text-sm rounded-xl border border-gray-200
               text-gray-500 hover:text-blue-600 hover:border-blue-500
               bg-white transition whitespace-nowrap"
      >
        Reset
      </button>

    </div>

  </div>
</template>