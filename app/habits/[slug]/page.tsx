import HabitClient from "@/app/components/HabitClient"
import { prisma } from "@/app/lib/prisma"
import { Habit } from "@/app/types/typings"

type PageProps = {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params
  console.log(slug)

  const habitData = (await prisma.habit.findFirst({
    where: { slug: slug },
    select: {
      id: true,
      habitName: true,
      slug: true,
      completions: {
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

  return (
    <main className="min-h-full relative">
      <HabitClient habitData={habitData} />
    </main>
  )
}

export default page
