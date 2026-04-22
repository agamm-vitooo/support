<script setup>
import { ref } from "vue"
import Sidebar from "./components/Sidebar.vue"

const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">

    <!-- SIDEBAR (fixed inside component) -->
    <Sidebar :isOpen="isOpen" />

    <!-- MAIN AREA -->
    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="isOpen ? 'ml-64' : 'ml-0'"
    >

      <!-- TOPBAR (STICKY HEADER) -->
      <header
        class="bg-white shadow px-5 py-4 flex items-center gap-4
               sticky top-0 z-50 border-b border-gray-100"
      >

        <!-- TOGGLE SIDEBAR -->
        <button
          @click="toggleSidebar"
          class="text-2xl font-bold text-gray-700 hover:text-gray-900 transition"
        >
          ☰
        </button>

        <h1 class="text-lg font-bold text-gray-800">
          Bug Monitoring System
        </h1>

      </header>

      <!-- CONTENT -->
      <main class="p-6 flex-1 overflow-y-auto">
        <router-view />
      </main>

    </div>

  </div>
</template>