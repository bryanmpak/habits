"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"
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
