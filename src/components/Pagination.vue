<!-- src/components/Pagination.vue -->
<script setup>
defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(["change-page"])

const goTo = (page) => {
  if (page < 1) return
  emit("change-page", page)
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="mt-6 flex flex-wrap items-center justify-center gap-2"
  >
    <!-- Prev -->
    <button
      @click="goTo(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 rounded-xl border text-sm transition
             disabled:opacity-40 disabled:cursor-not-allowed
             hover:bg-blue-600 hover:text-white"
    >
      Prev
    </button>

    <!-- Number -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goTo(page)"
      class="w-10 h-10 rounded-xl border text-sm font-medium transition"
      :class="
        currentPage === page
          ? 'bg-blue-600 text-white border-blue-600'
          : 'hover:bg-gray-100 border-gray-200'
      "
    >
      {{ page }}
    </button>

    <!-- Next -->
    <button
      @click="goTo(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 rounded-xl border text-sm transition
             disabled:opacity-40 disabled:cursor-not-allowed
             hover:bg-blue-600 hover:text-white"
    >
      Next
    </button>
  </div>
</template>