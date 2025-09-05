import React, { useEffect, useRef, useState } from "react"

import { months, quickSelects, weekdays, yearRange } from "../constants/indedx"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CalendarIcon, LeftIcon, RightIcon } from "../icons/icons"
import { formatPayloadDate, getDaysInMonth, getFirstDayOfWeek, isInRange, isSameDay } from "../utils/utils"

// Define props interface for the component
interface CustomDateRangePickerProps {
  selectedDates?: {
    start: string
    end: string
  }
  onChange?: (dates: { start: string; end: string }) => void
  className?: string
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  selectedDates,
  onChange,
  className = "",
}) => {
  // Add ref to track the component
  const datePickerRef = useRef<HTMLDivElement>(null)

  // Helper function to parse MM/dd/yyyy format to Date object
  const parseDateString = (dateStr: string): Date | null => {
    if (!dateStr) return null
    const [month, day, year] = dateStr.split("/").map(Number)

    return new Date(year, month - 1, day) // month - 1 because Date constructor uses 0-based months
  }

  // Helper function to format Date to MM/dd/yyyy string
  const formatDateToString = (date?: Date | null): string => {
    if (!date) return ""
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  // Initialize dates from props or defaults
  const getInitialDates = () => {
    if (selectedDates?.start && selectedDates?.end) {
      const start = parseDateString(selectedDates.start)
      const end = parseDateString(selectedDates.end)

      return { start, end }
    }

    // Default to 8 days ago to today
    const today = new Date()
    const sevenDaysAgo = new Date(today)

    sevenDaysAgo.setDate(today.getDate() - 8)

    return { start: sevenDaysAgo, end: today }
  }

  const initialDates = getInitialDates()

  // State for selected dates
  const [startDate, setStartDate] = useState<Date | null>(initialDates.start)
  const [endDate, setEndDate] = useState<Date | null>(initialDates.end)

  // State for visible months
  const [startMonth, setStartMonth] = useState<number>(
    initialDates.start?.getMonth() || new Date().getMonth(),
  )
  const [startYear, setStartYear] = useState<number>(
    initialDates.start?.getFullYear() || new Date().getFullYear(),
  )
  const [endMonth, setEndMonth] = useState<number>(
    initialDates.end?.getMonth() || (new Date().getMonth() + 1 > 11 ? 0 : new Date().getMonth() + 1),
  )
  const [endYear, setEndYear] = useState<number>(
    initialDates.end?.getFullYear() ||
      (new Date().getMonth() + 1 > 11 ? new Date().getFullYear() + 1 : new Date().getFullYear()),
  )

  // Picker open/close
  const [open, setOpen] = useState<boolean>(false)
  // Track selection step
  const [selecting, setSelecting] = useState<"start" | "end">("start")
  // Add state for custom dropdowns above the DateRangePicker component
  const [openMonthDropdown, setOpenMonthDropdown] = useState<{
    start: boolean
    end: boolean
  }>({ start: false, end: false })
  const [openYearDropdown, setOpenYearDropdown] = useState<{
    start: boolean
    end: boolean
  }>({ start: false, end: false })

  // Update internal state when props change
  useEffect(() => {
    if (selectedDates?.start && selectedDates?.end) {
      const start = parseDateString(selectedDates.start)
      const end = parseDateString(selectedDates.end)

      if (start && end) {
        setStartDate(start)
        setEndDate(end)
        setStartMonth(start.getMonth())
        setStartYear(start.getFullYear())
        setEndMonth(end.getMonth())
        setEndYear(end.getFullYear())
      }
    }
  }, [selectedDates])

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setOpen(false)
        // Close dropdowns when calendar closes
        setOpenMonthDropdown({ start: false, end: false })
        setOpenYearDropdown({ start: false, end: false })
      }
    }

    // Add event listener when calendar is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  // Notify parent component when dates change
  const notifyDateChange = (start: Date | null, end: Date | null) => {
    if (onChange && start && end) {
      onChange({
        start: formatPayloadDate(start) || "",
        end: formatPayloadDate(end) || "",
      })
    }
  }

  // Handle day click
  const handleDayClick = (day: number, month: number, year: number, which: "start" | "end") => {
    const date = new Date(year, month, day)
    console.log(which)

    // If we're selecting start date
    if (selecting === "start") {
      setStartDate(date)
      setStartMonth(date.getMonth())
      setStartYear(date.getFullYear())
      setEndDate(null)
      setSelecting("end")
    }
    // If we're selecting end date
    else {
      if (date < startDate!) {
        setEndDate(startDate)
        setEndMonth(startDate!.getMonth())
        setEndYear(startDate!.getFullYear())
        setStartDate(date)
        setStartMonth(date.getMonth())
        setStartYear(date.getFullYear())
      } else {
        setEndDate(date)
        setEndMonth(date.getMonth())
        setEndYear(date.getFullYear())
      }
      setSelecting("start")
      setOpen(false)

      // Notify parent of the complete date range
      if (date < startDate!) {
        notifyDateChange(date, startDate)
      } else {
        notifyDateChange(startDate, date)
      }
    }
  }

  // Handle quick select
  const handleQuickSelect = (getRange: () => [Date, Date]) => {
    const [start, end] = getRange()

    setStartDate(start)
    setStartMonth(start.getMonth())
    setStartYear(start.getFullYear())
    setEndDate(end)
    setEndMonth(end.getMonth())
    setEndYear(end.getFullYear())
    setOpen(false)
    setSelecting("start")

    // Notify parent of the selected range
    notifyDateChange(start, end)
  }

  // Handle previous month navigation
  const handlePreviousMonth = (month: number, year: number, which: "start" | "end") => {
    if (which === "start") {
      if (month === 0) {
        setStartMonth(11)
        setStartYear(year - 1)
      } else {
        setStartMonth(month - 1)
      }
    } else {
      if (month === 0) {
        setEndMonth(11)
        setEndYear(year - 1)
      } else {
        setEndMonth(month - 1)
      }
    }
  }

  // Handle next month navigation
  const handleNextMonth = (month: number, year: number, which: "start" | "end") => {
    if (which === "start") {
      if (month === 11) {
        setStartMonth(0)
        setStartYear(year + 1)
      } else {
        setStartMonth(month + 1)
      }
    } else {
      if (month === 11) {
        setEndMonth(0)
        setEndYear(year + 1)
      } else {
        setEndMonth(month + 1)
      }
    }
  }

  const renderCalendar = (month: number, year: number, which: "start" | "end") => {
    const days = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfWeek(month, year)

    return (
      <div className="w-64 bg-white flex-1">
        {/* Calendar header: arrows and dropdowns horizontally aligned */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left Arrow */}
          <button
            aria-label="Previous Month"
            className="p-1"
            type="button"
            onClick={() => handlePreviousMonth(month, year, which)}
          >
            <LeftIcon size={25} />
          </button>
          {/* Month and Year Selectors */}
          <div className="flex items-center gap-2">
            {/* Custom Month Dropdown */}
            <div className="relative">
              <button
                className=" px-1 py-0.5 text-sm min-w-[80px] flex items-center justify-between"
                type="button"
                onClick={() =>
                  setOpenMonthDropdown((prev) => ({
                    ...prev,
                    [which]: !prev[which],
                  }))
                }
              >
                <span className="text-[#262626] text-[14px] font-[600]"> {months[month]}</span>
                <ArrowDownIcon size={10} />
              </button>
              <hr className="border-1 border-[#D9D9D9] border-b mt-2 w-[80%]" />
              {openMonthDropdown[which] && (
                <div className="absolute left-0 z-20 bg-white border rounded shadow w-[100px]">
                  {months?.map((m, i) => (
                    <button
                      key={m}
                      className={`block w-full text-left px-3 py-1 text-[#262626] hover:bg-gray-100 text-[14px] font-[400] ${
                        i === month ? "bg-gray-100 font-semibold" : ""
                      }`}
                      type="button"
                      onClick={() => {
                        if (which === "start") setStartMonth(i)
                        else setEndMonth(i)
                        setOpenMonthDropdown((prev) => ({
                          ...prev,
                          [which]: false,
                        }))
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Custom Year Dropdown */}
            <div className="relative">
              <button
                className=" rounded px-1 py-0.5 text-sm min-w-[60px] flex items-center justify-between"
                type="button"
                onClick={() =>
                  setOpenYearDropdown((prev) => ({
                    ...prev,
                    [which]: !prev[which],
                  }))
                }
              >
                <span className="text-[#262626] text-[14px] font-[600]   border-[#D9D9D9]"> {year}</span>
                <ArrowDownIcon size={10} />
              </button>
              <hr className="border-1 border-[#D9D9D9] border-b mt-2 w-[80%]" />

              {openYearDropdown[which] && (
                <div className="absolute left-0 z-20 bg-white border rounded shadow w-[100px] ">
                  {yearRange?.map((y) => (
                    <button
                      key={y}
                      className={`block w-full text-left px-3 py-1 text-[#262626] hover:bg-gray-100 text-[14px] font-[400] ${
                        y === year ? "bg-gray-100 font-semibold" : ""
                      }`}
                      type="button"
                      onClick={() => {
                        if (which === "start") setStartYear(y)
                        else setEndYear(y)
                        setOpenYearDropdown((prev) => ({
                          ...prev,
                          [which]: false,
                        }))
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            aria-label="Next Month"
            className="p-1"
            type="button"
            onClick={() => handleNextMonth(month, year, which)}
          >
            <RightIcon size={25} />
          </button>
        </div>
        <div className="grid grid-cols-7 text-xs text-center  px-2 ">
          {weekdays?.map((d) => (
            <p
              key={d}
              className="text-[#262626] text-[12px] font-[400] hover:bg-[#F2F2F2]  h-[20px] w-[20px] flex items-center justify-center"
            >
              {d}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-7 px-2 pb-2">
          {/* Empty slots for first day */}
          {Array.from({ length: firstDay })?.map((_, i) => <div key={i} />)}
          {days?.map((day) => {
            const date = new Date(year, month, day)

            const isRange = startDate && endDate && isInRange(date, startDate, endDate)
            const isStart = isSameDay(date, startDate)
            const isEnd = isSameDay(date, endDate)

            return (
              <button
                key={day}
                className={
                  `w-10 h-10 mb-1 text-[16px] font-[500]
                   sm:w-12 sm:h-12 sm:text-[18px]
                   md:w-8 md:h-8 md:text-[14px] md:font-[400]
                   lg:w-10 lg:h-10 lg:text-[16px]
                  ` +
                  (isStart ? "bg-[#FF557E] text-white rounded-tl-[6px] rounded-bl-[6px] " : "") +
                  (isEnd ? "bg-[#FF557E] text-white rounded-tr-[6px] rounded-br-[6px] " : "") +
                  (isRange ? "bg-[#F2F2F2] text-[#262626] rounded-[1px]" : "") +
                  (!isStart && !isEnd && !isRange ? "hover:bg-[#F2F2F2] rounded-[1px] " : "")
                }
                onClick={() => handleDayClick(day, month, year, which)}
              >
                <span className="text-[12px]">{day}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div ref={datePickerRef} className={className + " relative"}>
      {/* Date picker button */}
      <div className="flex items-center gap-2 mb-2 md:mt-0 ">
        <button
          className={`
            w-full h-14  px-4 py-3 rounded-md border shadow-sm flex items-center justify-between bg-white transition-all
            text-[16px] font-[500]
            border-[#E4E7EC] 
            ${open ? "border-[#E4E7EC] border-2" : ""}
            md:h-12 md:px-3 md:py-1 md:text-[14px] md:font-[400] md:shadow-none
          `}
          onClick={() => setOpen((o) => !o)}
        >
          {/* Calendar Icon and Date Text */}
          <span className="flex items-center gap-2">
            <span className="text-[#262626]">
              {/* Responsive icon size: 20 for desktop, 24 for mobile */}
              <CalendarIcon size={20} />
            </span>
            <span className="text-[#A6A6A6] text-nowrap ">
              {startDate && endDate
                ? `${formatDateToString(startDate)} to ${formatDateToString(endDate)}`
                : "Select Date"}
            </span>
          </span>
          {/* Dropdown Arrow with smooth rotation */}
          <span
            className={`
              ml-2 transition-transform duration-300
              ${open ? "rotate-180" : "rotate-0"}
            `}
          >
            <ArrowUpIcon size={13} />
          </span>
        </button>
      </div>
      {/* Picker dropdown with smooth transition */}
      <div
        className={`
          absolute right-0 top-11 z-10 bg-[#FFFFFF] rounded-[8px] border border-[#D9D9D9]
          flex flex-col w-screen max-w-[98vw] left-1/2 -translate-x-1/2
          mt-2 shadow-lg
          sm:max-w-[500px]
          md:flex-row md:w-auto md:max-w-none md:left-auto md:translate-x-0
          lg:min-w-[700px] xl:min-w-[900px]
          transition-all duration-300 ease-in-out
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
        style={{ visibility: open ? "visible" : "hidden" }}
      >
        {/* Calendar section */}
        <div className="flex flex-col flex-1 border-b border-[#D9D9D9] md:border-b-0 md:border-r">
          <div className="flex justify-center gap-4 items-center px-2 pt-4 pb-2 border-b border-[#D9D9D9] md:gap-12 md:px-6 lg:gap-28">
            <p className="font-semibold text-[#262626] text-[14px] ">Start Day</p>
            <ArrowRightIcon size={30} />
            <p className="font-semibold text-[#262626] text-[14px] ml-2">Finish Day</p>
          </div>
          {/* Calendars: stack on mobile, row on tablet/desktop */}
          <div className="flex flex-col gap-4 px-2 pb-4 sm:flex-row sm:gap-6 sm:px-4 md:gap-4 md:px-6 lg:gap-8">
            {/* Start calendar */}
            {renderCalendar(startMonth, startYear, "start")}
            {/* End calendar */}
            {renderCalendar(endMonth, endYear, "end")}
          </div>
        </div>
        {/* Quick select sidebar: below on mobile, side on tablet/desktop */}
        <div className="w-full p-2 flex flex-row flex-wrap gap-2 sm:w-56 sm:p-4 sm:flex-col md:w-48">
          {quickSelects?.map((opt) => (
            <button
              key={opt.label}
              className={`text-left px-3 py-2 rounded hover:bg-[#F2F2F2] text-[#262626] text-[12px] font-[600]`}
              onClick={() => {
                const [start, end] = opt.getRange()

                if (start && end) {
                  handleQuickSelect(() => [start, end])
                }
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomDateRangePicker
