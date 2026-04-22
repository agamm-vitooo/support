<!-- src/components/issues/IssuesList.vue -->
<script setup>
import { ref, computed, onMounted } from "vue"
import { getIssues, deleteIssue } from "../services/api"
import { useToast } from "../services/useToast"

import FilterBar from "../components/FilterBar.vue"
import LoadingState from "../components/LoadingState.vue"
import EmptyState from "../components/EmptyState.vue"
import ConfirmDialog from "../components/ui/ConfirmDialog.vue"
import AppToast from "../components/ui/AppToast.vue"

import IssueCard from "./issue-lists/IssueCard.vue"
import IssueDetailModal from "./issue-lists/IssueDetailModal.vue"

const emit = defineEmits(["edit-item"])

const issues = ref([])
const loading = ref(false)
const deletingId = ref(null)

const keyword = ref("")
const startDate = ref("")
const endDate = ref("")

const showModal = ref(false)
const selectedIssue = ref(null)

const showDelete = ref(false)
const selectedId = ref(null)

const { show, message, type, toast } = useToast()

const loadData = async () => {
  try {
    loading.value = true

    const res = await getIssues()

    issues.value = Array.isArray(res)
      ? res
      : res?.data ?? []

  } catch (error) {
    toast("Gagal mengambil data", "error")
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

const filtered = computed(() => {
  const key = keyword.value.toLowerCase()

  return issues.value.filter((item) => {
    const textMatch =
      item.nama_support?.toLowerCase().includes(key) ||
      item.title?.toLowerCase().includes(key) ||
      item.keterangan?.toLowerCase().includes(key) ||
      item.solusi?.toLowerCase().includes(key)

    const issueDate = item.tanggal || ""

    const startMatch =
      !startDate.value || issueDate >= startDate.value

    const endMatch =
      !endDate.value || issueDate <= endDate.value

    return textMatch && startMatch && endMatch
  })
})

const refreshList = async () => {
  await loadData()
  toast("Data berhasil diperbarui", "success")
}

const openModal = (item) => {
  selectedIssue.value = item
  showModal.value = true
}

const closeModal = () => {
  selectedIssue.value = null
  showModal.value = false
}

const openDelete = (id) => {
  selectedId.value = id
  showDelete.value = true
}

const closeDelete = () => {
  selectedId.value = null
  showDelete.value = false
}

const handleDelete = async () => {
  try {
    deletingId.value = selectedId.value

    await deleteIssue(selectedId.value)

    issues.value = issues.value.filter(
      (item) => String(item.id) !== String(selectedId.value)
    )

    closeDelete()
    toast("Issue berhasil dihapus", "success")

  } catch (error) {
    toast("Gagal menghapus data", "error")
  } finally {
    deletingId.value = null
  }
}

const onEdit = (item) => {
  emit("edit-item", { ...item })
}

defineExpose({ refreshList })
</script>

<template>
  <div>
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-bold text-gray-800">
        Bug Monitoring
      </h1>

      <button
        @click="refreshList"
        class="px-3 py-2 text-sm rounded-xl border border-gray-200
               hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
      >
        Refresh
      </button>
    </div>

    <!-- FILTER -->
    <FilterBar
      v-model:keyword="keyword"
      v-model:startDate="startDate"
      v-model:endDate="endDate"
    />

    <LoadingState v-if="loading" />

    <EmptyState v-else-if="filtered.length === 0" />

    <!-- LIST -->
    <div v-else class="grid md:grid-cols-2 gap-4">
      <IssueCard
        v-for="item in filtered"
        :key="item.id"
        :item="item"
        :deletingId="deletingId"
        @detail="openModal"
        @edit="onEdit"
        @delete="openDelete"
      />
    </div>

    <!-- DETAIL -->
    <IssueDetailModal
      :show="showModal"
      :issue="selectedIssue"
      @close="closeModal"
    />

    <!-- DELETE -->
    <ConfirmDialog
      :show="showDelete"
      title="Hapus Issue"
      message="Data yang dihapus tidak bisa dikembalikan."
      confirmText="Hapus"
      cancelText="Batal"
      :loading="deletingId !== null"
      danger
      @close="closeDelete"
      @confirm="handleDelete"
    />

    <!-- TOAST -->
    <AppToast
      :show="show"
      :message="message"
      :type="type"
    />
  </div>
</template>