import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const name = params.slug
  const body = await req.json()
  const { id, completions }: { id: string; completions: HabitCompletion[] } =
    body
  // this is pretty sloppy, i need to refactor to make all database connections cleaner
  try {
    for (let completion of completions) {
      await prisma.habitCompletion.updateMany({
        where: {
          habitId: id,
          date: completion.date,
        },
        data: {
          date: completion.date,
          dayOfWeek: completion.dayOfWeek,
          isActive: completion.isActive,
          isComplete: completion.isComplete,
          isIncluded: completion.isIncluded,
        },
      })
    }
  } catch (error) {
    console.error(error)
  }

  return NextResponse.json({
    message: `This is the name of the habit: ${name}`,
  })
}
