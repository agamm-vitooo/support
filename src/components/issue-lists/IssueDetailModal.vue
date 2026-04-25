<!-- src/components/IssueDetailModal.vue -->
<script setup>
import { ref } from "vue"
import { X, ZoomIn } from "lucide-vue-next"
import ImageModal from "./ImageModal.vue"

defineProps({
  show: Boolean,
  issue: Object
})

const emit = defineEmits(["close"])

const showImage = ref(false)
</script>

<template>
  <Teleport to="body">

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="show && issue"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        @click="emit('close')"
      >

        <div
          class="relative bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col"
          @click.stop
        >

          <!-- close -->
          <button
            @click="emit('close')"
            class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white text-gray-700 shadow-md flex items-center justify-center transition"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- image -->
          <div
            v-if="issue.foto"
            class="relative group cursor-pointer"
            @click="showImage = true"
          >
            <img
              :src="issue.foto"
              class="w-full h-56 md:h-72 object-cover"
            />

            <div
              class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
            >
              <div class="bg-white/90 rounded-full p-3">
                <ZoomIn class="w-5 h-5 text-gray-800" />
              </div>
            </div>
          </div>

          <!-- content -->
          <div class="p-5 md:p-6 overflow-y-auto">

            <h2 class="text-xl md:text-2xl font-bold text-gray-800 pr-12 mb-5 leading-tight break-words">
              {{ issue.title }}
            </h2>

            <div class="grid md:grid-cols-2 gap-4 text-sm">

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-1">
                  Tanggal
                </p>
                <p class="text-gray-800 font-medium">
                  {{ issue.tanggal || "-" }}
                </p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-1">
                  Support
                </p>
                <p class="text-gray-800 font-medium">
                  {{ issue.nama_support || "-" }}
                </p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-2">
                  Keterangan
                </p>

                <div class="text-gray-700 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
                  {{ issue.keterangan || "-" }}
                </div>
              </div>

              <div class="bg-blue-50 rounded-xl p-4 md:col-span-2">
                <p class="text-[11px] uppercase tracking-wide text-blue-500 font-semibold mb-2">
                  Solusi
                </p>

                <div class="text-gray-800 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
                  {{ issue.solusi || "-" }}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </Transition>

    <!-- FULL IMAGE -->
    <ImageModal
      :show="showImage"
      :image="issue?.foto"
      @close="showImage = false"
    />

  </Teleport>
</template>