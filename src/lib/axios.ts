import axios from "axios"

import { backendUrl } from "@/constants/myapi"
export default axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Expires: "0",
  },
  params: {
    t: new Date().getTime(),
  },
})

export const axiosPrivate = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Pragma: "no-cache",
    Expires: "0",
  },
  params: {
    t: new Date().getTime(),
  },
})
