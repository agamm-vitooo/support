<!-- src/components/ImageModal.vue -->
<script setup>
import { X } from "lucide-vue-next"

defineProps({
  show: Boolean,
  image: String
})

const emit = defineEmits(["close"])
</script>

<template>
  <Teleport to="body">

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show && image"
        class="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
        @click="emit('close')"
      >

        <!-- close -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        >
          <X class="w-6 h-6" />
        </button>

        <!-- image -->
        <div
          class="max-w-full max-h-full"
          @click.stop
        >
          <img
            :src="image"
            class="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"
          />
        </div>

      </div>
    </Transition>

  </Teleport>
</template>