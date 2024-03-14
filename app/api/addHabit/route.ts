import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
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
      userId: userId as string,
    },
  })

  // Then bulk insert HabitCompletion records
  const completionRecords = completions.map((completion) => ({
    date: completion.date,
    dayOfWeek: completion.dayOfWeek,
    isActive: completion.isActive,
    isComplete: completion.isComplete,
    isIncluded: completion.isIncluded,
    habitId: newHabit.id,
  }))

  await prisma.habitCompletion.createMany({
    data: completionRecords,
  })

  const response = new Response(JSON.stringify(newHabit), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })

  return response
}
