import { useEffect, useState } from "react"

export function useScreenHeight() {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight)

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { windowHeight }
}
