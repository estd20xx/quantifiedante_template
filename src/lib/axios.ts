import axios from "axios"

import { backendUrl } from "@/constants/myapi"

const baseUrl = backendUrl

export default axios.create({
  baseURL: baseUrl,
})

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})
