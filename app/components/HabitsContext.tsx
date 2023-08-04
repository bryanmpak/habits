"use client"
<<<<<<< Updated upstream

import { createContext, Dispatch, SetStateAction, useState } from "react"
import { useDate } from "../lib/useDate"

type HabitContextTypes = {
  habits: Habit[]
  setHabits: Dispatch<SetStateAction<Habit[]>>
<<<<<<< HEAD
  addHabit: (habitName: string, completions: HabitCompletion[]) => void
=======
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { Habit, HabitCompletion, PartialHabit } from "../types/typings"
import { getDate } from "../lib/getDate"
import { useHabitsData } from "../lib/useHabitsData"

type HabitContextTypes = {
  habitsList: PartialHabit[]
  setHabitsList: Dispatch<SetStateAction<PartialHabit[]>>
  addHabit: (
    habitName: string,
    completions: HabitCompletion[],
    slug: string
  ) => Promise<Habit>
>>>>>>> Stashed changes
=======
  addHabit: (habitName: string) => void
>>>>>>> parent of 2d5a5ac (working mvp)
  activeHabit: Habit
  setActiveHabit: Dispatch<SetStateAction<Habit>>
  datesArr: HabitCompletion[]
}

type Props = {
  children: React.ReactNode
}

// uhh.. not sure about this...
const defaultHabitContext: HabitContextTypes = {
<<<<<<< Updated upstream
  habits: [],
  setHabits: () => {},
  addHabit: () => {},
  activeHabit: { habitName: "", completions: [] },
=======
  habitsList: [],
  setHabitsList: () => {},
  addHabit: async () => ({ slug: "", habitName: "", completions: [] }),
  activeHabit: { slug: "", habitName: "", completions: [] },
>>>>>>> Stashed changes
  setActiveHabit: () => {},
  datesArr: [],
}

const Context = createContext<HabitContextTypes>(defaultHabitContext)

const HabitsContext = ({ children }: Props) => {
<<<<<<< Updated upstream
  const dates = useDate()
=======
  const dates = getDate()
>>>>>>> Stashed changes
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }))
  const [habitsList, setHabitsList] = useState<PartialHabit[]>([])

  useEffect(() => {
    const defaultHabit = {
      habitName: "",
      slug: "",
      id: "",
      userId: "",
    }

    const fetchData = async () => {
      const response = await fetch("/api/habitsList")
      const habitsList: PartialHabit[] = await response.json()
      setHabitsList(habitsList || [defaultHabit])
    }

    fetchData()
  }, [])

  const [activeHabit, setActiveHabit] = useState<Habit>({
    habitName: "",
    completions: [...datesArr],
  })

<<<<<<< HEAD
<<<<<<< Updated upstream
  const addHabit = (habitName: string, completions: HabitCompletion[]) => {
    const newHabit: Habit = {
      habitName,
      completions: completions,
=======
  const addHabit = async (
    habitName: string,
    completions: HabitCompletion[],
    slug: string
  ): Promise<Habit> => {
    const response = await fetch("/api/addHabit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, habitName, completions }),
    })

    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`)
    } else {
      const newHabit: Habit = await response.json()
      // might to think about if i need to refactor the Habit type to include userId
      return newHabit
>>>>>>> Stashed changes
=======
  const addHabit = (habitName: string) => {
    const newHabit: Habit = {
      habitName,
      completions: datesArr,
>>>>>>> parent of 2d5a5ac (working mvp)
    }
    setActiveHabit(newHabit)
    setHabits((prevHabits) => [...prevHabits, newHabit])
  }

  return (
    <Context.Provider
      value={{
        habitsList,
        setHabitsList,
        addHabit,
        activeHabit, //not used
        setActiveHabit, //not used
        datesArr,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, HabitsContext }
