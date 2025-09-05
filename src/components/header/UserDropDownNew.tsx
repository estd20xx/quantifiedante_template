import { ChevronDown } from "lucide-react"
import { useRef, useState } from "react"

import { useOutsideClick } from "../../../src/hooks/useOutsideClick"
//@ts-ignore
import { ReactComponent as AccountCenter } from "../../icons/quantified-ante-sidebar-menu-account-center-default-icon-light-mode copy.svg"
//@ts-ignore
import { ReactComponent as Logout } from "../../icons/quantified-ante-sidebar-menu-log-out-default-icon-light-mode.svg"
//@ts-ignore
import { ReactComponent as PortfolioManagement } from "../../icons/quantified-ante-sidebar-menu-portfolio-management-default-icon-light-mode copy.svg"
//@ts-ignore
import { ReactComponent as PredectiveApplication } from "../../icons/quantified-ante-sidebar-menu-predictive-application-default-icon-light-mode.svg"
//@ts-ignore
import { ReactComponent as Sentimental } from "../../icons/quantified-ante-sidebar-menu-sentiment-subscriptions-default-icon-light-mode copy.svg"
//@ts-ignore
import { ReactComponent as SupportCenter } from "../../icons/quantified-ante-sidebar-menu-support-center-default-icon-light-mode copy.svg"
//@ts-ignore
import { ReactComponent as TrainingIndicators } from "../../icons/quantified-ante-sidebar-menu-trading-indicators-default-icon-light-mode copy.svg"
//@ts-ignore
import { ReactComponent as TrainingAcademy } from "../../icons/quantified-ante-sidebar-menu-training-academy-default-icon-light-mode copy.svg"

import { frontendUrl, websiteUrl } from "@/constants/myapi"
import { MemberType, useMembership } from "@/hooks/useMembership"
const user_id = localStorage.getItem("user_id")

