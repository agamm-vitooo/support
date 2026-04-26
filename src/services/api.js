import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME
const PRESET = import.meta.env.VITE_UPLOAD_PRESET

const api = async (params = {}) => {
  try {
    const url = BASE_URL + "?" + new URLSearchParams(params).toString()

    const res = await fetch(url)
    const data = await res.json().catch(() => null)

    if (!res.ok || data?.success === false) {
      throw new Error(data?.message || "API Error")
    }

    return data
  } catch (err) {
    throw err
  }
}

export const getIssues = () => api({ action: "get" })

export const addIssue = (payload) =>
  api({
    action: "add",
    tgl_tiket: payload.tgl_tiket || "",
    no_tiket: payload.no_tiket || "",
    pic_support: payload.pic_support || "",
    keluhan: payload.keluhan || "",
    capture: payload.capture || "",
    keterangan: payload.keterangan || "",
    tgl_lapor_support: payload.tgl_lapor_support || "",
    pic_har: payload.pic_har || "",
    tgl_deploy: payload.tgl_deploy || "",
    jenis: payload.jenis || "",
    status: payload.status || "Open",
    status_deploy_production: payload.status_deploy_production || ""
  })

export const updateIssue = (payload) =>
  api({
    action: "update",
    no: payload.no,
    tgl_tiket: payload.tgl_tiket || "",
    no_tiket: payload.no_tiket || "",
    pic_support: payload.pic_support || "",
    keluhan: payload.keluhan || "",
    capture: payload.capture || "",
    keterangan: payload.keterangan || "",
    tgl_lapor_support: payload.tgl_lapor_support || "",
    pic_har: payload.pic_har || "",
    tgl_deploy: payload.tgl_deploy || "",
    jenis: payload.jenis || "",
    status: payload.status || "",
    status_deploy_production: payload.status_deploy_production || ""
  })

export const deleteIssue = (no) =>
  api({
    action: "delete",
    no
  })

export const getIssueByNo = async (no) => {
  const res = await getIssues()
  const list = res?.data || []

  return list.find(item => String(item.no) === String(no)) || null
}

export const uploadImage = async (file) => {
  const form = new FormData()
  form.append("file", file)
  form.append("upload_preset", PRESET)

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    form
  )

  return data.secure_url
}