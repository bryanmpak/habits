"use client"

import { useState } from "react"
import HabitButton from "./components/HabitButton/HabitButton"
import HabitMenubar from "./components/HabitMenubar"
import HabitsFooter from "./components/HabitsFooter/HabitsFooter"
import Menu from "./components/Menu/Menu"
import { useDate } from "./lib/useDate"

export default function Home() {
  const datesArr = useDate()
  // eventually put this in a firestore db
  const [habits, setHabits] = useState(
    datesArr.map((date) => {
      return {
        isComplete: false,
        ...date,
      }
    })
  )
  const [activeId, setActiveId] = useState(
    habits.findIndex((day) => day.isActive)
  )

  const handleComplete = (isComplete: boolean, id: number) => {
    if (isComplete) {
      setHabits((prevHabits) =>
        prevHabits.map((habit, i) =>
          i === activeId ? { ...habit, isComplete } : habit
        )
      )
    }
  }

  return (
    <main className="min-h-full">
      <Menu />
      <HabitMenubar />
      <HabitButton
        habit={habits[activeId]}
        onComplete={(isComplete) => handleComplete(isComplete, activeId)}
      />
      <HabitsFooter habits={habits} onDayClick={setActiveId} />
    </main>
  )
}
