"use client"

import { useContext, useState } from "react"
import HabitButton from "./components/HabitButton/HabitButton"
import HabitMenubar from "./components/Menubar/HabitMenubar"
import HabitsFooter from "./components/HabitsFooter/HabitsFooter"
import Menu from "./components/Nav/Menu"
import { Context } from "./components/HabitsContext"
import SignIn from "./components/SignIn"
import { useSession } from "next-auth/react"
import { ExtendedSession } from "./lib/typings"

export default function Home() {
  const { data: session, status } = useSession()
  const { setHabits, activeHabit, setActiveHabit } = useContext(Context)
  const [activeId, setActiveId] = useState(
    activeHabit.completions.findIndex((day) => day.isActive)
  )

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
  if (!session) {
    return <SignIn />
  }

  return (
    <main className="min-h-full relative">
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
