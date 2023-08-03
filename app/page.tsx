import SignIn from "./components/SignIn"
import { getAuthSession } from "./lib/auth"
import { getDate } from "./lib/getDate"
import { prisma } from "./lib/prisma"
import { Habit } from "./types/typings"
import HabitClient from "./components/HabitClient"

export default async function Home() {
  const session = await getAuthSession()
  const userId = session?.user.id

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

  /* 
  // if first time user OR anonymous user:
  const habitData = {
    habitName: "",
    id: "",
    slug: "",
    completions: datesArr,
  }
  */

  // if signed-in user w/ data, pass:

  // typescript: need to figure out how to deal with OR null scenarios, casting as a cheat for now
  const habitData =
    ((await prisma.habit.findFirst({
      where: { userId: userId },
      select: {
        id: true,
        habitName: true,
        slug: true,
        completions: {
          select: {
            date: true,
            dayOfWeek: true,
            isActive: true,
            isComplete: true,
            isIncluded: true,
            habitId: true,
          },
        },
      },
    })) as Habit) ?? defaultHabitData

  const habits = await prisma.habit.findMany({
    where: { userId: userId },
  })

  return (
    <main className="min-h-full relative">
      <HabitClient habitData={habitData} />
    </main>
  )
}
