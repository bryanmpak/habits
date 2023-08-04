"use client"

import { useContext, useState } from "react"
import HabitButton from "./components/HabitButton/HabitButton"
import HabitMenubar from "./components/Menubar/HabitMenubar"
import HabitsFooter from "./components/HabitsFooter/HabitsFooter"
import Menu from "./components/Nav/Menu"
import { Context } from "./components/HabitsContext"

export default function Home() {
  const { setHabits, activeHabit, setActiveHabit } = useContext(Context)
  const [activeId, setActiveId] = useState(
    activeHabit.completions.findIndex((day) => day.isActive)
  )

  console.log({ activeHabit })

  const handleComplete = (isComplete: boolean, id: number) => {
    if (isComplete) {
      setActiveHabit((prevHabit) => {
        const updatedHabit = {
          ...prevHabit,
          completions: prevHabit.completions.map((day, i) =>
            i === activeId ? { ...day, isComplete } : day
          ),
        }

        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.habitName === updatedHabit.habitName ? updatedHabit : habit
          )
        )

        return updatedHabit
      })
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
