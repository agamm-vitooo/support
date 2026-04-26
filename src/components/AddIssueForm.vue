<script setup>
import { ref, watch } from "vue"
import { addIssue, updateIssue, uploadImage } from "../services/api"
import { X } from "lucide-vue-next"

const props = defineProps({
  editingItem: Object
})

const emit = defineEmits(["saved", "cancel"])

const defaultForm = {
  no_tiket: "",
  tgl_tiket: "",
  pic_support: "",
  pic_har: "",
  keluhan: "",
  keterangan: "",
  jenis: "",
  capture: "",
  status: "Open",
  status_deploy_production: ""
}

const form = ref({ ...defaultForm })
const file = ref(null)
const loading = ref(false)

watch(
  () => props.editingItem,
  (item) => {
    form.value = item ? { ...defaultForm, ...item } : { ...defaultForm }
  },
  { immediate: true }
)

const save = async () => {
  loading.value = true

  try {
    let capture = form.value.capture

    if (file.value) {
      capture = await uploadImage(file.value)
    }

    const payload = {
      ...form.value,
      capture
    }

    if (props.editingItem) {
      await updateIssue({ no: props.editingItem.no, ...payload })
    } else {
      await addIssue(payload)
    }

    emit("saved")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >

      <div
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        @click="$emit('cancel')"
      >

        <div
          class="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
          @click.stop
        >

          <!-- CLOSE -->
          <button
            @click="$emit('cancel')"
            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-blue-600 hover:text-white shadow transition"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- HEADER -->
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-xl font-bold text-gray-800 pr-12">
              {{ editingItem ? "Edit Issue" : "Tambah Issue" }}
            </h2>
            <p class="text-sm text-gray-400 mt-1">
              Lengkapi data issue di bawah ini
            </p>
          </div>

          <!-- FORM CONTENT -->
          <div class="p-6 overflow-y-auto space-y-4">

            <div class="grid md:grid-cols-2 gap-4 text-sm">

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">No Tiket</p>
                <input
                  v-model="form.no_tiket"
                  placeholder="Masukkan no tiket"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">Tanggal</p>
                <input
                  v-model="form.tgl_tiket"
                  type="date"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">PIC Support</p>
                <input
                  v-model="form.pic_support"
                  placeholder="Masukkan PIC Support"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">PIC HAR</p>
                <input
                  v-model="form.pic_har"
                  placeholder="Masukkan PIC HAR"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">Jenis</p>
                <input
                  v-model="form.jenis"
                  placeholder="Masukkan jenis"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">Status</p>
                <select
                  v-model="form.status"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option>Open</option>
                  <option>Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">Deploy</p>
                <select
                  v-model="form.status_deploy_production"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Deploy Status</option>
                  <option>Not Deployed</option>
                  <option>Deployed</option>
                </select>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-xs text-gray-400 uppercase mb-2">Capture</p>
                <input
                  type="file"
                  @change="e => file = e.target.files[0]"
                  class="w-full text-sm"
                />
              </div>

              <div class="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p class="text-xs text-gray-400 uppercase mb-2">Keluhan</p>
                <textarea
                  v-model="form.keluhan"
                  rows="4"
                  placeholder="Masukkan keluhan"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div class="bg-blue-50 rounded-xl p-4 md:col-span-2">
                <p class="text-xs text-blue-500 uppercase mb-2">Keterangan</p>
                <textarea
                  v-model="form.keterangan"
                  rows="4"
                  placeholder="Masukkan keterangan"
                  class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

          </div>

          <!-- FOOTER -->
          <div class="border-t border-gray-100 p-6 flex justify-end gap-2">

            <button
              @click="$emit('cancel')"
              class="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              @click="save"
              :disabled="loading"
              class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-70"
            >
              {{ loading ? "Saving..." : "Save" }}
            </button>

          </div>

        </div>

      </div>

    </Transition>

  </Teleport>
</template>