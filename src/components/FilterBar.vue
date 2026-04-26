<script setup>
import { computed } from "vue"
import {
  Search,
  CalendarDays,
  User,
  RotateCcw,
  Filter
} from "lucide-vue-next"

const props = defineProps({
  keyword: String,
  startDate: String,
  endDate: String,
  picSupport: String,
  status: String,

  picOptions: {
    type: Array,
    default: () => []
  },

  /* =========================
     STATUS SESUAI DATA ASLI
  ========================= */
  statusOptions: {
    type: Array,
    default: () => ["Open", "Progress", "Selesai"]
  }
})

const emit = defineEmits([
  "update:keyword",
  "update:startDate",
  "update:endDate",
  "update:picSupport",
  "update:status"
])

const hasFilter = computed(() => {
  return (
    props.keyword ||
    props.startDate ||
    props.endDate ||
    props.picSupport ||
    props.status
  )
})

const resetFilter = () => {
  emit("update:keyword", "")
  emit("update:startDate", "")
  emit("update:endDate", "")
  emit("update:picSupport", "")
  emit("update:status", "")
}
</script>

<template>
  <div class="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">

    <!-- HEADER -->
    <div class="flex items-center gap-2 mb-3 text-gray-600 text-sm font-medium">
      <Filter class="w-4 h-4" />
      Filter Issues
    </div>

    <!-- GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">

      <!-- SEARCH -->
      <div class="relative xl:col-span-2">
        <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          :value="keyword"
          @input="emit('update:keyword', $event.target.value)"
          type="text"
          placeholder="Cari no tiket / keluhan..."
          class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- PIC SUPPORT -->
      <div class="relative">
        <User class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <select
          :value="picSupport"
          @change="emit('update:picSupport', $event.target.value)"
          class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option value="">Semua PIC</option>

          <option
            v-for="name in picOptions"
            :key="name"
            :value="name"
          >
            {{ name }}
          </option>
        </select>
      </div>

      <!-- STATUS -->
      <div>
        <select
          :value="status"
          @change="emit('update:status', $event.target.value)"
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
        >
          <option value="">Semua Status</option>

          <option
            v-for="s in statusOptions"
            :key="s"
            :value="s"
          >
            {{ s }}
          </option>
        </select>
      </div>

      <!-- START DATE -->
      <div class="relative">
        <CalendarDays class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          :value="startDate"
          @input="emit('update:startDate', $event.target.value)"
          type="date"
          class="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-gray-200
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <!-- END DATE -->
      <div class="relative">
        <CalendarDays class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

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