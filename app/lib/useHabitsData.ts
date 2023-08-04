import { useState, useEffect } from "react"
import { PartialHabit } from "../types/typings"

export const useHabitsData = () => {
  const [habitList, setHabitList] = useState<PartialHabit[]>([])

  useEffect(() => {
    const defaultHabit = {
      habitName: "",
      slug: "",
      id: "",
      userId: "",
    }

    const fetchData = async () => {
      const response = await fetch("/api/habitsList")
      const habitsList: PartialHabit[] = await response.json()
      setHabitList(habitsList || [defaultHabit])
    }

    fetchData()
  }, [])

  return habitList
}
