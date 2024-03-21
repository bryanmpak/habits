import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

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

  // TODO: check if this helps
  revalidatePath("/habits")

  return response
}
