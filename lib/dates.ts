const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const getDate = (
  i: number = 7
): {
  date: Date
  dayOfWeek: string
  isActive: boolean
}[] => {
  const now = new Date()
  const currentDay = now.getDay()
  const startOfWeek = new Date(
    now.setDate(now.getDate() - currentDay + (currentDay === 0 ? -6 : 1))
  )
  return Array(i)
    .fill(0)
    .map((_, i) => {
      const day = new Date(startOfWeek)
      day.setDate(day.getDate() + i)
      return {
        date: day,
        dayOfWeek: days[day.getDay()],
        isActive: day.getDay() === currentDay ? true : false,
      }
    })
}

const getDateRange = () => {
  let startDate = new Date()
  let endDate = new Date()

  startDate.setUTCHours(0, 0, 0, 0)
  startDate.setUTCDate(1) // Setting to the first day of the month

  endDate.setUTCHours(0, 0, 0, 0) // Resetting the time to start of the day in UTC
  endDate.setUTCMonth(endDate.getUTCMonth() + 1) // Move to the next month
  endDate.setUTCDate(0) // Get the last day of the previous (current) month

  while (startDate.getUTCDay() !== 1) {
    startDate.setUTCDate(startDate.getUTCDate() - 1)
  }
  while (endDate.getUTCDay() !== 0) {
    endDate.setUTCDate(endDate.getUTCDate() + 1) // Move forward until reaching Sunday
  }

  endDate.setUTCHours(23, 59, 59, 999) // Set the time to the end of the day in UTC

  return [startDate, endDate]
}

export { getDate, getDateRange }
