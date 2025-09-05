// Quick select options
export const quickSelects = [
  {
    label: "Today",
    getRange: () => {
      const today = new Date()

      return [today, today]
    },
  },
  {
    label: "Last 7 days",
    getRange: () => {
      const end = new Date()
      const start = new Date()

      start.setDate(end.getDate() - 6)

      return [start, end]
    },
  },
  {
    label: "Last 4 weeks",
    getRange: () => {
      const end = new Date()
      const start = new Date()

      start.setDate(end.getDate() - 28)

      return [start, end]
    },
  },
  {
    label: "Last 6 months",
    getRange: () => {
      const end = new Date()
      const start = new Date()

      start.setMonth(end.getMonth() - 6)

      return [start, end]
    },
  },
  {
    label: "Month to date",
    getRange: () => {
      const today = new Date()
      const start = new Date(today.getFullYear(), today.getMonth(), 1)

      return [start, today]
    },
  },
  {
    label: "Quarter to date",
    getRange: () => {
      const today = new Date()
      const quarter = Math.floor(today.getMonth() / 3)
      const start = new Date(today.getFullYear(), quarter * 3, 1)

      return [start, today]
    },
  },
  {
    label: "Year to date",
    getRange: () => {
      const today = new Date()
      const start = new Date(today.getFullYear(), 0, 1)

      return [start, today]
    },
  },
  {
    label: "All time",
    getRange: () => {
      const end = new Date()
      const start = new Date(2020, 0, 1)

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
