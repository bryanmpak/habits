const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

export const getDate = (
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