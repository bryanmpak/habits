"use client"

import { useSession } from "next-auth/react"
import { createContext, Dispatch, SetStateAction, useState } from "react"
import { prisma } from "../lib/prisma"
import { Habit, HabitCompletion } from "../lib/typings"
import { useDate } from "../lib/useDate"

type HabitContextTypes = {
  habits: Habit[]
  setHabits: Dispatch<SetStateAction<Habit[]>>
  addHabit: (habitName: string, completions: HabitCompletion[]) => void
  activeHabit: Habit
  setActiveHabit: Dispatch<SetStateAction<Habit>>
  datesArr: HabitCompletion[]
}

type Props = {
  children: React.ReactNode
}

// uhh.. not sure about this...
const defaultHabitContext: HabitContextTypes = {
  habits: [],
  setHabits: () => {},
  addHabit: () => {},
  activeHabit: { habitName: "", completions: [] },
  setActiveHabit: () => {},
  datesArr: [],
}

const Context = createContext<HabitContextTypes>(defaultHabitContext)

const HabitsContext = ({ children }: Props) => {
  const { data: session } = useSession()
  const dates = useDate()
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }))

  const [habits, setHabits] = useState<Habit[]>([])
  const [activeHabit, setActiveHabit] = useState<Habit>({
    habitName: "",
    completions: [...datesArr],
  })

  const addHabit = (habitName: string, completions: HabitCompletion[]) => {
    const newHabit: Habit = {
      habitName,
      completions: completions,
    }
    setActiveHabit(newHabit)
    setHabits((prevHabits) => [...prevHabits, newHabit])
  }

  return (
    <Context.Provider
      value={{
        habits,
        setHabits,
        addHabit,
        activeHabit,
        setActiveHabit,
        datesArr,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, HabitsContext }

/*
const addHabit = async (
    habitName: string,
    completions: HabitCompletion[]
  ) => {
    if (session && session.user) {
      const userId = session.user.id
    }

    const newHabit: Habit = await prisma.habit.create({
      data: {
        habitName,
        completions: {
          create: completions.map((completion) => ({
            date: completion.date,
            dayOfWeek: completion.dayOfWeek,
            isActive: completion.isActive,
            isComplete: completion.isComplete,
            isIncluded: completion.isIncluded,
          })),
        },
        userId,
      },
      include: {
        completions: true, // Include the completions field in the returned data
      },
    })
    setActiveHabit(newHabit)
    setHabits((prevHabits) => [...prevHabits, newHabit])
  }
  */