export const usersDropDown: Array<{
  title: string
  link: string
  icons: React.ReactNode
  memberShip: string
}> = [
  {
    title: "Predictive Tools",
    link: `${frontendUrl}auth?user_id=${user_id}&to=dashboard`,
    icons: <PredectiveApplication className="w-6 h-6" />,
    memberShip: "Novice",
  },
  {
    title: "Trading Indicators",
    link: `${frontendUrl}auth?user_id=${user_id}&to=trading-indicators`,
    icons: <TrainingIndicators className="w-6 h-6" />,
    memberShip: "",
  },
  {
    title: "Training Academy",
    link: `${frontendUrl}auth?user_id=${user_id}&to=training-academy`,
    icons: <TrainingAcademy className="w-6 h-6" />,
    memberShip: "Novice",
  },
  {
    title: "Portfolio Management",
    link: `${frontendUrl}auth?user_id=${user_id}&to=portfolio-managament`,
    icons: <PortfolioManagement className="w-6 h-6" />,
    memberShip: "Novice",
  },
  {
    title: "Sentiment Subscriptions",
    link: `${frontendUrl}auth?user_id=${user_id}&to=sentiment-subscriptions`,
    icons: <Sentimental className="w-6 h-6" />,
    memberShip: "Novice",
  },
]

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const toggleDropdown = (e: any) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_email")
    // dispatch(logout())
    // Optionally clear all localStorage data
    // localStorage.clear();

    window.location.replace(`${websiteUrl}`)
  }

  const { memberShipPlan, expiryDatePlan } = useMembership()

  useOutsideClick(dropdownRef, () => setIsOpen(false))

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      <div
        className=" flex items-center h-12 border border-grayBorder cursor-pointer max-h-44 rounded-md lg:pr-1"
        role="button"
        tabIndex={-2121}
        onClick={toggleDropdown}
        onKeyDown={() => {}}
      >
        <div className="flex items-center justify-center h-full w-11 ">
          <img
            alt="userAvatar"
            className="rounded"
            src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/ProfesstionalBear.png"
            style={{ width: "30px", backgroundColor: "", borderRadius: "50%" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-normal">
            {localStorage.getItem("user_name")}
            <span
              className={`block text-xs  dark:text-black/60 text-black/50`}
              style={{ fontSize: "0.7rem", width: "100%", textAlign: "left" }}
            >
              {memberShipPlan}
            </span>
          </p>
          <ChevronDown
            className={`text-black duration-300 ${isOpen ? "rotate-180" : "rotate-0"} h-4`}
            // size={15}
          />
        </div>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 left-0 md:left-0 mt-2 w-72 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none border border-grayBorder py-5"
          role="menu"
        >
          <div className="min-h-40 w-full flex flex-col">
            <div className="flex flex-col gap-2 px-3">
              {memberShipPlan === "Professional" ||
              memberShipPlan === "Elite" ||
              memberShipPlan === "Novice" ? (
                <div className="overflow-hidden border rounded-md border-grayBorder">
                  <div
                    className={`flex gap-3 px-2 py-1 rounded-t-sm  ${(memberShipPlan as MemberType) === "Professional" ? "bg-cyanCustom text-white" : (memberShipPlan as MemberType) === "Elite" ? "text-white bg-orangeElite" : "bg-greenSurface text-white"}`}
                  >
                    {(memberShipPlan as MemberType) === "Professional" && (
                      <img
                        alt="novice logo"
                        src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/icons/quantified-ante-prefessional-membership-plan-default-icon.svg"
                      />
                    )}
                    {(memberShipPlan as MemberType) === "Elite" && (
                      <img
                        alt="novice logo"
                        src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/elite.svg"
                      />
                    )}
                    {(memberShipPlan as MemberType) === "Novice" && (
                      <img
                        alt="novice logo"
                        src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/novice.svg"
                      />
                    )}
                    <p className="text-xs font-semibold">{memberShipPlan} Membership</p>
                  </div>
                  <div className="px-2 py-2 text-xs">
                    <p className="text-grayuserText">Next Payment:</p>
                    <p>{expiryDatePlan}</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden border rounded-md border-grayBorder">
                  <div className="flex gap-3 px-2 py-1  rounded-t-sm bg-[#F8F8F8] text-black">
                    <p className="text-xs text-black font-semibold">No Membership Plan</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 px-3 py-2  border-t border-grayBorder mt-4">
              <p className="uppercase text-grayuserText text-xs font-medium pt-2">PRODUCTS AND SERVICES</p>
              {usersDropDown.map((current) => {
                return (
                  <a key={current.title} href={current.link}>
                    <div
                      className="flex items-center gap-2 text-xs font-semibold cursor-pointer min-h-10 hover:text-pinkMilkish px-3"
                      role="button"
                      tabIndex={-123}
                    >
                      {current.icons}
                      <p className="text-xs">{current.title}</p>
                      {current.memberShip === "Novice" && memberShipPlan === "No Plan" && (
                        <span
                          className={`ml-auto bg-activeLightGreenLight text-greenNeura px-1 rounded-lg text-[10px] font-lg:hidden`}
                        >
                          NOV+
                        </span>
                      )}
                      {current.memberShip === "Professional" &&
                        (memberShipPlan === "No Plan" || memberShipPlan === "Novice") && (
                          <span
                            className={`ml-auto bg-proBadgeBg text-proBadgeText px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                          >
                            PRO+
                          </span>
                        )}
                      {current.memberShip === "Elite" && memberShipPlan !== "Elite" && (
                        <span
                          className={`ml-auto bg-eliteBadge text-eliteBadgeText px-1 rounded-lg text-[10px] font-semibold hidden lg:block`}
                        >
                          ELITE+
                        </span>
                      )}
                    </div>
                  </a>
                )
              })}
            </div>
            <div className="flex flex-col gap-3 px-3 py-2 border-y border-grayBorder">
              <p className="uppercase text-grayuserText text-xs font-medium pt-2">ACCOUNT MANAGEMENT</p>
              <div
                className="flex items-center gap-2 text-xs font-semibold cursor-pointer min-h-10 hover:text-pinkMilkish px-3"
                role="button"
                tabIndex={-1243}
                onClick={() =>
                  (window.location.href = `${frontendUrl}auth?user_id=${user_id}&to=account-center`)
                }
                onKeyDown={() => {}}
              >
                <AccountCenter className="max-w-6 max-h-6" />
                <p>Account Center</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-3 py-2 border-y border-grayBorder">
              <p className="uppercase text-grayuserText text-xs font-medium pt-2">GET SUPPORT</p>
              <div
                className="flex items-center gap-2 text-xs font-semibold cursor-pointer min-h-10 hover:text-pinkMilkish px-3"
                role="button"
                tabIndex={-124343}
                onClick={() =>
                  (window.location.href = `${frontendUrl}auth?user_id=${user_id}&to=support-center`)
                }
                onKeyDown={() => {}}
              >
                <SupportCenter className="w-6 h-6" />
                <p>Support Center</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 px-4 mt-2">
              <div
                className="flex items-center gap-2 text-sm font-semibold cursor-pointer min-h-10 hover:text-pinkMilkish px-3"
                role="button"
                tabIndex={-2323}
                onClick={handleLogout}
              >
                <Logout className="h-6 w-6" />
                <button className="text-xs">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
