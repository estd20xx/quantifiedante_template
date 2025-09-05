import { Spinner } from "@heroui/react"
import { Sidebar } from "@namelessnerd/quantifiedante"
import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"

import { SidebarProvider, useSidebar } from "../context/SidebarContext"
import { ReactComponent as Dot } from "../icons/Dot.svg"

import AppHeader from "./AppHeader"

import { websiteUrl } from "@/constants/myapi"
import { newNavItems } from "@/constants/navigation.constant"
import { useMembership } from "@/hooks/membership"
import { ActiveBlueDotIcon } from "@/icons/icons"

const RedirectComp = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(websiteUrl)
    }, 3000)
  })

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col">
      <Spinner color="primary" label="Checking Authentication..." labelColor="primary" />
    </div>
  )
}

const LayoutContent: React.FC = () => {
  const { memberShipPlan } = useMembership()
  const location = useLocation()
  const navigate = useNavigate()
  const [userId] = useState(() => localStorage.getItem("user_id") ?? "")
  const {
    isExpanded,
    isApplicationMenuOpen,
    isHovered,
    isMobileOpen,
    setIsHovered,
    setIsMobileOpen,
    toggleMobileSidebar,
  } = useSidebar()

  return (
    <div className="">
      {userId.length > 1 ? (
        <div className="min-h-screen xl:flex w-full">
          <Sidebar
            activeIcon={<ActiveBlueDotIcon />}
            inActiveIcon={<Dot />}
            isApplicationMenuOpen={isApplicationMenuOpen}
            isExpanded={isExpanded}
            isHovered={isHovered}
            isMobileOpen={isMobileOpen}
            location={location}
            memberShipPlan={memberShipPlan}
            navigate={navigate}
            newNavItems={newNavItems}
            setIsHovered={setIsHovered}
            setIsMobileOpen={setIsMobileOpen}
            toggleMobileSidebar={toggleMobileSidebar}
            websiteUrl={websiteUrl}
          />
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
      ) : (
        <RedirectComp />
      )}
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
