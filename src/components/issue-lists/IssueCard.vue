<script setup>
import { Pencil, Trash2, Loader2 } from "lucide-vue-next"

defineProps({
  item: Object,
  deletingId: [String, Number, null]
})

defineEmits([
  "detail",
  "edit",
  "delete"
])
</script>

<template>
  <div
    @click="$emit('detail', item)"
    class="group bg-white rounded-2xl border border-gray-200
           p-4 relative cursor-pointer
           hover:shadow-lg hover:-translate-y-1
           transition-all duration-300"
  >
    <!-- ACTION -->
    <div
      class="absolute top-3 right-3 flex gap-2
             opacity-0 group-hover:opacity-100
             transition duration-300 z-10"
    >
      <!-- EDIT -->
      <button
        @click.stop="$emit('edit', item)"
        class="w-9 h-9 flex items-center justify-center
               rounded-xl border border-gray-200 bg-white
               text-gray-500 hover:text-blue-600
               hover:bg-blue-50 hover:border-blue-200
               shadow-sm transition"
      >
        <Pencil class="w-4 h-4" />
      </button>

      <!-- DELETE -->
      <button
        @click.stop="$emit('delete', item.id)"
        :disabled="deletingId === item.id"
        class="w-9 h-9 flex items-center justify-center
               rounded-xl border border-gray-200 bg-white
               text-gray-500 hover:text-red-600
               hover:bg-red-50 hover:border-red-200
               disabled:opacity-50 disabled:cursor-not-allowed
               shadow-sm transition"
      >
        <Loader2
          v-if="deletingId === item.id"
          class="w-4 h-4 animate-spin"
        />
        <Trash2 v-else class="w-4 h-4" />
      </button>
    </div>

    <!-- IMAGE -->
    <img
      v-if="item.foto"
      :src="item.foto"
      class="w-full h-44 object-cover rounded-xl mb-4"
    />

    <!-- TITLE -->
    <h2 class="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
      {{ item.title }}
    </h2>

    <!-- DESC -->
    <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">
      {{ item.keterangan }}
    </p>
  </div>
</template>