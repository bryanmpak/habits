import { prisma } from "@/app/lib/prisma"
import { Habit } from "@/app/types/typings"
import { getAuthSession } from "@/app/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    const userId = session.user.id

    const body = await req.json()
    const { slug, habitName, completions }: Habit = body

    const newHabit = await prisma.habit.create({
      data: {
        slug,
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
