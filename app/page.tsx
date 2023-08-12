import { getAuthSession } from "../lib/auth"
import { getDate } from "../lib/getDate"
import HabitClient from "../components/HabitClient"

export default async function Home() {
  const session = await getAuthSession()

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
