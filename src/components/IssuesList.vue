<script setup>
import { ref, computed, watch } from "vue"
import IssueCard from "./issue-lists/IssueCard.vue"
import Pagination from "./Pagination.vue"
import IssueDetailModal from "./issue-lists/IssueDetailModal.vue"

const props = defineProps({
  items: Array,
  loading: Boolean
})

const emit = defineEmits(["edit", "delete"])

const currentPage = ref(1)
const perPage = 6

/* =========================
   DETAIL MODAL STATE
========================= */
const showDetail = ref(false)
const selectedIssue = ref(null)

/* =========================
   RESET PAGE ON DATA CHANGE
========================= */
watch(
  () => props.items,
  () => {
    currentPage.value = 1
  }
)

/* =========================
   PAGINATION
========================= */
const totalPages = computed(() =>
  Math.ceil((props.items?.length || 0) / perPage)
)

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return props.items?.slice(start, start + perPage) || []
})

const changePage = (page) => {
  currentPage.value = page
}

/* =========================
   OPEN / CLOSE DETAIL
========================= */
const openDetail = (item) => {
  selectedIssue.value = item
  showDetail.value = true
}

const closeDetail = () => {
  showDetail.value = false
  selectedIssue.value = null
}
</script>

<template>
  <div class="space-y-4">

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-10 text-gray-500">
      <div class="animate-pulse">Loading issues...</div>
    </div>

    <!-- EMPTY -->
    <div v-else-if="!items?.length" class="text-center py-10 text-gray-400">
      <p class="text-lg">📭 No issues found</p>
    </div>

    <!-- LIST -->
    <div v-else class="grid md:grid-cols-2 gap-4">

      <IssueCard
        v-for="item in paginated"
        :key="item.no"
        :item="item"
        @click="openDetail(item)"
        @edit="emit('edit', item)"
        @delete="emit('delete', item.no)"
      />

    </div>

    <!-- PAGINATION -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change-page="changePage"
    />

    <!-- DETAIL MODAL -->
    <IssueDetailModal
      :show="showDetail"
      :issue="selectedIssue"
      @close="closeDetail"
    />

  </div>
</template>