import { useEffect } from "react"

export const useScrollBehaviour = (isWindowStopScrolling: boolean = false) => {
  useEffect(() => {
    const originalStyle = document.body.style.overflow

    isWindowStopScrolling
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = originalStyle || "visible")

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isWindowStopScrolling])
}
