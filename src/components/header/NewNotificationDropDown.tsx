import { useRef, useState } from "react"
import { useOutsideClick } from "../../../src/hooks/useOutsideClick"
import { ReactComponent as BellIcon } from "../../icons/Bell-icon.svg"

const notifications: Array<Readonly<{ title: string; desc: string; date: string }>> = [
  // {
  //   title: "Novice membership purchased",
  //   desc: "Core Curriculum and Training through the Quantified Ante Learning Academy",
  //   date: "2025-06-25"
  // },
  // { title: "Plan auto renew", desc: "your plan on QuantifiedAnte has been renewed", date: "2021-07-02" },
  // { title: "Password Changed", desc: "your password has been changed", date: "2025-07-02" },
  // { title: "random notification", desc: "random descriptions", date: "2024-07-02" },
  // { title: "random notification", desc: "random descriptions", date: "2025-01-02" }
]

const NewNotificationDropDown = ({ tradeWorkingTime }: { tradeWorkingTime: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useOutsideClick(dropdownRef, () => setIsOpen(false))

  const isTradingHalted = tradeWorkingTime && tradeWorkingTime.status === 1

  const getNotificationCount = () => {
    if (tradeWorkingTime && tradeWorkingTime.event_titles && Array.isArray(tradeWorkingTime.event_titles)) {
      return tradeWorkingTime.event_titles.length
    }

    if (notifications && notifications.length > 0) {
      return notifications.length
    }

    return 0
  }

  const getNotificationMessage = (event: any) => {
    if (!event || !event.title) {
      return "Event information unavailable"
    }

    const startTime = event.Event_Start
    const endTime = event.Event_End

    const startDate = event.Event_Start.split("T")[0].trim().split("-").reverse()
    const formattedStartDate = new Date(`${startDate[2]}-${startDate[1]}-${startDate[0]}`).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    )
    const endDate = event.Event_End.split("T")[0].trim().split("-").reverse()
    const formattedEndDate = new Date(`${endDate[2]}-${endDate[1]}-${endDate[0]}`).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    )

    if (!startTime || !endTime) {
      return `Due to "${event.title}", trading is currently halted. Trading will resume soon.`
    }

    const extractTimeFromISO = (isoString: string) => {
      const timePart = isoString.split("T")[1]
      const timeWithoutSeconds = timePart.split(":").slice(0, 2).join(":")
      return timeWithoutSeconds
    }

    const formattedStartTime = extractTimeFromISO(startTime)
    const formattedEndTime = extractTimeFromISO(endTime)

    return `Due to "${event.title}", trade is halted from ${formattedStartDate} ${formattedStartTime} to ${formattedEndDate} ${formattedEndTime}. Trading will resume soon.`
  }

  return (
    <div className="relative inline-block text-left select-none " ref={dropdownRef}>
      <div
        className="flex items-center  h-12  relative  w-9 ml-4"
        role="button"
        tabIndex={-2121}
        onClick={toggleDropdown}
      >
        <BellIcon
          className={` ${isOpen && "text-backgroundBlue"} cursor-pointer hover:text-backgroundBlue`}
        />
        {getNotificationCount() > 0 && (
          <span className="absolute right-0 bg-backgroundBlue h-5 w-5 rounded-full flex items-center justify-center text-white text-xs top-2">
            {getNotificationCount()}
          </span>
        )}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute  left-[calc(0px)] lg:left-[calc(-200px)] mt-2 w-80 lg:w-96
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none border border-grayBorder py-2 z-999"
          role="menu"
        >
          <div className="flex items-center justify-between px-3 border-b pb-1 border-grayBorder">
            <p className="text-sm flex gap-2 items-center">
              Notifications{" "}
              <span className=" bg-backgroundBlue h-4 w-4 rounded-full flex items-center justify-center text-white text-[9px] top-2">
                {getNotificationCount()}
              </span>
            </p>
            {/* <MoveUpRight size={15} className="cursor-pointer hover:opacity-70" /> */}
          </div>
          <div className="flex justify-center gap-1 flex-col py-3">
            {isTradingHalted &&
            tradeWorkingTime &&
            tradeWorkingTime.event_titles &&
            tradeWorkingTime.event_titles.length > 0 ? (
              tradeWorkingTime.event_titles.map((event: any, index: number) => (
                <div
                  key={`event-${index}`}
                  className="max-h-14 grid grid-cols-1 px-3 cursor-pointer hover:bg-slate-300/20 py-2 border-b border-gray-100 last:border-b-0"
                  role="button"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xs text-gray-600">{getNotificationMessage(event)}</span>
                </div>
              ))
            ) : !isTradingHalted ? (
              <div className="px-3 py-2 text-center">
                <p className="text-sm text-gray-500">No notifications at the moment</p>
              </div>
            ) : (
              <div className="px-3 py-2 text-center">
                <p className="text-sm text-gray-500">No events available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewNotificationDropDown
