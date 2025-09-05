import { useEffect } from "react"

import { axiosPrivate } from "../lib/axios"
export const useAxiosPrivate = () => {
  const token = "token will provided after login."

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`
        }

        return config
      },
      (error) => Promise.reject(error),
    )
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // need to handle get new refreshToken
          prevRequest.sent = true
          window.location.replace("/login")

          return axiosPrivate(prevRequest)
        }

        return Promise.reject(error)
      },
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [])

  return [axiosPrivate] as const
}
