import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const name = params.slug
  const body: HabitCompletion = await req.json()

  try {
    await prisma.habitCompletion.update({
      where: {
        id: body.id,
      },
      data: {
        date: body.date,
        dayOfWeek: body.dayOfWeek,
        isActive: body.isActive,
        isComplete: body.isComplete,
        isIncluded: body.isIncluded,
        habitId: body.habitId,
      },
    })
  } catch (error) {
    console.error(error)
  }

  return NextResponse.json({
    message: `This is the name of the habit: ${name}`,
  })
}
