<script setup>
import { ref, onMounted } from "vue"
import { getIssues } from "../services/api.js"

import StatsCards from "../components/dashboard/StatsChart.vue"
import StatusChart from "../components/dashboard/StatusChart.vue"
import SupportChart from "../components/dashboard/SupportChart.vue"
import TrendChart from "../components/dashboard/TrendChart.vue"
import LoadingState from "../components/LoadingState.vue"

const issues = ref([])
const loading = ref(false)
const error = ref(null)

const loadData = async () => {
  try {
    loading.value = true
    error.value = null

    const result = await getIssues()

    console.log("RESULT:", result)

    issues.value = Array.isArray(result.data)
      ? result.data
      : []

  } catch (err) {
    console.error(err)
    error.value = "Gagal memuat data dashboard"
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-3 py-4 sm:px-4 md:px-6">

    <!-- HEADER -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">

      <div>
        <h1 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>

        <p class="text-xs sm:text-sm text-gray-500 mt-1">
          Monitoring issue & support system
        </p>
      </div>

      <button
        @click="loadData"
        class="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition"
      >
        Refresh
      </button>

    </div>

    <!-- LOADING -->
    <LoadingState v-if="loading" />

    <!-- ERROR -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm"
    >
      {{ error }}
    </div>

    <!-- CONTENT -->
    <div v-else class="space-y-4 md:space-y-6">

      <!-- STATS -->
      <StatsCards :issues="issues" />

      <!-- CHART ROW -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">

        <div class="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
          <StatusChart :issues="issues" />
        </div>

        <div class="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
          <SupportChart :issues="issues" />
        </div>

      </div>

      <!-- TREND -->
      <div class="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
        <TrendChart :issues="issues" />
      </div>

      <!-- EMPTY -->
      <div
        v-if="issues.length === 0"
        class="bg-white rounded-2xl p-6 text-center text-sm text-gray-500 border border-gray-100"
      >
        Belum ada data issue
      </div>

    </div>

  </div>
</template>