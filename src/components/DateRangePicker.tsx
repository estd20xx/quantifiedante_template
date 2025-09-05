import React, { useState, useEffect, useRef } from "react"
import { ArrowUpIcon, CalendarIcon, LeftIcon, RightIcon } from "../icons/icons"
import { formatPayloadDate, getDaysInMonth, getFirstDayOfWeek, isInRange, isSameDay } from "../utils/utils"
import { months, quickSelects, weekdays } from "../constants/index"

interface CustomDateRangePickerProps {
  selectedDates?: {
    start: string
    end: string
  }
  onChange?: (dates: { start: string; end: string }) => void
  className?: string
  iconSize?: number
  allowSingleDate?: boolean
}

const CustomDateRangePicker = ({
  selectedDates,
  onChange,
  className = "",
  iconSize = 12,
  allowSingleDate = true
}: CustomDateRangePickerProps) => {
  const datePickerRef = useRef<HTMLDivElement>(null)

  const parseDateString = (dateStr: string): Date | null => {
    if (!dateStr) return null
    const [month, day, year] = dateStr.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  const formatDateToString = (date?: Date | null): string => {
    if (!date) return ""
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-2)
    return `${month}/${day}/${year}`
  }

  const formatDateToInputString = (date?: Date | null): string => {
    if (!date) return ""
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = String(date.getFullYear())
    return `${month}/${day}/${year}`
  }

  const parseInputDateString = (dateStr: string): Date | null => {
    if (!dateStr) return null
    const parts = dateStr.split("/")
    if (parts.length !== 3) return null

    const [month, day, year] = parts.map(Number)
    if (isNaN(month) || isNaN(day) || isNaN(year)) return null

    const date = new Date(year, month - 1, day)

    if (date.getMonth() !== month - 1 || date.getDate() !== day || date.getFullYear() !== year) {
      return null
    }
    return date
  }

  const getInitialDates = () => {
    if (selectedDates?.start && selectedDates?.end) {
      const start = parseDateString(selectedDates.start)
      const end = parseDateString(selectedDates.end)
      return { start, end }
    }

    const today = new Date()
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 8)
    return { start: sevenDaysAgo, end: today }
  }

  const initialDates = getInitialDates()

  const [startDate, setStartDate] = useState<Date | null>(initialDates.start)
  const [endDate, setEndDate] = useState<Date | null>(initialDates.end)

  const [startDateInput, setStartDateInput] = useState<string>(formatDateToInputString(initialDates.start))
  const [endDateInput, setEndDateInput] = useState<string>(formatDateToInputString(initialDates.end))

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const [startMonth, setStartMonth] = useState<number>(initialDates.start?.getMonth() || currentMonth)
  const [startYear, setStartYear] = useState<number>(initialDates.start?.getFullYear() || currentYear)
  const [endMonth, setEndMonth] = useState<number>(
    initialDates.end?.getMonth() || (currentMonth + 1 > 11 ? 0 : currentMonth + 1)
  )
  const [endYear, setEndYear] = useState<number>(
    initialDates.end?.getFullYear() || (currentMonth + 1 > 11 ? currentYear + 1 : currentYear)
  )

  const [open, setOpen] = useState<boolean>(false)





  const [selecting, setSelecting] = useState<"start" | "end">("start")

  const [openMonthDropdown, setOpenMonthDropdown] = useState<{
    start: boolean
    end: boolean
  }>({ start: false, end: false })
  const [openYearDropdown, setOpenYearDropdown] = useState<{
    start: boolean
    end: boolean
  }>({ start: false, end: false })

  const [inputErrors, setInputErrors] = useState<{
    start: boolean
    end: boolean
  }>({ start: false, end: false })

  const [isSingleDateSelection, setIsSingleDateSelection] = useState<boolean>(
    initialDates.start && initialDates.end ? isSameDay(initialDates.start, initialDates.end) : false
  )

  
  const setCalendarLayout = (startDate: Date, endDate: Date) => {
    setStartMonth(startDate.getMonth())
    setStartYear(startDate.getFullYear())
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
     
      const nextMonth = endDate.getMonth() + 1
      const nextYear = endDate.getFullYear()
      if (nextMonth > 11) {
        setEndMonth(0)
        setEndYear(nextYear + 1)
      } else {
        setEndMonth(nextMonth)
        setEndYear(nextYear)
      }
    } else {
      setEndMonth(endDate.getMonth())
      setEndYear(endDate.getFullYear())
    }
  }

  useEffect(() => {
    if (selectedDates?.start && selectedDates?.end) {
      const start = parseDateString(selectedDates.start)
      const end = parseDateString(selectedDates.end)
      if (start && end) {
        const nextDayAfterStart = new Date(start.getTime())
        nextDayAfterStart.setDate(start.getDate() + 1)
        const isSingleDatePayload = isSameDay(end, nextDayAfterStart)

        setStartDate(start)
        
        if (isSingleDatePayload) {
          setEndDate(start)
          setStartDateInput(formatDateToInputString(start))
          setEndDateInput(formatDateToInputString(start))
        } else {
          const displayEnd = new Date(end.getTime())
          displayEnd.setDate(end.getDate() - 1)
          setEndDate(displayEnd)
          setStartDateInput(formatDateToInputString(start))
          setEndDateInput(formatDateToInputString(displayEnd))
        }
        setStartMonth(start.getMonth())
        setStartYear(start.getFullYear())

        if (isSingleDatePayload) {
          
          const oneMonthLess = start.getMonth() - 1
          const yearForFirstCalendar = start.getFullYear()
          if (oneMonthLess < 0) {
            setStartMonth(11)
            setStartYear(yearForFirstCalendar - 1)
          } else {
            setStartMonth(oneMonthLess)
            setStartYear(yearForFirstCalendar)
          }
          setEndMonth(start.getMonth())
          setEndYear(start.getFullYear())
        } else {
          const displayEnd = new Date(end.getTime())
          displayEnd.setDate(end.getDate() - 1)
          
         
          setCalendarLayout(start, displayEnd)
        }

        setIsSingleDateSelection(isSingleDatePayload)
      }
    }
  }, [selectedDates])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setOpenMonthDropdown({ start: false, end: false })
        setOpenYearDropdown({ start: false, end: false })
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleInputChange = (value: string, field: "start" | "end") => {
    if (field === "start") {
      setStartDateInput(value)
    } else {
      setEndDateInput(value)
    }

    setInputErrors((prev) => ({ ...prev, [field]: false }))
  }

  const handleInputBlur = (field: "start" | "end") => {
    const inputValue = field === "start" ? startDateInput : endDateInput
    const parsedDate = parseInputDateString(inputValue)

    if (parsedDate) {
      if (field === "start") {
        setStartDate(parsedDate)
        setStartMonth(parsedDate.getMonth())
        setStartYear(parsedDate.getFullYear())

        if (isSingleDateSelection) {
          setEndDate(parsedDate)
          const oneMonthLess = parsedDate.getMonth() - 1
          const yearForFirstCalendar = parsedDate.getFullYear()
          if (oneMonthLess < 0) {
            setStartMonth(11)
            setStartYear(yearForFirstCalendar - 1)
          } else {
            setStartMonth(oneMonthLess)
            setStartYear(yearForFirstCalendar)
          }
          setEndMonth(parsedDate.getMonth())
          setEndYear(parsedDate.getFullYear())
          setEndDateInput(formatDateToInputString(parsedDate))
        } else {
          if (endDate) {
            setCalendarLayout(parsedDate, endDate)
          } else {
            const nextMonth = parsedDate.getMonth() + 1
            const nextYear = parsedDate.getFullYear()
            if (nextMonth > 11) {
              setEndMonth(0)
              setEndYear(nextYear + 1)
            } else {
              setEndMonth(nextMonth)
              setEndYear(nextYear)
            }
          }
        }
      } else {
        setEndDate(parsedDate)
        setEndMonth(parsedDate.getMonth())
        setEndYear(parsedDate.getFullYear())
      }
      setInputErrors((prev) => ({ ...prev, [field]: false }))
    } else if (inputValue.trim()) {
      setInputErrors((prev) => ({ ...prev, [field]: true }))
    }
  }

  const handleApply = () => {
    let finalStart = startDate
    let finalEnd = endDate

    const startParsed = parseInputDateString(startDateInput)
    const endParsed = parseInputDateString(endDateInput)

    if (startParsed) {
      finalStart = startParsed
    }

    if (endParsed) {
      finalEnd = endParsed
    } else if (startParsed && !endDate) {
      finalEnd = startParsed
    }

    if (!finalStart) {
      setInputErrors({
        start: startDateInput.trim() !== "",
        end: false
      })
      return
    }

    if (finalStart && finalEnd) {
      if (finalStart > finalEnd) {
        const temp = finalStart
        finalStart = finalEnd
        finalEnd = temp
      }
    } else if (finalStart) {
      finalEnd = finalStart
    }

    const isSingleDateForDisplay = finalStart && finalEnd && isSameDay(finalStart, finalEnd)

    setStartDate(finalStart)
    setEndDate(isSingleDateForDisplay ? finalStart : finalEnd)
    setStartDateInput(formatDateToInputString(finalStart))
    setEndDateInput(formatDateToInputString(isSingleDateForDisplay ? finalStart : finalEnd))

    if (isSingleDateForDisplay) {
      
      const oneMonthLess = finalStart!.getMonth() - 1
      const yearForFirstCalendar = finalStart!.getFullYear()
      if (oneMonthLess < 0) {
        setStartMonth(11)
        setStartYear(yearForFirstCalendar - 1)
      } else {
        setStartMonth(oneMonthLess)
        setStartYear(yearForFirstCalendar)
      }
      
      
      setEndMonth(finalStart!.getMonth())
      setEndYear(finalStart!.getFullYear())
    } else {
      
      setCalendarLayout(finalStart!, finalEnd!)
    }

    setIsSingleDateSelection(!!isSingleDateForDisplay)

    if (onChange) {
      if (isSingleDateForDisplay) {
        const nextDay = new Date(finalStart!)
        nextDay.setDate(finalStart!.getDate() + 1)

        onChange({
          start: formatPayloadDate(finalStart) || "",
          end: formatPayloadDate(nextDay) || ""
        })
      } else {
        const nextDayAfterEnd = new Date(finalEnd!)
        nextDayAfterEnd.setDate(finalEnd!.getDate() + 1)

        onChange({
          start: formatPayloadDate(finalStart) || "",
          end: formatPayloadDate(nextDayAfterEnd) || ""
        })
      }
    }

    setInputErrors({ start: false, end: false })

    setOpen(false)
  }

  const handleCancel = () => {
    if (selectedDates?.start && selectedDates?.end) {
      const start = parseDateString(selectedDates.start)
      const end = parseDateString(selectedDates.end)
      if (start && end) {
        setStartDate(start)
        setEndDate(end)
        setStartDateInput(formatDateToInputString(start))
        setEndDateInput(formatDateToInputString(end))
        
       
        setCalendarLayout(start, end)
      }
    }

    setInputErrors({ start: false, end: false })

    setOpen(false)
  }

  const handleSingleDateSelection = (date: Date) => {
    setStartDate(date)
    setEndDate(date)
    setStartDateInput(formatDateToInputString(date))
    setEndDateInput(formatDateToInputString(date))
    
   
    const oneMonthLess = date.getMonth() - 1
    const yearForFirstCalendar = date.getFullYear()
    if (oneMonthLess < 0) {
      setStartMonth(11)
      setStartYear(yearForFirstCalendar - 1)
    } else {
      setStartMonth(oneMonthLess)
      setStartYear(yearForFirstCalendar)
    }
    
    
    setEndMonth(date.getMonth())
    setEndYear(date.getFullYear())

    setIsSingleDateSelection(true)

    setSelecting("start")
  }

  const handleRangeDateSelection = (start: Date, end: Date) => {
    setStartDate(start)
    setEndDate(end)
    setStartDateInput(formatDateToInputString(start))
    setEndDateInput(formatDateToInputString(end))
    
    
    setCalendarLayout(start, end)

    setIsSingleDateSelection(false)

    setSelecting("start")
  }

  const handleDayClick = (day: number, month: number, year: number, which: "start" | "end") => {
    const date = new Date(year, month, day)

    if (selecting === "start") {
      setStartDate(date)
      setStartDateInput(formatDateToInputString(date))
      setStartMonth(date.getMonth())
      setStartYear(date.getFullYear())

     
      const nextMonth = date.getMonth() + 1
      const nextYear = date.getFullYear()
      if (nextMonth > 11) {
        setEndMonth(0)
        setEndYear(nextYear + 1)
      } else {
        setEndMonth(nextMonth)
        setEndYear(nextYear)
      }

      if (allowSingleDate && endDate && isSameDay(date, endDate)) {
        handleSingleDateSelection(date)
        return
      }

      setEndDate(null)
      setEndDateInput("")
      setSelecting("end")
    } else {
      if (date < startDate!) {
        handleRangeDateSelection(date, startDate!)
      } else {
        if (isSameDay(date, startDate!)) {
          handleSingleDateSelection(date)
          return
        } else {
          handleRangeDateSelection(startDate!, date)
        }
      }
    }
  }




  
  
  const handleQuickSelect = (getRange: () => [Date, Date]) => {
    const [start, end] = getRange()
    const isSingleDate = isSameDay(start, end)

    if (isSingleDate) {
      handleSingleDateSelection(start)
    } else {
      handleRangeDateSelection(start, end)
    }

    setInputErrors({ start: false, end: false })
  }

  const handlePreviousMonth = (month: number, year: number, which: "start" | "end") => {
    if (which === "start") {
      if (month === 0) {
        setStartMonth(11)
        setStartYear(year - 1)
        setEndMonth(0)
        setEndYear(year - 1)
      } else {
        setStartMonth(month - 1)
        setEndMonth(month)
        setEndYear(year)
      }
    } else {
      if (month === 0) {
        setEndMonth(11)
        setEndYear(year - 1)
        setStartMonth(10)
        setStartYear(year - 1)
      } else {
        setEndMonth(month - 1)
        setStartMonth(month - 2)
        setStartYear(year)
      }
    }
  }

  const handleNextMonth = (month: number, year: number, which: "start" | "end") => {
    if (which === "start") {
      if (month === 11) {
        setStartMonth(0)
        setStartYear(year + 1)
        setEndMonth(1)
        setEndYear(year + 1)
      } else {
        setStartMonth(month + 1)
        setEndMonth(month + 2)
        setEndYear(year)
      }
    } else {
      if (month === 11) {
        setEndMonth(0)
        setEndYear(year + 1)
        setStartMonth(11)
        setStartYear(year)
      } else {
        setEndMonth(month + 1)
        setStartMonth(month)
        setStartYear(year)
      }
    }
  }

  const handlePreviousYear = (year: number, which: "start" | "end") => {
    if (which === "start") {
      setStartYear(year - 1)
      setEndYear(year - 1)
    } else {
      setEndYear(year - 1)
      setStartYear(year - 1)
    }
  }

  const handleNextYear = (year: number, which: "start" | "end") => {
    if (which === "start") {
      setStartYear(year + 1)
      setEndYear(year + 1)
    } else {
      setEndYear(year + 1)
      setStartYear(year + 1)
    }
  }

  const renderCalendar = (month: number, year: number, which: "start" | "end") => {
    const days = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfWeek(month, year)
    const today = new Date()
    return (
      <div className="md:w-64 lg:w-64 w-full bg-white flex-1">
        <div className="flex items-center justify-between px-4 py-2">
          {which === "start" && (
            <div className="flex items-center gap-1">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handlePreviousYear(year, which)}
                aria-label="Previous Year"
                type="button"
              >
                <div className="flex items-center gap-0">
                  <LeftIcon size={28} />
                </div>
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handlePreviousMonth(month, year, which)}
                aria-label="Previous Month"
                type="button"
              >
                <LeftIcon size={20} />
              </button>
            </div>
          )}

          {/* Month and Year Display */}
          <div className="flex items-center gap-2">
            <span className="text-[#262626] text-[14px] font-[600]">
              {months[month]} {year}
            </span>
          </div>

          {which === "end" && (
            <div className="flex items-center gap-1">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleNextMonth(month, year, which)}
                aria-label="Next Month"
                type="button"
              >
                <RightIcon size={20} />
              </button>
              {/* Double Right Arrow for Year */}
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleNextYear(year, which)}
                aria-label="Next Year"
                type="button"
              >
                <div className="flex items-center">
                  <RightIcon size={28} />
                </div>
              </button>
            </div>
          )}
        </div>
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 text-center px-2 py-2">
          {weekdays?.map((d) => (
            <div key={d} className="h-8 flex items-center justify-center">
              <span className="text-[#262626] text-[12px] font-[500]">{d}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1 px-2 pb-2">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDay })?.map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}

          {/* Calendar days */}
          {days?.map((day) => {
            const date = new Date(year, month, day)
            const isSelected = isSameDay(date, which === "start" ? startDate : endDate)
            const isRange = startDate && endDate && isInRange(date, startDate, endDate)
            const isStart = isSameDay(date, startDate)
            const isEnd = isSameDay(date, endDate)
            const isToday = isSameDay(date, today)

            const isSingleDate = startDate && endDate && isSameDay(startDate, endDate)

            return (
              <button
                key={day}
                className={`
                   h-8 w-full flex items-center justify-center
                   text-[14px] font-[500] 
                   transition-all duration-200
                   ${
                     isSingleDate && isStart
                       ? "bg-backgroundBlue text-white rounded-md text-[14px] font-[500]"
                       : !isSingleDate && isStart
                         ? "bg-backgroundBlue text-white rounded-tl-[6px] rounded-bl-[6px] text-[14px] font-[500]"
                         : !isSingleDate && isEnd
                           ? "bg-backgroundBlue text-white rounded-tr-[6px] rounded-br-[6px] text-[14px] font-[500]"
                           : !isSingleDate && isRange
                             ? "bg-[#F2F2F2] text-[#262626] rounded-[1px]"
                             : isToday
                               ? "bg-gray-200 text-[#262626] font-bold rounded-md"
                               : "hover:bg-[#F2F2F2] text-[#262626] rounded-md"
                   }
                 `}
                onClick={() => handleDayClick(day, month, year, which)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={className + " relative "} ref={datePickerRef}>
      <button
        className={`
          relative p-2 whitespace-nowrap text-grayNeuraText flex items-center gap-2 border border-grayBorder rounded-md
          text-[14px] font-[400] bg-white transition-all w-full h-[48px] min-h-[48px]
          ${open ? "border-[#E4E7EC] " : ""}
        `}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[#262626] flex-shrink-0">
            <CalendarIcon size={20} />
          </span>
          <span
            className={`text-[#262626] text-nowrap text-[14px] font-[500] truncate ${iconSize && ` text-gray-900`}`}
          >
            {startDate && endDate
              ? isSameDay(startDate, endDate)
                ? formatDateToString(startDate)
                : `${formatDateToString(startDate)} to ${formatDateToString(endDate)}`
              : startDate
                ? formatDateToString(startDate)
                : "Select Date"}
          </span>
        </div>
        <span
          className={`
            text-black transition-transform duration-300 flex-shrink-0
            ${open ? "rotate-0" : "rotate-180"}
            ${iconSize ? `ml-2` : ""}
          `}
        >
          <ArrowUpIcon size={iconSize ? iconSize : 12} />
        </span>
      </button>
      <div
        className={`
          absolute right-0 top-11 z-10 bg-[#FFFFFF] rounded-[8px] border border-[#D9D9D9]
          flex flex-col w-screen max-w-[98vw] left-1/2 -translate-x-1/2
          mt-2 shadow-lg
          md:w-auto md:max-w-[700px] md:left-auto md:translate-x-0
          xl:min-w-[900px]
          transition-all duration-300 ease-in-out
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
        style={{ visibility: open ? "visible" : "hidden" }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col flex-1 border-b border-[#D9D9D9] md:border-b-0 md:border-r">
            <div className="flex justify-center items-center px-4 py-3 border-b border-[#D9D9D9]">
              <div className="flex items-center gap-3">
                <span className="text-[#262626] text-[14px] font-[600]">Date Range</span>
                <input
                  type="text"
                  value={
                    startDate && endDate && isSameDay(startDate, endDate)
                      ? startDateInput
                      : `${startDateInput} - ${endDateInput}`
                  }
                  onChange={(e) => {
                    const value = e.target.value
                    const parts = value.split(" - ")
                    if (parts.length === 2) {
                      handleInputChange(parts[0].trim(), "start")
                      handleInputChange(parts[1].trim(), "end")
                    } else {
                      handleInputChange(value, "start")
                      if (isSingleDateSelection) {
                        handleInputChange(value, "end")
                      }
                    }
                  }}
                  onBlur={() => {
                    handleInputBlur("start")
                    handleInputBlur("end")
                  }}
                  placeholder={
                    startDate && endDate && isSameDay(startDate, endDate) ? "MM/DD/YYYY" : "MM/DD/YYYY - MM/DD/YYYY"
                  }
                  className={`px-3 py-2 border rounded-md text-[14px] font-[500] w-64 ${
                    inputErrors.start || inputErrors.end ? "border-red-500" : "border-[#D9D9D9]"
                  }`}
                />
                {(inputErrors.start || inputErrors.end) && (
                  <span className="text-red-500 text-[12px]">Invalid date format</span>
                )}
              </div>
            </div>
            {/* Calendars: stack on mobile, row on tablet/desktop */}
            <div className="flex flex-col gap-4 px-2 pb-4 sm:flex-row sm:gap-6 sm:px-4 md-w-96 lg:gap-8">
              {/* Start calendar */}
              {renderCalendar(startMonth, startYear, "start")}
              {/* End calendar */}
              {renderCalendar(endMonth, endYear, "end")}
            </div>
          </div>
          {/* Quick select sidebar: below on mobile, side on tablet/desktop */}
          <div className="w-full p-2 flex md:flex-col flex-wrap gap-2 md:gap-2 sm:p-4 sm:flex-row md:w-48">
            {quickSelects?.map((opt) => (
              <button
                key={opt.label}
                className={`text-left px-1 py-1 rounded hover:bg-[#F2F2F2] text-[#262626] text-[12px] font-[600]`}
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

        {/* Action Buttons - Fixed at the bottom */}
        <div className="flex justify-end gap-3 p-4 border-t border-[#D9D9D9] mt-auto">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-[14px] font-[500] text-[#262626] border border-[#D9D9D9] rounded-md hover:bg-[#F2F2F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-[14px] font-[500] text-white bg-backgroundBlue rounded-md hover:bg-blue-600 transition-colors"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>    
  )
}

export default CustomDateRangePicker
