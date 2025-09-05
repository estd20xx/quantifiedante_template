import { ChevronRight } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useSidebar } from "../context/SidebarContext"
import { ReactComponent as ControlCenter } from "../icons/ControlCenter.svg"
import { ReactComponent as Dot } from "../icons/Dot.svg"
import { ReactComponent as EchoCopier } from "../icons/EchoCopier.svg"
import { ActiveBlueDotIcon } from "../icons/icons"
import { ReactComponent as NeuraJournal } from "../icons/NeuraJournal.svg"
import { ReactComponent as Portfolio } from "../icons/PortFolio.svg"
import { ReactComponent as SentiMental } from "../icons/SentiMental.svg"
import { ReactComponent as SimulationVerse } from "../icons/SimulationVerse.svg"
import { ReactComponent as Support } from "../icons/Support.svg"
import { ReactComponent as TradeDesk } from "../icons/TradeDesk.svg"
import { ReactComponent as TrainingIndicator } from "../icons/TradingIndicators.svg"
import { ReactComponent as TrainingAcademy } from "../icons/TT.svg"
import { ReactComponent as AccountCenter } from "../icons/User.svg"

import { adminPanelUrl, websiteUrl } from "@/constants/myapi"
import { useMembership } from "@/hooks/useMembership"

const memberArray = ["Novice", "Professional", "Elite"]

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  pro?: boolean
  novice?: boolean
  elite?: boolean
  isPublic?: boolean
  isDirectLink?: boolean
  subItems?: {
    name: string
    path: string
    pro?: boolean
    novice?: boolean
    elite?: boolean
    isDirectLink?: boolean
  }[]
}

interface NavInterface {
  title: string
  items: Array<NavItem>
}

const newNavItems: Array<NavInterface> = [
  {
    title: "Admin Panel",
    items: [
      {
        icon: <AccountCenter />,
        name: "Admin",
        subItems: [
          {
            name: "Dashboard",
            path: "#",
          },
          {
            name: "Users",
            path: adminPanelUrl + "/auth?user_id=123&to=users",
          },
          {
            name: "Subscription",
            path: "#",
          },
          {
            name: "Orders",
            path: "#",
          },
          {
            name: "Products",
            path: "#",
          },
        ],
      },
      {
        name: "Training Academy",
        path: "#",
        icon: <TrainingAcademy />,

        subItems: [
          {
            name: "All Courses",
            path: "#",
          },
          {
            name: "Active Courses",
            path: "#",
          },
          {
            name: "Completed Courses",
            path: "#",
          },
          {
            name: "Certificates",
            path: "#",
          },
        ],
      },
      {
        icon: <Support />,
        name: "Support Center",

        isPublic: true,
        subItems: [
          {
            name: "Ask Sloan",
            path: "#",
          },
          {
            name: "Messages",
            path: "#",
          },
          {
            name: "Contact Us",
            path: "#",
          },
        ],
      },
    ],
  },

  {
    title: "PREDICTIVE TOOLS",
    items: [
      {
        icon: <ControlCenter />,
        name: "Control Center",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "Active Positions",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Account Connections",
            path: "#",
            pro: true,
            novice: false,
            elite: false,
          },
          {
            name: "Market Impacts",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
      {
        icon: <NeuraJournal />,
        name: "Neura Journal",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          { name: "Dashboard", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Performance",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "Orders", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Position History",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Cash History",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "Fills", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Account Balance History",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Execution Report",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Accounts P&L",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Sloan Insights",
            path: "#",
            pro: true,
            novice: false,
            elite: false,
          },
        ],
      },
      {
        icon: <TradeDesk />,
        name: "Trade Desk",
        path: "#",
        pro: true,
        novice: false,
        elite: false,
      },
      {
        icon: <EchoCopier />,
        name: "Echo Copier",
        path: "#",
        pro: false,
        novice: false,
        elite: true,
      },

      {
        icon: <SimulationVerse />,
        name: "Simulation Verse",
        path: "#",
        pro: true,
        novice: false,
        elite: false,
      },
      {
        name: "Trading Indicators",
        icon: <TrainingIndicator />,
        pro: false,
        novice: false,
        elite: false,
        isPublic: true,
        subItems: [
          {
            name: "Currently Active",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "To Explore", path: "#", pro: false, novice: false, elite: false },
        ],
      },
    ],
  },
  {
    title: "TRAINING PROGRAMS",
    items: [
      {
        name: "Training Academy",
        icon: <TrainingAcademy />,
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "All Courses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Active Courses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Completed Courses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Certificates",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },
  {
    title: "MORE SERVICES",
    items: [
      {
        icon: <Portfolio />,
        name: "Portfolio Management",
        path: "/portfolio-management",
        pro: false,
        novice: true,
        elite: false,
        subItems: [],
      },
      {
        icon: <SentiMental />,
        name: "Sentiment Subscriptions",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "Weekly Top Down",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Timely Bytes",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },

  {
    title: "ACCOUNT MANAGEMENT",
    items: [
      {
        icon: <AccountCenter />,
        name: "Account Center",
        pro: false,
        novice: false,
        elite: false,
        isPublic: true,
        subItems: [
          { name: "Dashboard", path: "#", pro: false, novice: false, elite: false },
          { name: "Orders", path: "#", pro: false, novice: false, elite: false },
          { name: "Downloads", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Subscriptions",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Wallets & Addresses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },

          { name: "Gifts Cards", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Communication Preferences",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Proprietary Indicators",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },

          {
            name: "Account Settings",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },
  {
    title: "GET SUPPORT",
    items: [
      {
        icon: <Support />,
        name: "Support Center",
        pro: false,
        novice: false,
        elite: false,
        isPublic: true,
        subItems: [
          { name: "Ask Sloan", path: "#", pro: false, novice: false, elite: false },
          { name: "Messages", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Contact Us",
            path: websiteUrl + "contact-us",
            pro: false,
            novice: false,
            elite: false,
            isDirectLink: true,
          },
        ],
      },
    ],
  },
]

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen, isApplicationMenuOpen } =
    useSidebar()
  const location = useLocation()
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname])
  const { memberShipPlan } = useMembership()

  interface ActiveMenuInterface {
    menuIdx: number
    childIdx: number
    grandChildIdx: number
  }

  const [activeMenu, setActiveMenu] = useState<ActiveMenuInterface>({
    menuIdx: 0,
    childIdx: -1,
    grandChildIdx: 0,
  })

  const navigate = useNavigate()

  const handleNavigate = useCallback(
    (items: NavItem) => {
      if (items.path === "#") return

      if (items.path) {
        navigate(items.path)

        return
      }

      if (items.subItems) {
        // check here for direct link
        if (items.subItems[0].isDirectLink) {
          window.open(items.subItems[0].path)
          return
        }
        setActiveMenu((prev) => ({ ...prev, grandChildIdx: 0 }))
        navigate(items.subItems[0].path)
      }
    },
    [navigate],
  )

  useEffect(() => {
    // navigate("/")
  }, [])

  return (
    <aside
      className={`z-999 fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0        
          bg-white dark:bg-tableBg text-gray-900 h-screen 
          duration-300 ease-in-out  border-r border-gray-200/25 shadow-md 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"} hidden lg:block`}
      >
        <a href={`${websiteUrl}`}>
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                alt="Logo"
                className="dark:hidden"
                height={40}
                src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/logo/blackblogowithname.png"
                width={150}
              />
              <img
                alt="Logo"
                className="hidden dark:block"
                height={40}
                src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/logo/whitelogowithname.png"
                width={150}
              />
            </>
          ) : (
            <>
              <img
                alt="Logo"
                className="hidden dark:block"
                height={32}
                src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/logo/whitelogo.png"
                width={32}
              />
              <img
                alt="Logo"
                className="dark:hidden block"
                height={32}
                src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/logo/blacklogo.png"
                width={32}
              />
            </>
          )}
        </a>
      </div>
      <div
        className={`flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar  ${isApplicationMenuOpen ? "pt-24" : "pt-10"}  lg:pt-0`}
      >
        <nav className="mb-6">
          <div className="flex flex-col gap-4 mb-20 md:mb-5 lg:mb-0">
            {newNavItems.map((current, idx) => {
              return (
                <div key={idx} className="">
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <h2 className="font-semibold text-xs text-grayNeuraText mb-5">{current.title}</h2>
                  )}
                  {!isExpanded && !isHovered && !isMobileOpen && (
                    <h2 className="font-semibold text-xs text-grayNeuraText mb-5 text-center">
                      {current.title.split(" ")[0][0] + current.title.split(" ")[1][0]}
                    </h2>
                  )}
                  <div
                    className={`w-full h-auto flex flex-col gap-3 mt-2 ${idx !== newNavItems.length - 1 && "border-b"}`}
                  >
                    {current.items.map((items, cIdx) => {
                      return (
                        <div key={`${items.name}-${cIdx}`}>
                          <div
                            className={`${activeMenu.menuIdx === idx && activeMenu.childIdx === cIdx ? "bg-blueSideBarActive text-textBlue" : "text-blackMilkish dark:text-whiteMilkish"} flex items-center justify-between min-h-12 px-3 rounded-lg`}
                            role="button"
                            tabIndex={-32}
                            onClick={() => {
                              // setActiveMenu({ menuIdx: idx, childIdx: cIdx, grandChildIdx: 0 })
                              setActiveMenu((prev) => ({
                                ...prev,
                                childIdx: prev.childIdx === cIdx && prev.menuIdx === idx ? -1 : cIdx,
                                menuIdx: idx,
                              }))
                              handleNavigate(items)
                              setIsMobileOpen(false)
                            }}
                            onKeyDown={() => {}}
                          >
                            <div className=" flex items-center h-full gap-3">
                              {items.icon}
                              {/* // screen collapse in large*/}
                              {isExpanded ||
                                (isHovered && !isMobileOpen && (
                                  <p className="font-semibold text-sm hidden lg:block">{items.name}</p>
                                ))}
                              {/* // if Screen Expanded for large */}
                              {isExpanded && (
                                <p className="font-semibold text-sm hidden lg:block">{items.name}</p>
                              )}

                              {isMobileOpen && (
                                <p className="font-semibold text-sm lg:hidden">{items.name}</p>
                              )}
                            </div>
                            {items.novice &&
                              (isExpanded || isHovered) &&
                              memberShipPlan !== "Novice" &&
                              memberShipPlan !== "Professional" &&
                              memberShipPlan !== "Elite" && (
                                <span
                                  className={`ml-auto bg-activeLightGreenLight text-greenNeura px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                                >
                                  NOV+
                                </span>
                              )}
                            {items.novice &&
                              isMobileOpen &&
                              memberShipPlan !== "Novice" &&
                              memberShipPlan !== "Professional" &&
                              memberShipPlan !== "Elite" && (
                                <span
                                  className={`ml-auto bg-activeLightGreenLight text-greenNeura px-1 rounded-lg text-[10px] font-lg:hidden`}
                                >
                                  NOV+
                                </span>
                              )}
                            {items.elite && (isExpanded || isHovered) && memberShipPlan !== "Elite" && (
                              <span
                                className={`ml-auto bg-eliteBadge text-eliteBadgeText px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                              >
                                ELITE+
                              </span>
                            )}
                            {items.elite && isMobileOpen && memberShipPlan !== "Elite" && (
                              <span
                                className={`ml-auto bg-eliteBadge text-eliteBadgeText px-1 rounded-lg text-[10px] font-semibold lg:hidden`}
                              >
                                ELITE+
                              </span>
                            )}
                            {items.pro &&
                              (isExpanded || isHovered) &&
                              memberShipPlan !== "Professional" &&
                              memberShipPlan !== "Elite" && (
                                <span
                                  className={`ml-auto bg-proBadgeBg text-proBadgeText px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                                >
                                  PRO+
                                </span>
                              )}
                            {items.pro &&
                              isMobileOpen &&
                              memberShipPlan !== "Professional" &&
                              memberShipPlan !== "Elite" && (
                                <span
                                  className={`ml-auto bg-proBadgeBg text-proBadgeText px-1 rounded-lg text-[10px] font-semibold lg:hidden`}
                                >
                                  PRO+
                                </span>
                              )}
                            {items.subItems?.length !== 0 && !items.pro && !items.elite && !items.novice && (
                              <ChevronRight
                                className={`${activeMenu.menuIdx === idx && activeMenu.childIdx === cIdx ? "rotate-90" : ""} duration-250 `}
                                style={{
                                  height: "17px",
                                  width: "17px",
                                }}
                              />
                            )}
                            {(items.subItems?.length !== 0 &&
                              items.pro &&
                              (memberShipPlan === "Elite" || memberShipPlan === "Professional")) ||
                              (items.elite && memberShipPlan === "Elite") ||
                              (items.novice &&
                                (memberShipPlan === "Elite" ||
                                  memberShipPlan === "Professional" ||
                                  memberShipPlan === "Novice") && (
                                  <ChevronRight
                                    className={`${activeMenu.menuIdx === idx && activeMenu.childIdx === cIdx ? "rotate-90" : ""} duration-250 `}
                                    style={{
                                      height: "17px",
                                      width: "17px",
                                    }}
                                  />
                                ))}
                          </div>
                          {(isHovered || isExpanded || isMobileOpen) && (
                            <div
                              className={`${activeMenu.menuIdx === idx && activeMenu.childIdx === cIdx ? "h-auto" : "h-0"} duration-500 flex pt-2 flex-col gap-3 overflow-hidden`}
                              style={{
                                // 48px
                                height: `${activeMenu.menuIdx === idx && activeMenu.childIdx === cIdx ? 60 * (items.subItems?.length ?? 0) + 12 : 0}px`,
                              }}
                            >
                              {items.subItems?.map((subItem, subIdx) => {
                                return (
                                  <div
                                    key={`idx-` + subIdx}
                                    className={`${activeMenu.grandChildIdx === subIdx ? "text-pinkMilkish" : "text-blackMilkish dark:text-whiteMilkish"}border-grayBorder min-h-12 cursor-pointer flex items-center justify-between rounded-lg  gap-2 pl-3`}
                                    role="button"
                                    tabIndex={-232}
                                    onClick={() => {
                                      setIsMobileOpen(false)
                                      if (!subItem.isDirectLink) {
                                        setActiveMenu((prev) => ({ ...prev, grandChildIdx: subIdx }))
                                        navigate(subItem.path)

                                        return
                                      }
                                      window.open(subItem.path)
                                    }}
                                    onKeyDown={() => {}}
                                  >
                                    {activeMenu.grandChildIdx === subIdx ? <ActiveBlueDotIcon /> : <Dot />}
                                    <p
                                      className={`${activeMenu.grandChildIdx === subIdx ? "text-textBlue" : "text-blackMilkish dark:text-whiteMilkish"} whitespace-nowrap font-semibold text-sm`}
                                    >
                                      {subItem.name}
                                    </p>
                                    {subItem.novice &&
                                      (isExpanded || isHovered) &&
                                      memberShipPlan !== "Novice" &&
                                      memberShipPlan !== "Professional" &&
                                      memberShipPlan !== "Elite" && (
                                        <span
                                          className={`ml-auto bg-activeLightGreenLight text-greenNeura px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                                        >
                                          NOV+
                                        </span>
                                      )}
                                    {subItem.elite &&
                                      (isExpanded || isHovered) &&
                                      memberShipPlan !== "Elite" && (
                                        <span
                                          className={`ml-auto bg-eliteBadge text-eliteBadgeText px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                                        >
                                          ELITE+
                                        </span>
                                      )}
                                    <span className="flex items-center gap-1 ml-auto">
                                      {subItem.pro &&
                                        (isExpanded || isHovered) &&
                                        memberShipPlan !== "Professional" &&
                                        memberShipPlan !== "Elite" && (
                                          <span
                                            className={`ml-auto ${
                                              isActive(subItem.path)
                                                ? "menu-dropdown-badge-active"
                                                : "menu-dropdown-badge-inactive"
                                            } menu-dropdown-badge`}
                                          >
                                            pro
                                          </span>
                                        )}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <></> : null} */}
      </div>
    </aside>
  )
}

export default React.memo(AppSidebar)
