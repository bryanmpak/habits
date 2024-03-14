"use client"

// import { useSession } from "next-auth/react"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { getDate } from "../lib/dates"
import { useUser } from "@clerk/nextjs"

type HabitContextTypes = {
  habitList: HabitName[]
  setHabitList: Dispatch<SetStateAction<HabitName[]>>
  addHabit: (
    habitName: string,
    completions: HabitCompletion[],
    slug: string,
    habitColor: string
  ) => Promise<Habit>
  selectedHabit: string
  setSelectedHabit: Dispatch<SetStateAction<string>>
  datesArr: HabitCompletion[]
}

type Props = {
  children: React.ReactNode
}

const defaultHabitContext: HabitContextTypes = {
  habitList: [],
  setHabitList: () => {},
  addHabit: async () => ({
    slug: "",
    habitName: "",
    completions: [],
    color: "",
  }),
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
  // const { data: session } = useSession()
  const { user } = useUser()

  const [habitList, setHabitList] = useState<HabitName[]>([])

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchData = async () => {
      //
      const response = await fetch("/api/habitsList")
      const habitsList: Habit[] = await response.json()
      setHabitList(habitsList)
    }

    fetchData()
    // *** not sure if i need this session here as a dependency
  }, [user])

  const [selectedHabit, setSelectedHabit] = useState("")

  const addHabit = async (
    habitName: string,
    completions: HabitCompletion[],
    slug: string,
    color: string
  ): Promise<Habit> => {
    const response = await fetch("/api/addHabit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, habitName, completions, color }),
    })

    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`)
    } else {
      const newHabit: Habit = await response.json()
      // *** might to think about if i need to refactor the Habit type to include userId
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
