<!-- src/components/ui/ConfirmDialog.vue -->
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "Konfirmasi"
  },
  message: {
    type: String,
    default: "Apakah Anda yakin?"
  },
  confirmText: {
    type: String,
    default: "Ya"
  },
  cancelText: {
    type: String,
    default: "Batal"
  },
  loading: {
    type: Boolean,
    default: false
  },
  danger: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["close", "confirm"])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      @click="emit('close')"
    >
      <div
        class="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
        @click.stop
      >
        <!-- Title -->
        <h2 class="text-lg font-bold text-gray-800 mb-2">
          {{ title }}
        </h2>

        <!-- Message -->
        <p class="text-sm text-gray-500 leading-relaxed mb-6">
          {{ message }}
        </p>

        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <button
            @click="emit('close')"
            class="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            {{ cancelText }}
          </button>

          <button
            @click="emit('confirm')"
            :disabled="loading"
            :class="danger
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'"
            class="px-4 py-2 rounded-xl text-white disabled:opacity-60 transition"
          >
            {{ loading ? "Memproses..." : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>