import { useEffect, useState } from "react"

import { SearchTypes, dataList } from "../data/searchData"

export interface SearchResultInterface extends SearchTypes {
  snippet?: string
}
const CHARACTER_BUFFER = 15

export const useSearch = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  const [query, setQuery] = useState<string>("")

  const [animatedItems, setAnimatedItems] = useState<Array<SearchResultInterface>>([])

  useEffect(() => {
    let currentIndex = 0

    setAnimatedItems([])

    const filteredData: SearchResultInterface[] = dataList
      .filter((item) => item.data.toLowerCase().includes(query.toLowerCase()))
      .map((item) => {
        const dataLower = item.data.toLowerCase()
        const queryLower = query.toLowerCase()
        const matchIndex = dataLower.indexOf(queryLower)

        const endIndex = Math.min(item.data.length, matchIndex + query.length + CHARACTER_BUFFER)
        const snippet = item.data.substring(matchIndex, endIndex) + (endIndex < item.data.length ? "..." : "")

        return {
          ...item,
          snippet: snippet,
        }
      })

    const interval = setInterval(() => {
      if (currentIndex < filteredData.length) {
        setAnimatedItems((prev) => [...prev, filteredData[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [query])

  return {
    query,
    setQuery,
    isSearchBarOpen,
    setIsSearchBarOpen,
    animatedItems,
    setAnimatedItems,
    isCartOpen,
    setIsCartOpen,
  }
}
