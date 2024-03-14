"use client"

// import { useSession } from "next-auth/react"
import { useState } from "react"
import { getDate } from "../lib/dates"
import HabitButton from "./HabitButton/HabitButton"
import HabitsFooter from "./HabitsFooter/HabitsFooter"
import { useUser } from "@clerk/nextjs"

type Props = {
  habitData: Habit
}

const HabitClient = ({ habitData }: Props) => {
  const activeWeek = getDate()
  const activeIndex = activeWeek.findIndex((day) => day.isActive)

  const [activeId, setActiveId] = useState(activeIndex)
  const [activeHabit, setActiveHabit] = useState(habitData)
  // const { data: session } = useSession()
  const { user } = useUser()

  const handleComplete = (isComplete: boolean, id: number) => {
    // need to split id & activeId since anon users won't be logged to DBs
    if (isComplete) {
      let activeCompletion = { ...activeHabit.completions[id] }
      activeCompletion.isComplete = true

      // console.log("activeCompletion before sending:", activeCompletion)

      setActiveHabit((prevHabit) => {
        const updatedHabit = {
          ...prevHabit,
          completions: prevHabit.completions.map((day, i) =>
            i === activeId ? { ...day, isComplete } : day
          ),
        }

        if (user) {
          const requestBody = JSON.stringify(activeCompletion)
          // console.log("Stringified request body:", requestBody)

          fetch(`/api/habits/${activeHabit.slug}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: requestBody,
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
