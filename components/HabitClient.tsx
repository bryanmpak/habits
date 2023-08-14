"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { getDate } from "../lib/dates"
import { Habit } from "../types/typings"
import HabitButton from "./HabitButton/HabitButton"
import HabitsFooter from "./HabitsFooter/HabitsFooter"

type Props = {
  habitData: Habit
}

const HabitClient = ({ habitData }: Props) => {
  const activeWeek = getDate()
  const activeIndex = activeWeek.findIndex((day) => day.isActive)

  const [activeId, setActiveId] = useState(activeIndex)
  const [activeHabit, setActiveHabit] = useState(habitData)
  const { data: session } = useSession()

  const handleComplete = (isComplete: boolean, id: number) => {
    if (isComplete) {
      setActiveHabit((prevHabit) => {
        const updatedHabit = {
          ...prevHabit,
          completions: prevHabit.completions.map((day, i) =>
            i === activeId ? { ...day, isComplete } : day
          ),
        }
        if (session?.user) {
          fetch(`/api/habits/${activeHabit.slug}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedHabit),
          })
        }

        return updatedHabit
      })
    }
  }

  return (
    <>
      <HabitButton
        activeHabit={activeHabit}
        activeId={activeId}
        onComplete={(isComplete) => handleComplete(isComplete, activeId)}
      />
      <HabitsFooter
        activeHabit={activeHabit}
        activeId={activeId}
        setActiveId={setActiveId}
      />
    </>
  )
}

export default HabitClient
