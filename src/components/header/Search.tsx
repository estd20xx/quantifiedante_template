import { Search as SearchIcon, X } from "lucide-react"
import React, { useEffect, useRef } from "react"

import { SearchResultInterface } from "@/hooks/useSearch"

const Search = ({
  isSearchBarOpen,
  setIsSearchBarOpen,
  query,
  setQuery,
  animatedItems,
}: Readonly<{
  isSearchBarOpen: boolean
  setIsSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>
  setQuery: React.Dispatch<React.SetStateAction<string>>
  query: string
  animatedItems: Array<SearchResultInterface>
}>) => {
  // useScrollBehaviour(isSearchBarOpen)

  const searchBoxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchBoxRef.current?.focus()
    setQuery("")
  }, [isSearchBarOpen])

  return (
    <div
      className={`fixed ${isSearchBarOpen ? "h-screen w-full p-6 top-0" : "h-0 w-full p-0"} overflow-hidden inset-0  flex items-start justify-center bg-tableBg/70 backdrop-blur-md duration-400 z-9999999`}
      role="button"
      tabIndex={-12}
      onClick={(e) => {
        e.stopPropagation()
        setIsSearchBarOpen(false)
      }}
      onKeyDown={() => {}}
    >
      <div className="absolute md:right-10 right-6">
        <button
          className="py-2 flex gap-2 text-xs items-center text-white"
          onClick={() => setIsSearchBarOpen(false)}
        >
          Close
          <p className="p-1 border border-white rounded-md">
            <X className="text-white" size={12} />
          </p>
        </button>
      </div>
      <div
        className={`relative w-[818px] ${isSearchBarOpen ? "mt-20" : "mt-0"} duration-700  flex items-center gap-3 px-4 bg-white rounded-md`}
        role="button"
        tabIndex={-132}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => {}}
      >
        <SearchIcon className="text-black" size={20} />
        <input
          ref={searchBoxRef}
          className="w-full min-h-16  text-base text-blackDarkGray outline-none bg-transparent placeholder:text-grayuserText placeholder:text-base  border-none focus:outline-none focus:ring-0 focus:border-none"
          id="search"
          placeholder="What can we help you find?"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <X className="text-black hover:text-pinkMilkish" size={20} onClick={() => setQuery("")} />
        <div
          className={`w-full absolute top-[70px] bg-white left-0  text-base font-normal
             ${query.length > 0 ? "max-h-[439px] min-h-0 p-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-blackDarkGray scrollbar-track-grayBorder" : "h-0 min-h-0 px-4"} overflow-hidden duration-400 text-black rounded-md`}
        >
          <div className="font-semibold text-sm leading-6 py-5 pt-2 border-b border-grayBorder">
            {animatedItems.length > 0
              ? `We found ${animatedItems.length} Related Topics to Your Query`
              : "We found 0 Related Topics to Your Query, Please Refine Your Keywords Used"}
          </div>
          {animatedItems.map((current, idx) => {
            return (
              <a
                key={`${current?.title}-${idx}`}
                href={current?.url}
                onClick={() => [setIsSearchBarOpen(false)]}
              >
                <div className="mb-1 flex items-center gap-[10px] border-b border-grayBorder py-5">
                  <div className="">
                    <SearchIcon className="text-grayuserText min-h-5 " />
                  </div>
                  <p className="text-black">{current?.snippet}</p>
                  <p className="bg-graySkeleton font-semibold text-xs py-1 px-2 rounded-lg">
                    <span className="mx-1">in:</span>
                    {current?.title}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Search)
