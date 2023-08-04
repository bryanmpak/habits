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

<<<<<<< Updated upstream
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
=======
  // if first time user OR anonymous user:
  const defaultHabitData = {
    id: "",
    slug: "",
    habitName: "",
    completions: datesArr,
  }

  // if signed-in user w/ data, pass:
  // typescript: need to figure out how to deal with OR null scenarios, casting as a cheat for now
  const habitData =
    ((await prisma.habit.findFirst({
      where: { userId: userId },
      select: {
        id: true,
        habitName: true,
        slug: true,
        completions: {
          select: {
            date: true,
            dayOfWeek: true,
            isActive: true,
            isComplete: true,
            isIncluded: true,
            habitId: true,
          },
        },
      },
    })) as Habit) ?? defaultHabitData

  const habits = await prisma.habit.findMany({
    where: { userId: userId },
  })

  return (
    <main className="min-h-full relative">
      <HabitClient habitData={defaultHabitData} />
>>>>>>> Stashed changes
    </main>
  )
}
