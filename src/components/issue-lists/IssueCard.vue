<script setup>
import { Pencil, Trash2 } from "lucide-vue-next"

defineProps({
  item: Object
})

const emit = defineEmits(["edit", "delete"])
</script>

<template>
  <div class="border border-gray-200 rounded-xl p-4 flex justify-between bg-white hover:shadow-md transition">

    <!-- LEFT CONTENT -->
    <div>
      <p class="font-bold text-gray-800">{{ item.no_tiket }}</p>

      <p class="text-sm text-gray-600 mt-1 line-clamp-2">
        {{ item.keluhan }}
      </p>

      <span
        class="text-xs px-2 py-1 rounded mt-2 inline-block"
        :class="item.status === 'Open'
          ? 'bg-red-100 text-red-600'
          : item.status === 'Progress'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-green-100 text-green-600'"
      >
        {{ item.status }}
      </span>
    </div>

    <!-- RIGHT ACTION -->
    <div class="flex items-start gap-1">

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
</template>