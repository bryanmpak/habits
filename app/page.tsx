import { getAuthSession } from "../lib/auth"
import { getDate } from "../lib/dates"
import HabitClient from "../components/HabitClient"

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

  return (
    <main className="relative">
      <HabitClient habitData={defaultHabitData} />
    </main>
  )
}
