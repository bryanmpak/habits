"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { Habit, HabitCompletion, HabitName } from "../types/typings"
import { getDate } from "../lib/getDate"

type HabitContextTypes = {
  habitList: HabitName[]
  setHabitList: Dispatch<SetStateAction<HabitName[]>>
  addHabit: (
    habitName: string,
    completions: HabitCompletion[],
    slug: string
  ) => Promise<Habit>
  selectedHabit: string
  setSelectedHabit: Dispatch<SetStateAction<string>>
  datesArr: HabitCompletion[]
}

type Props = {
  children: React.ReactNode
}

// uhh.. not sure about this...
const defaultHabitContext: HabitContextTypes = {
  habitList: [],
  setHabitList: () => {},
  addHabit: async () => ({ slug: "", habitName: "", completions: [] }),
  selectedHabit: "",
  setSelectedHabit: () => {},
  datesArr: [],
}

const Context = createContext<HabitContextTypes>(defaultHabitContext)

const HabitsContext = ({ children }: Props) => {
  const dates = getDate(90)
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }))

  const [habitList, setHabitList] = useState<HabitName[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/habitsList")
      const habitsList: Habit[] = await response.json()
      setHabitList(habitsList)
    }

    fetchData()
    // console.log("habitlist refetched")
  }, [])

  const [selectedHabit, setSelectedHabit] = useState("")

  const addHabit = async (
    habitName: string,
    completions: HabitCompletion[],
    slug: string
  ): Promise<Habit> => {
    // console.log(habitName, completions)
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
    }
  }

  return (
    <Context.Provider
      value={{
        habitList,
        setHabitList,
        addHabit,
        selectedHabit,
        setSelectedHabit,
        datesArr,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, HabitsContext }
