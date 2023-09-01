import HabitClient from "@/components/HabitClient"
import { getDate } from "@/lib/dates"
import { prisma } from "@/lib/prisma"

type PageProps = {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params

  // do the habitdata dates check here (is datesArr[0] in habitsData.completions) if not, update DB to include (?)
  const dates = getDate(90)
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }))
  const startOfWeek = dates[0].date
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)
  endOfWeek.setHours(0, 0, 0, 0)

  const habitData = (await prisma.habit.findFirst({
    where: { slug: slug },
    select: {
      id: true,
      habitName: true,
      slug: true,
      completions: {
        where: {
          date: {
            gte: startOfWeek,
            lt: endOfWeek,
          },
        },
        orderBy: {
          date: "asc",
        },
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
  })) as Habit

  // console.log(habitData)

  return <HabitClient habitData={habitData} />
}

export default page
