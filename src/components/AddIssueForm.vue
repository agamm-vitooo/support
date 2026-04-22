<script setup>
import { ref, watch } from "vue"
import { uploadImage, addIssue, updateIssue } from "../services/api"

const props = defineProps({
  editingItem: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(["issue-added", "edit-cancelled"])

const defaultForm = {
  tanggal: "",
  nama_support: "",
  title: "",
  keterangan: "",
  solusi: "",
  foto: ""
}

const form = ref({ ...defaultForm })
const file = ref(null)
const loading = ref(false)
const isDragging = ref(false)

/* ====================== */
watch(
  () => props.editingItem,
  (newItem) => {
    if (newItem) {
      const { status, ...rest } = newItem
      form.value = { ...defaultForm, ...rest }
    } else {
      form.value = { ...defaultForm }
    }
  },
  { immediate: true }
)

/* ====================== */
const handleFileSelect = (e) => {
  file.value = e.target.files[0]
}

const handleDrop = (e) => {
  isDragging.value = false
  const droppedFile = e.dataTransfer.files[0]
  if (droppedFile) file.value = droppedFile
}

const resetForm = () => {
  form.value = { ...defaultForm }
  file.value = null
}

/* ====================== */
const save = async () => {
  try {
    loading.value = true

    let foto = form.value.foto || ""

    if (file.value) {
      foto = await uploadImage(file.value)
    }

    const payload = { ...form.value, foto }

    if (props.editingItem) {
      await updateIssue({ id: props.editingItem.id, ...payload })
    } else {
      await addIssue(payload)
    }

    resetForm()
    emit("issue-added")

  } catch (error) {
    console.error(error)
    alert("Gagal menyimpan data")
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  resetForm()
  emit("edit-cancelled")
}
</script>

<template>
  <!-- FIX HEIGHT CONTAINER (INI KUNCI NO SCROLL) -->
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 max-h-[90vh] overflow-hidden">

    <div class="grid md:grid-cols-2 gap-3">

      <!-- TANGGAL -->
      <div>
        <label class="text-xs text-gray-500">Tanggal</label>
        <input
          v-model="form.tanggal"
          type="date"
          class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition"
        />
      </div>

      <!-- SUPPORT -->
      <div>
        <label class="text-xs text-gray-500">Nama Support</label>
        <input
          v-model="form.nama_support"
          placeholder="Support"
          class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition"
        />
      </div>

      <!-- TITLE -->
      <div class="md:col-span-2">
        <label class="text-xs text-gray-500">Title</label>
        <input
          v-model="form.title"
          placeholder="Judul issue"
          class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition"
        />
      </div>

      <!-- KETERANGAN -->
      <div class="md:col-span-2">
        <label class="text-xs text-gray-500">Keterangan</label>
        <textarea
          v-model="form.keterangan"
          rows="2"
          placeholder="Masalah..."
          class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition resize-none"
        />
      </div>

      <!-- SOLUSI -->
      <div class="md:col-span-2">
        <label class="text-xs text-gray-500">Solusi</label>
        <textarea
          v-model="form.solusi"
          rows="2"
          placeholder="Solusi..."
          class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition resize-none"
        />
      </div>

      <!-- UPLOAD -->
      <div class="md:col-span-2">
        <label class="text-xs text-gray-500">Upload Gambar</label>

        <div
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          class="mt-1 border border-dashed rounded-xl p-4 text-center cursor-pointer transition"
          :class="isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'"
        >

          <input
            type="file"
            id="fileUpload"
            class="hidden"
            @change="handleFileSelect"
          />

          <label for="fileUpload" class="cursor-pointer block">
            <p class="text-sm text-gray-600">
              <span class="text-blue-600 font-medium">Klik</span> atau drag & drop
            </p>
            <p class="text-xs text-gray-400">
              PNG / JPG (max 5MB)
            </p>
          </label>

          <div v-if="file" class="mt-2 text-xs text-gray-600">
            📎 {{ file.name }}
          </div>

        </div>
      </div>

    </div>

    <!-- BUTTON (FIX TIDAK NGEFORCE HEIGHT) -->
    <div class="flex gap-2 mt-4">

      <button
        @click="save"
        :disabled="loading"
        class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 rounded-lg transition text-sm font-medium"
      >
        {{ loading ? "Menyimpan..." : (editingItem ? "Update" : "Simpan") }}
      </button>

      <button
        v-if="editingItem"
        @click="cancel"
        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition text-sm"
      >
        Batal
      </button>

    </div>

  </div>
</template>