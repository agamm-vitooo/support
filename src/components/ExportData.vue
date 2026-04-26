<!-- src/components/ExportData.vue -->
<script setup>
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import {
  FileSpreadsheet,
  FileText
} from "lucide-vue-next"

const props = defineProps({
  filteredData: {
    type: Array,
    default: () => []
  }
})

const formatRows = (rows) => {
  return rows.map((item, index) => ({
    No: index + 1,
    "No Tiket": item.no_tiket || "",
    "Tanggal": item.tgl_tiket || "",
    "PIC Support": item.pic_support || "",
    "Status": item.status || "",
    "Keluhan": item.keluhan || "",
    "Keterangan": item.keterangan || ""
  }))
}

/* ======================
   EXPORT EXCEL
====================== */
const exportExcel = () => {
  const data = formatRows(props.filteredData)

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, "Issues")
  XLSX.writeFile(wb, `issue-report-${Date.now()}.xlsx`)
}

/* ======================
   EXPORT PDF
====================== */
const exportPDF = () => {
  const data = formatRows(props.filteredData)

  const doc = new jsPDF("landscape")

  doc.setFontSize(14)
  doc.text("Issue Report", 14, 15)

  autoTable(doc, {
    startY: 22,
    head: [[
      "No",
      "No Tiket",
      "Tanggal",
      "PIC Support",
      "Status",
      "Keluhan",
      "Keterangan"
    ]],
    body: data.map(i => [
      i.No,
      i["No Tiket"],
      i["Tanggal"],
      i["PIC Support"],
      i["Status"],
      i["Keluhan"],
      i["Keterangan"]
    ]),
    styles: {
      fontSize: 8,
      cellPadding: 2
    },
    headStyles: {
      fillColor: [37, 99, 235]
    }
  })

  doc.save(`issue-report-${Date.now()}.pdf`)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

    <!-- EXCEL -->
    <button
      @click="exportExcel"
      class="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-green-200 bg-white hover:bg-green-50 transition shadow-sm"
    >
      <span class="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
        <FileSpreadsheet class="w-4 h-4 text-green-600" />
      </span>

      <div class="text-left">
        <p class="text-sm font-semibold text-gray-800">
          Export Excel
        </p>
        <p class="text-xs text-gray-400">
          .xlsx format
        </p>
      </div>
    </button>

    <!-- PDF -->
    <button
      @click="exportPDF"
      class="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-red-200 bg-white hover:bg-red-50 transition shadow-sm"
    >
      <span class="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
        <FileText class="w-4 h-4 text-red-600" />
      </span>

      <div class="text-left">
        <p class="text-sm font-semibold text-gray-800">
          Export PDF
        </p>
        <p class="text-xs text-gray-400">
          Landscape format
        </p>
      </div>
    </button>

  </div>
</template>