import { useEffect, useState } from "react"

export const useWindow = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return [windowHeight] as const
}
