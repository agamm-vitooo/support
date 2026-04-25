<script setup>
import { Home, PlusCircle, Settings } from "lucide-vue-next"

defineProps({
  isOpen: Boolean
})
</script>

<template>
  <aside
    :class="isOpen ? 'w-64' : 'w-0 overflow-hidden'"
    class="bg-white border-r border-gray-200 transition-all duration-300
           fixed top-0 left-0 h-screen overflow-y-auto"
  >
    <div class="p-5">

      <!-- TITLE -->
      <h1 class="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
        <Settings class="w-6 h-6 text-blue-600" />
        Support MIMS
      </h1>

      <nav class="space-y-2">

        <!-- DASHBOARD -->
        <router-link
          to="/"
          exact-active-class="bg-blue-600 text-white shadow-sm"
          class="flex items-center gap-3 px-4 py-3 rounded-xl
                 text-gray-700 hover:bg-blue-600 hover:text-white
                 transition-all duration-200 ease-in-out"
        >
          <Home class="w-5 h-5" />
          <span>Dashboard</span>
        </router-link>

        <!-- ADD ISSUE -->
        <router-link
          to="/add"
          active-class="bg-blue-600 text-white shadow-sm"
          class="flex items-center gap-3 px-4 py-3 rounded-xl
                 text-gray-700 hover:bg-blue-600 hover:text-white
                 transition-all duration-200 ease-in-out"
        >
          <PlusCircle class="w-5 h-5" />
          <span>Issue</span>
        </router-link>

      </nav>

    </div>
  </aside>
</template>