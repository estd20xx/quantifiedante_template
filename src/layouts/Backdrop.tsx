import React from "react"

import { useSidebar } from "../context/SidebarContext"

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar()

  if (!isMobileOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
      role="button"
      tabIndex={-112}
      onClick={toggleMobileSidebar}
      onKeyDown={() => {}}
    />
  )
}

export default Backdrop
