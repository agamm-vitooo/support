<!-- IssuePage.vue -->
<script setup>
import { ref, onMounted, computed } from "vue"
import { getIssues, deleteIssue } from "../services/api"
import { useToast } from "../services/useToast"

import { Plus } from "lucide-vue-next"

import IssueList from "../components/IssuesList.vue"
import IssueForm from "../components/AddIssueForm.vue"
import ConfirmDialog from "../components/ui/ConfirmDialog.vue"
import AppToast from "../components/ui/AppToast.vue"
import FilterBar from "../components/FilterBar.vue"

/* =========================
   STATE
========================= */
const issues = ref([])
const loading = ref(false)

const editingItem = ref(null)
const isCreateMode = ref(false)

const showDelete = ref(false)
const selectedNo = ref(null)

const { show, message, type, toast } = useToast()

/* =========================
   FILTER STATE
========================= */
const keyword = ref("")
const startDate = ref("")
const endDate = ref("")
const picSupport = ref("")
const status = ref("")

/* =========================
   LOAD
========================= */
const loadData = async () => {
  try {
    loading.value = true
    const res = await getIssues()
    issues.value = res?.data ?? []
  } catch (e) {
    toast("Gagal load data", "error")
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

/* =========================
   OPTIONS
========================= */
const picOptions = computed(() => {
  const set = new Set()
  issues.value.forEach(i => i.pic_support && set.add(i.pic_support))
  return [...set]
})

/* =========================
   FILTERED DATA
========================= */
const filteredIssues = computed(() => {
  const kw = keyword.value.toLowerCase()

  return issues.value.filter(item => {
    const matchKeyword =
      !kw ||
      item.no_tiket?.toLowerCase().includes(kw) ||
      item.keluhan?.toLowerCase().includes(kw)

    const matchPic =
      !picSupport.value || item.pic_support === picSupport.value

    const matchStatus =
      !status.value || item.status === status.value

    const matchDate =
      (!startDate.value || item.tgl_tiket >= startDate.value) &&
      (!endDate.value || item.tgl_tiket <= endDate.value)

    return matchKeyword && matchPic && matchStatus && matchDate
  })
})

/* =========================
   ACTIONS
========================= */
const handleAdd = () => {
  isCreateMode.value = true
  editingItem.value = null
}

const handleEdit = (item) => {
  editingItem.value = item
  isCreateMode.value = false
}

const handleDeleteAsk = (no) => {
  selectedNo.value = no
  showDelete.value = true
}

const handleDelete = async () => {
  try {
    await deleteIssue(selectedNo.value)
    toast("Berhasil dihapus", "success")
    showDelete.value = false
    await loadData()
  } catch (e) {
    toast("Gagal hapus", "error")
  }
}

const handleSaved = async () => {
  editingItem.value = null
  isCreateMode.value = false
  await loadData()
  toast("Data tersimpan", "success")
}

const handleCancelForm = () => {
  editingItem.value = null
  isCreateMode.value = false
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <h1 class="text-lg font-bold">Issue List</h1>

      <button
        @click="handleAdd"
        class="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
      >
        <Plus size="18" />
        Tambah Issue
      </button>
    </div>

    <!-- FILTER -->
    <FilterBar
      v-model:keyword="keyword"
      v-model:startDate="startDate"
      v-model:endDate="endDate"
      v-model:picSupport="picSupport"
      v-model:status="status"
      :picOptions="picOptions"
    />

    <!-- LIST -->
    <IssueList
      :items="filteredIssues"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDeleteAsk"
    />

    <!-- FORM -->
    <IssueForm
      v-if="editingItem || isCreateMode"
      :editing-item="editingItem"
      @saved="handleSaved"
      @cancel="handleCancelForm"
    />

    <!-- DELETE -->
    <ConfirmDialog
      :show="showDelete"
      title="Hapus Data"
      message="Data tidak bisa dikembalikan"
      confirmText="Hapus"
      cancelText="Batal"
      danger
      @close="showDelete = false"
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