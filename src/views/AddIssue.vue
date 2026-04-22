<script setup>
import { ref } from "vue"
import AddIssueForm from "../components/AddIssueForm.vue"
import IssuesList from "../components/IssuesList.vue"
import { Plus, X, ClipboardList } from "lucide-vue-next"

const issuesListRef = ref(null)
const showAddModal = ref(false)
const editingItem = ref(null)

const openAddModal = () => {
  editingItem.value = null
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
  editingItem.value = null
}

const onIssueAdded = async () => {
  if (issuesListRef.value) {
    await issuesListRef.value.refreshList()
  }
  closeAddModal()
}

const onEditItem = (item) => {
  editingItem.value = item
  showAddModal.value = true
}

const onEditCancelled = () => {
  editingItem.value = null
  showAddModal.value = false
}
</script>

<template>
  <div class="p-4 md:p-6">

    <!-- HEADER -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">

      <h1 class="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
        <ClipboardList class="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
        Daftar Issue
      </h1>

      <button
        @click="openAddModal"
        class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
      >
        <Plus class="w-5 h-5" />
        Tambah Issue
      </button>

    </div>

    <!-- LIST -->
    <IssuesList
      ref="issuesListRef"
      @edit-item="onEditItem"
    />

    <!-- MODAL -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showAddModal"
          class="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50"
          @click.self="closeAddModal"
        >

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              class="bg-white w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >

              <!-- MODAL HEADER -->
              <div class="flex justify-between items-center p-4 md:p-5 border-b border-gray-200">

                <h2 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Plus v-if="!editingItem" class="w-5 h-5 text-blue-600" />
                  <ClipboardList v-else class="w-5 h-5 text-blue-600" />

                  {{ editingItem ? "Edit Issue" : "Tambah Issue" }}
                </h2>

                <button
                  @click="closeAddModal"
                  class="text-gray-500 hover:text-gray-700 active:scale-95 transition"
                >
                  <X class="w-6 h-6" />
                </button>

              </div>

              <!-- MODAL BODY -->
              <div class="p-4 md:p-6 overflow-y-auto">
                <AddIssueForm
                  :editing-item="editingItem"
                  @issue-added="onIssueAdded"
                  @edit-cancelled="onEditCancelled"
                />
              </div>

            </div>
          </Transition>

        </div>
      </Transition>
    </Teleport>

  </div>
</template>