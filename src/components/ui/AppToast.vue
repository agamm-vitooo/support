<!-- src/components/ui/AppToast.vue -->
<script setup>
defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: "success" // success error warning info
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed top-5 right-5 z-[60] min-w-[280px] max-w-sm rounded-2xl shadow-xl px-4 py-3 text-white"
      :class="{
        'bg-green-600': type === 'success',
        'bg-red-600': type === 'error',
        'bg-yellow-500': type === 'warning',
        'bg-blue-600': type === 'info'
      }"
    >
      <p class="text-sm font-medium">
        {{ message }}
      </p>
    </div>
  </Transition>
</template>