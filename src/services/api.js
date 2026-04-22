import axios from "axios"

const SHEET_URL = import.meta.env.VITE_API_URL
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME
const PRESET = import.meta.env.VITE_UPLOAD_PRESET

// ===============================
// Ambil semua issue (GET)
// ===============================
export const getIssues = async () => {
  const res = await fetch(SHEET_URL)
  const text = await res.text()
  return JSON.parse(text)
}

// ===============================
// Tambah issue (pakai GET query agar lolos CORS)
// ===============================
export const addIssue = async (payload) => {
  const params = new URLSearchParams({
    action: "add",
    tanggal: payload.tanggal || "",
    nama_support: payload.nama_support || "",
    title: payload.title || "",
    keterangan: payload.keterangan || "",
    solusi: payload.solusi || "",
    status: payload.status || "Pending",
    foto: payload.foto || ""
  })

  const res = await fetch(`${SHEET_URL}?${params.toString()}`)
  const text = await res.text()
  return JSON.parse(text)
}

// ===============================
// Hapus issue
// ===============================
export const deleteIssue = async (id) => {
  const params = new URLSearchParams({
    action: "delete",
    id: id
  })

  const res = await fetch(`${SHEET_URL}?${params.toString()}`)
  const text = await res.text()
  return JSON.parse(text)
}

// ===============================
// Update issue
// ===============================
export const updateIssue = async (payload) => {
  const params = new URLSearchParams({
    action: "update",
    id: payload.id || "",
    tanggal: payload.tanggal || "",
    nama_support: payload.nama_support || "",
    title: payload.title || "",
    keterangan: payload.keterangan || "",
    solusi: payload.solusi || "",
    status: payload.status || "Pending",
    foto: payload.foto || ""
  })

  const res = await fetch(`${SHEET_URL}?${params.toString()}`)
  const text = await res.text()
  return JSON.parse(text)
}

// ===============================
// Upload gambar ke Cloudinary
// ===============================
export const uploadImage = async (file) => {
  const form = new FormData()

  form.append("file", file)
  form.append("upload_preset", PRESET)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )

  return res.data.secure_url
}