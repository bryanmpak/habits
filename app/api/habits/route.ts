import { prisma } from "@/app/lib/prisma"
import { Habit, HabitCompletion } from "@/app/types/typings"
import { getAuthSession } from "@/app/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    const userId = session.user.id
    // console.log(userId)

    const body = await req.json()

    const {
      habitName,
      completions,
    }: { habitName: string; completions: HabitCompletion[] } = body

    // console.log(habitName)

    const newHabit = await prisma.habit.create({
      data: {
        habitName,
        completions: {
          create: completions.map((completion) => ({
            date: completion.date,
            dayOfWeek: completion.dayOfWeek,
            isActive: completion.isActive,
            isComplete: completion.isComplete,
            isIncluded: completion.isIncluded,
          })),
        },
        userId: userId as string,
      },
      include: {
        completions: true,
      },
    })

    return NextResponse.json({ habitName, completions })
  } catch (error) {
    console.log(error)
  }
}
