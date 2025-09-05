// Quick select options
export const quickSelects = [
  {
    label: "Today",
    getRange: () => {
      const today = new Date()
      const tomorrow = new Date(today)

      tomorrow.setDate(today.getDate() + 1)

      return [today, tomorrow]
    },
  },
  {
    label: "This Week",
    getRange: () => {
      const today = new Date()
      const start = new Date(today)

      start.setDate(today.getDate() - today.getDay())
      const end = new Date(start)

      end.setDate(start.getDate() + 6)

      return [start, end]
    },
  },
  {
    label: "This Month",
    getRange: () => {
      const today = new Date()
      const start = new Date(today.getFullYear(), today.getMonth(), 1)
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)

      return [start, end]
    },
  },
  {
    label: "Last 30 days",
    getRange: () => {
      const end = new Date()
      const start = new Date()

      start.setDate(end.getDate() - 29)

      return [start, end]
    },
  },
  {
    label: "This Quarter",
    getRange: () => {
      const today = new Date()
      const fourMonthQuarter = Math.floor(today.getMonth() / 4)
      const start = new Date(today.getFullYear(), fourMonthQuarter * 4, 1)
      const end = new Date(today.getFullYear(), fourMonthQuarter * 4 + 4, 0)

      return [start, end]
    },
  },
]

// Month names
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Year range for dropdowns
export const yearRange = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

// Weekday names
export const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
export const weekdaysUpper = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
