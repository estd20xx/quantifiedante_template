export const stringIntoBoolen = (str: string = "false") => {
  return str.toLowerCase() === "true"
}

// Helper to get days in a month
export function getDaysInMonth(month: number, year: number): number[] {
  const numDays = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: numDays }, (_, i) => i + 1)
}

// Helper to get day of week for 1st of month (0=Sun)
export function getFirstDayOfWeek(month: number, year: number): number {
  return new Date(year, month, 1).getDay()
}

// Helper to check if two dates are the same day
export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// Helper to check if a date is in range
export function isInRange(day: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false

  return day > start && day < end
}

// Helper to format date as 'MMM dd, yyyy'
export function formatDisplayDate(date: Date | null): string {
  if (!date) return ""

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

// Helper to format date as 'MM-DD-YYYY' for payload
export function formatPayloadDate(date: Date | null): string | null {
  if (!date) return null
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const yyyy = date.getFullYear()

  return `${mm}/${dd}/${yyyy}`
}

// Helper to get the weekday of the first day of the month (0=Sunday)
export function getStartDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

// Helper to get days in a month
export function getDayInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
