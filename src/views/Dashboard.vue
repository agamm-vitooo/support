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

    issues.value = Array.isArray(result) ? result : []
  } catch (err) {
    error.value = "Gagal memuat data dashboard"
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">

    <!-- HEADER -->
    <div class="flex items-center justify-between mb-5">

      <div>
        <h1 class="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p class="text-sm text-gray-500">
          Monitoring issue & support system
        </p>
      </div>

      <button
        @click="loadData"
        class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition"
      >
        Refresh
      </button>

    </div>

    <!-- LOADING -->
    <LoadingState v-if="loading" />

    <!-- ERROR -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4"
    >
      {{ error }}
    </div>

    <!-- CONTENT -->
    <div v-else class="space-y-6">

      <!-- STATS -->
      <StatsCards :issues="issues" />

      <!-- CHART ROW -->
      <div class="grid md:grid-cols-2 gap-4">

        <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition">
          <StatusChart :issues="issues" />
        </div>

        <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition">
          <SupportChart :issues="issues" />
        </div>

      </div>

      <!-- TREND -->
      <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition">
        <TrendChart :issues="issues" />
      </div>

      <!-- EMPTY -->
      <div
        v-if="issues.length === 0"
        class="bg-white rounded-xl p-6 text-center text-gray-500 border border-gray-100"
      >
        Belum ada data issue
      </div>

    </div>

  </div>
</template>