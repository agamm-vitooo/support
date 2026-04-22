<!-- src/components/LoadingState.vue -->
<template>
  <div class="flex flex-col items-center justify-center py-14 text-gray-500">

    <!-- SPINNER WRAPPER -->
    <div class="relative w-12 h-12">

      <!-- BACK CIRCLE -->
      <div class="absolute inset-0 rounded-full border-2 border-gray-200"></div>

      <!-- ANIMATED SPINNER -->
      <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>

    </div>

    <!-- TITLE -->
    <p class="mt-4 text-sm font-semibold text-gray-600 tracking-wide">
      Loading data
    </p>

    <!-- SUBTITLE
    <p class="text-xs text-gray-400 mt-1">
      Mohon tunggu sebentar...
    </p>

    <!-- <div class="flex gap-1 mt-3">
      <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
      <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
      <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
    </div> --> 

  </div>
</template>