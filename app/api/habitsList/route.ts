import { getAuthSession } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { Habit } from "@/app/types/typings"
import { NextResponse } from "next/server"

export async function GET(res: NextResponse) {
  const session = await getAuthSession()
  const userId = session?.user.id

  // remember to remove id & userId since i don't think it's needed
  const data = await prisma.habit.findMany({
    where: { userId: userId },
  })

  return NextResponse.json(data)
}
