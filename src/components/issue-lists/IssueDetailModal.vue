<!-- src/components/IssueDetailModal.vue -->
<script setup>
import { X } from "lucide-vue-next"

defineProps({
  show: Boolean,
  issue: Object
})

const emit = defineEmits(["close"])
</script>

<template>
  <Teleport to="body">

    <div
      v-if="show && issue"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      @click="emit('close')"
    >

      <div
        class="relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden"
        @click.stop
      >

        <!-- CLOSE -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white text-gray-700 shadow-md flex items-center justify-center transition"
        >
          <X class="w-5 h-5" />
        </button>

        <!-- IMAGE -->
        <img
          v-if="issue.foto"
          :src="issue.foto"
          class="w-full h-56 md:h-64 object-cover"
        />

        <!-- CONTENT -->
        <div class="p-5 md:p-6">

          <!-- TITLE -->
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 pr-12 mb-5 leading-tight">
            {{ issue.title }}
          </h2>

          <!-- INFO -->
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
              <p class="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-1">
                Keterangan
              </p>
              <p class="text-gray-700 leading-relaxed line-clamp-4">
                {{ issue.keterangan || "-" }}
              </p>
            </div>

            <div class="bg-blue-50 rounded-xl p-4 md:col-span-2">
              <p class="text-[11px] uppercase tracking-wide text-blue-500 font-semibold mb-1">
                Solusi
              </p>
              <p class="text-gray-800 leading-relaxed line-clamp-4">
                {{ issue.solusi || "-" }}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </Teleport>
</template>