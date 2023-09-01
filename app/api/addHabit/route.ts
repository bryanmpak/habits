import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    const userId = session.user.id

    const body = await req.json()
    const { slug, habitName, completions, color }: Habit = body

    const newHabit = await prisma.habit.create({
      data: {
        slug,
        habitName,
        color,
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

    return new Response(JSON.stringify(newHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
