import axios from "axios"

import { backendurl } from "@/constants/myapi"
const baseUrl = backendurl()

export default axios.create({
  baseURL: baseUrl,
})

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})
