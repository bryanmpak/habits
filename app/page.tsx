import { getDate } from "../lib/dates"
import HabitClient from "../components/HabitClient"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs"

export default async function Home() {
  const dates = getDate()
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }))

  const defaultHabitData = {
    id: "",
    slug: "",
    habitName: "",
    color: "",
    completions: datesArr,
  }

  return <HabitClient habitData={defaultHabitData} />
}
