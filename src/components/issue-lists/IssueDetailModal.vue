<script setup>
import { ref, watch } from "vue"
import { X, ZoomIn } from "lucide-vue-next"
import ImageModal from "./ImageModal.vue"

const props = defineProps({
  show: Boolean,
  issue: Object
})

const emit = defineEmits(["close"])

const showImage = ref(false)

/* reset image modal saat detail ditutup */
watch(
  () => props.show,
  (val) => {
    if (!val) showImage.value = false
  }
)
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
          class="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
          @click.stop
        >

          <!-- CLOSE -->
          <button
            @click="emit('close')"
            class="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-blue-600 hover:text-white shadow transition"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- IMAGE -->
          <div
            v-if="issue.capture"
            class="relative cursor-pointer group"
            @click="showImage = true"
          >
            <img
              :src="issue.capture"
              class="w-full h-56 md:h-72 object-cover"
            />

            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <ZoomIn class="w-6 h-6 text-white" />
            </div>
          </div>

          <!-- CONTENT -->
          <div class="p-6 overflow-y-auto space-y-4">

            <!-- NOMOR TIKET -->
            <div>
              <p class="text-xs text-gray-400 uppercase">
                Nomor Tiket
              </p>
              <h2 class="text-xl font-bold text-gray-800">
                {{ issue.no_tiket || "-" }}
              </h2>
            </div>

            <div class="grid md:grid-cols-2 gap-4 text-sm">

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase">Tanggal</p>
                <p class="text-gray-800 font-medium">{{ issue.tgl_tiket || "-" }}</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase">PIC Support</p>
                <p class="text-gray-800 font-medium">{{ issue.pic_support || "-" }}</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase">PIC HAR</p>
                <p class="text-gray-800 font-medium">{{ issue.pic_har || "-" }}</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase">Jenis</p>
                <p class="text-gray-800 font-medium">{{ issue.jenis || "-" }}</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase">Status</p>
                <p class="text-gray-800 font-medium">{{ issue.status || "-" }}</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase">Deploy</p>
                <p class="text-gray-800 font-medium">{{ issue.status_deploy_production || "-" }}</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p class="text-xs text-gray-400 uppercase mb-1">Keluhan</p>
                <p class="text-gray-700 whitespace-pre-line">{{ issue.keluhan || "-" }}</p>
              </div>

              <div class="bg-blue-50 rounded-xl p-4 md:col-span-2">
                <p class="text-xs text-blue-500 uppercase mb-1">Keterangan</p>
                <p class="text-gray-800 whitespace-pre-line">{{ issue.keterangan || "-" }}</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </Transition>

    <ImageModal
      :show="showImage"
      :image="issue?.capture"
      @close="showImage = false"
    />

  </Teleport>
</template>