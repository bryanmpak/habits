import { useState, useEffect } from "react"

interface Habit {
  id: string
  habitName: string
  userId: string
  slug: string
}

export const useHabitsData = () => {
  const [habitList, setHabitList] = useState<Habit[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/habitsList")
      const habitsList: Habit[] = await response.json()
      setHabitList(habitsList)
    }

    fetchData()
  }, [])

  return habitList
}
