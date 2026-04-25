<!-- src/components/FilterBar.vue -->
<script setup>
import { computed } from "vue"
import {
  Search,
  CalendarDays,
  User,
  RotateCcw
} from "lucide-vue-next"

const props = defineProps({
  keyword: String,
  startDate: String,
  endDate: String,
  supportName: String,
  supportOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  "update:keyword",
  "update:startDate",
  "update:endDate",
  "update:supportName"
])

const hasFilter = computed(() => {
  return (
    props.keyword ||
    props.startDate ||
    props.endDate ||
    props.supportName
  )
})

const resetFilter = () => {
  emit("update:keyword", "")
  emit("update:startDate", "")
  emit("update:endDate", "")
  emit("update:supportName", "")
}
</script>

<template>
  <div class="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">

    <div class="grid md:grid-cols-2 xl:grid-cols-5 gap-3">

      <!-- SEARCH -->
      <div class="relative xl:col-span-2">
        <Search
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          :value="keyword"
          @input="emit('update:keyword', $event.target.value)"
          type="text"
          placeholder="Cari issue..."
          class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- SUPPORT -->
      <div class="relative">
        <User
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <select
          :value="supportName"
          @change="emit('update:supportName', $event.target.value)"
          class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option value="">Semua Support</option>

          <option
            v-for="name in supportOptions"
            :key="name"
            :value="name"
          >
            {{ name }}
          </option>
        </select>
      </div>

      <!-- START -->
      <div class="relative">
        <CalendarDays
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          :value="startDate"
          @input="emit('update:startDate', $event.target.value)"
          type="date"
          class="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- END -->
      <div class="relative">
        <CalendarDays
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          :value="endDate"
          @input="emit('update:endDate', $event.target.value)"
          type="date"
          class="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

    </div>

    <!-- RESET -->
    <div class="mt-3 flex justify-end">
      <button
        @click="resetFilter"
        class="px-4 py-2 text-sm rounded-xl border transition flex items-center gap-2"
        :class="
          hasFilter
            ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
            : 'border-gray-200 text-gray-400'
        "
      >
        <RotateCcw class="w-4 h-4" />
        Reset
      </button>
    </div>

  </div>
</template>