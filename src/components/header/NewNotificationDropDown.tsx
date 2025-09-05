import { MoveUpRight } from "lucide-react"
import moment from "moment"
import { useRef, useState } from "react"

//@ts-ignore
import { ReactComponent as BellIcon } from "../../icons/Bell-icon.svg"

// import BellIcon from "../../icons/Bell-icon.svg";

import { useOutsideClick } from "@/hooks/useOutsideClick"

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

const NewNotificationDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useOutsideClick(dropdownRef, () => setIsOpen(false))

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none ">
      <div
        className="flex items-center  h-12  relative  w-9 ml-4"
        role="button"
        tabIndex={-2121}
        onClick={toggleDropdown}
        onKeyDown={() => {}}
      >
        <BellIcon className={` ${isOpen && "text-pinkMilkish"} cursor-pointer hover:text-pinkMilkish`} />
        {/* <span className="absolute right-0 bg-pinkMilkish h-5 w-5 rounded-full flex items-center justify-center text-white text-xs top-2">
          {notifications.length}
        </span> */}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute  left-[calc(-200px)] mt-2 w-96 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none border border-grayBorder py-2 z-999"
          role="menu"
        >
          <div className="flex items-center justify-between px-3 border-b pb-1 border-grayBorder">
            <p className="text-sm flex gap-2 items-center">
              Notifications{" "}
              <span className=" bg-pinkMilkish h-4 w-4 rounded-full flex items-center justify-center text-white text-[9px] top-2">
                0
              </span>
            </p>
            <MoveUpRight className="cursor-pointer hover:opacity-70" size={15} />
          </div>
          <div className="flex justify-center gap-1 flex-col py-3">
            {notifications.map((notification, idx) => {
              return (
                <div
                  key={`${notification.title}-${idx}`}
                  className="max-h-14 grid grid-cols-[70%_30%] px-3 cursor-pointer hover:bg-slate-300/20 py-2"
                  role="button"
                  onClick={() => setIsOpen(false)}
                >
                  <p className="text-sm flex flex-col">
                    <span>{notification.title}</span>
                    <span className="text-xs">
                      {notification.desc.length > 36
                        ? notification.desc.slice(0, 36) + "..."
                        : notification.desc}
                    </span>
                  </p>
                  <p className="text-[10px] text-center"> {moment(notification.date).fromNow()} </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewNotificationDropDown
