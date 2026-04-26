<script setup>
import { Pencil, Trash2, Image as ImageIcon } from "lucide-vue-next"

defineProps({
  item: Object
})

const emit = defineEmits(["edit", "delete"])
</script>

<template>
  <div
    class="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition"
  >
    <div class="flex gap-4 justify-between">

      <!-- LEFT CONTENT -->
      <div class="flex gap-3 flex-1 min-w-0">

        <!-- IMAGE -->
        <div
          class="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0"
        >
          <img
            v-if="item.capture"
            :src="item.capture"
            alt="capture"
            class="w-full h-full object-cover"
          />

          <ImageIcon
            v-else
            class="w-5 h-5 text-gray-400"
          />
        </div>

        <!-- TEXT -->
        <div class="min-w-0 flex-1">

          <!-- NOMOR TIKET -->
          <p class="text-xs text-gray-500">
            Nomor Tiket :
          </p>

          <p class="font-bold text-gray-800 truncate">
            {{ item.no_tiket }}
          </p>

          <!-- KELUHAN -->
          <p class="text-sm text-gray-600 mt-2 line-clamp-2">
            {{ item.keluhan }}
          </p>

          <!-- STATUS -->
          <span
            class="text-xs px-2 py-1 rounded mt-2 inline-block"
            :class="
              item.status === 'Open'
                ? 'bg-red-100 text-red-600'
                : item.status === 'Progress'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-600'
            "
          >
            {{ item.status }}
          </span>

        </div>

      </div>

      <!-- RIGHT ACTION -->
      <div class="flex items-start gap-1 shrink-0">

        <!-- EDIT -->
        <button
          @click.stop="emit('edit', item)"
          class="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
          title="Edit"
        >
          <Pencil class="w-4 h-4" />
        </button>

        <!-- DELETE -->
        <button
          @click.stop="emit('delete', item.no)"
          class="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
          title="Hapus"
        >
          <Trash2 class="w-4 h-4" />
        </button>

      </div>

    </div>
  </div>
</template>