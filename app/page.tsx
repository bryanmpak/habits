"use client"

import { useContext, useState } from "react"
import HabitButton from "./components/HabitButton/HabitButton"
import HabitMenubar from "./components/Menubar/HabitMenubar"
import HabitsFooter from "./components/HabitsFooter/HabitsFooter"
import Menu from "./components/Nav/Menu"
import { Context } from "./components/HabitsContext"

export default function Home() {
  const { habits, setHabits, activeHabit, setActiveHabit } = useContext(Context)

  /* 
    active habit:
      {
        habitName: blah,
        completions: [
          {
            date: 7-23-23,
            dayofweek: MON,
            isComplete: false,
            isActive: false
          },
          {
            date: 7-23-23,
            dayofweek: MON,
            isComplete: false,
            isActive: false
          },
        ]
    }
    */
  const [activeId, setActiveId] = useState(
    activeHabit.completions.findIndex((day) => day.isActive)
  )

  const handleComplete = (isComplete: boolean, id: number) => {
    if (isComplete) {
      setActiveHabit((prevHabit) => ({
        ...prevHabit,
        completions: prevHabit.completions.map((day, i) =>
          i === activeId ? { ...day, isComplete } : day
        ),
      }))
    }
  }

  return (
    <main className="min-h-full">
      <Menu />
      <HabitMenubar />
      <HabitButton
        activeHabit={activeHabit}
        activeId={activeId}
        onComplete={(isComplete) => handleComplete(isComplete, activeId)}
      />
      <HabitsFooter activeHabit={activeHabit} onDayClick={setActiveId} />
    </main>
  )
}
