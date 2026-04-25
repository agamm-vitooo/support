<!-- src/components/issues/IssuesList.vue -->
<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { getIssues, deleteIssue } from "../services/api"
import { useToast } from "../services/useToast"

import FilterBar from "../components/FilterBar.vue"
import LoadingState from "../components/LoadingState.vue"
import EmptyState from "../components/EmptyState.vue"
import ConfirmDialog from "../components/ui/ConfirmDialog.vue"
import AppToast from "../components/ui/AppToast.vue"
import Pagination from "../components/Pagination.vue"

import IssueCard from "./issue-lists/IssueCard.vue"
import IssueDetailModal from "./issue-lists/IssueDetailModal.vue"

const emit = defineEmits(["edit-item"])

const issues = ref([])
const loading = ref(false)
const deletingId = ref(null)

const keyword = ref("")
const startDate = ref("")
const endDate = ref("")
const supportName = ref("")

const showModal = ref(false)
const selectedIssue = ref(null)

const showDelete = ref(false)
const selectedId = ref(null)

const currentPage = ref(1)
const perPage = 6

const { show, message, type, toast } = useToast()

/* ====================================
   LOAD DATA
==================================== */
const loadData = async () => {
  try {
    loading.value = true

    const res = await getIssues()

    issues.value = Array.isArray(res)
      ? res
      : res?.data ?? []

  } catch {
    toast("Gagal mengambil data", "error")
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

/* ====================================
   NORMALIZE TEXT
==================================== */
const normalizeText = (text) => {
  return (text || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
}

/* ====================================
   FORMAT NAME
==================================== */
const formatName = (text) => {
  const clean = normalizeText(text)

  return clean.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  )
}

/* ====================================
   DATE FORMAT
==================================== */
const parseDate = (value) => {
  if (!value) return null

  if (value.includes("-")) {
    return new Date(value)
  }

  if (value.includes("/")) {
    const [d, m, y] = value.split("/")
    return new Date(`${y}-${m}-${d}`)
  }

  return new Date(value)
}

/* ====================================
   SUPPORT OPTIONS
   erna / Erna / ERNA => Erna
==================================== */
const supportOptions = computed(() => {
  const unique = new Map()

  issues.value.forEach((item) => {
    const rawName = item.nama_support

    if (!rawName) return

    const key = normalizeText(rawName)

    if (!unique.has(key)) {
      unique.set(key, formatName(rawName))
    }
  })

  return Array.from(unique.values()).sort()
})

/* ====================================
   FILTER
==================================== */
const filtered = computed(() => {
  const key = normalizeText(keyword.value)
  const selectedSupport = normalizeText(supportName.value)

  return issues.value.filter((item) => {
    const textMatch =
      normalizeText(item.nama_support).includes(key) ||
      normalizeText(item.title).includes(key) ||
      normalizeText(item.keterangan).includes(key) ||
      normalizeText(item.solusi).includes(key)

    const issueDate = parseDate(item.tanggal)
    const start = parseDate(startDate.value)
    const end = parseDate(endDate.value)

    const startMatch =
      !start || (issueDate && issueDate >= start)

    const endMatch =
      !end || (issueDate && issueDate <= end)

    const supportMatch =
      !selectedSupport ||
      normalizeText(item.nama_support) === selectedSupport

    return (
      textMatch &&
      startMatch &&
      endMatch &&
      supportMatch
    )
  })
})

/* ====================================
   PAGINATION
==================================== */
const totalPages = computed(() =>
  Math.ceil(filtered.value.length / perPage)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

watch(
  [keyword, startDate, endDate, supportName],
  () => {
    currentPage.value = 1
  }
)

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

/* ====================================
   ACTION
==================================== */
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
      (item) =>
        String(item.id) !== String(selectedId.value)
    )

    closeDelete()
    toast("Issue berhasil dihapus", "success")

  } catch {
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
               hover:bg-blue-600 hover:text-white transition"
      >
        Refresh
      </button>
    </div>

    <!-- FILTER -->
    <FilterBar
      v-model:keyword="keyword"
      v-model:startDate="startDate"
      v-model:endDate="endDate"
      v-model:supportName="supportName"
      :supportOptions="supportOptions"
    />

    <!-- LOADING -->
    <LoadingState v-if="loading" />

    <!-- EMPTY -->
    <EmptyState v-else-if="filtered.length === 0" />

    <!-- LIST -->
    <div v-else class="grid md:grid-cols-2 gap-4">
      <IssueCard
        v-for="item in paginatedData"
        :key="item.id"
        :item="item"
        :deletingId="deletingId"
        @detail="openModal"
        @edit="onEdit"
        @delete="openDelete"
      />
    </div>

    <!-- PAGINATION -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change-page="changePage"
    />

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