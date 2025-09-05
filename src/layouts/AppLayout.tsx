import { Spinner } from "@heroui/react"
import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import { SidebarProvider, useSidebar } from "../context/SidebarContext"

import AppHeader from "./AppHeader"
import AppSidebar from "./AppSidebar"
import Backdrop from "./Backdrop"

import { websiteurl } from "@/constants/myapi"

const RedirectComp = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(websiteurl() as string)
    }, 3000)
  })

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">
      <Spinner color="danger" label="Checking Authentication..." labelColor="danger" />
    </div>
  )
}

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()
  const [userId] = useState(() => localStorage.getItem("user_id") ?? "")

  // localStorage.setItem("user_id", "6847903dbd2d5d84a578579c")

  return (
    <div className="w-full">
      <div className="min-h-screen xl:flex w-full">
        <div>
          <AppSidebar />
          <Backdrop />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out relative ${
            isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""} `}
        >
          <AppHeader />

          <div className="p-4 mx-auto min-w-screen-2xl md:p-6 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}

export default AppLayout
