import { getAuthSession } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { Habit } from "@/app/types/typings"
import { NextRequest, NextResponse } from "next/server"

export async function GET(res: NextResponse) {
  const session = await getAuthSession()
  const userId = session?.user.id

  // need to add a !session error "Please sign-in" or something

  // remember to remove id & userId since i don't think it's needed
  const data = await prisma.habit.findMany({
    where: { userId: userId },
  })

  return NextResponse.json(data)
}

export async function DELETE(res: NextResponse, req: NextRequest) {
  const session = await getAuthSession()
  const userId = session?.user.id

  const body = await req.json()
  console.log(body)

  // remove joined habits where userId & habitName (or id)
}
