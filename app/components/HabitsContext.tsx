"use client"

import { useSession } from "next-auth/react"
import { createContext, Dispatch, SetStateAction, useState } from "react"
import { prisma } from "../lib/prisma"
import { Habit, HabitCompletion } from "../types/typings"
import { useDate } from "../lib/useDate"

type HabitContextTypes = {
  habits: Habit[]
  setHabits: Dispatch<SetStateAction<Habit[]>>
  addHabit: (
    habitName: string,
    completions: HabitCompletion[]
  ) => Promise<Habit>
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
  addHabit: async () => ({ habitName: "", completions: [] }),
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

  const addHabit = async (
    habitName: string,
    completions: HabitCompletion[]
  ): Promise<Habit> => {
    console.log(habitName, completions)
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitName, completions }),
    })

    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`)
    } else {
      const newHabit: Habit = await response.json()
      // might to think about if i need to refactor the Habit type to include userId
      return newHabit
    }
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
