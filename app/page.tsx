import SignIn from "./components/SignIn"
import { getAuthSession } from "./lib/auth"
import { getDate } from "./lib/getDate"
import { prisma } from "./lib/prisma"
import { Habit } from "./types/typings"
import HabitClient from "./components/HabitClient"

export default async function Home() {
  const session = await getAuthSession()

  const dates = getDate()
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }))

  if (!session) {
    return <SignIn />
  }

  const defaultHabitData = {
    id: "",
    slug: "",
    habitName: "",
    completions: datesArr,
  }

  return (
    <main className="min-h-full relative">
      <HabitClient habitData={defaultHabitData} />
    </main>
  )
}
