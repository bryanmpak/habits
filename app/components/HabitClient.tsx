"use client"

import { useState } from "react"
import { getDate } from "../lib/getDate"
import { Habit } from "../types/typings"
import HabitButton from "./HabitButton/HabitButton"
import HabitsFooter from "./HabitsFooter/HabitsFooter"

type Props = {
  habitData: Habit
}

const HabitClient = ({ habitData }: Props) => {
  /* 
  determine if there's a user
    if no, then use context
    if yes, use the habitData
  
*/

  const activeWeek = getDate()
  const activeIndex = activeWeek.findIndex((day) => day.isActive)

  const [activeId, setActiveId] = useState(activeIndex)
  const [activeHabit, setActiveHabit] = useState(habitData)

  const handleComplete = (isComplete: boolean, id: number) => {
    if (isComplete) {
      setActiveHabit((prevHabit) => {
        const updatedHabit = {
          ...prevHabit,
          completions: prevHabit.completions.map((day, i) =>
            i === activeId ? { ...day, isComplete } : day
          ),
        }

        fetch(`/api/habits/${activeHabit.slug}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHabit),
        })

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
