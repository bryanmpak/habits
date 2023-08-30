import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(res: NextResponse) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json("Unauthorized, please sign in.", { status: 401 })
    }
    const userId = session?.user.id
    const data = await prisma.habit.findMany({
      where: { userId: userId },
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json("Could not fetch habits", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json("Unauthorized, please sign in.", { status: 401 })
    }
    const userId = session.user.id
    const body = await req.json()
    const { id }: { id: string } = body

    await prisma.habitCompletion.deleteMany({
      where: { habitId: id },
    })

    await prisma.habit.delete({
      where: { id: id },
    })

    return NextResponse.json("OK")
  } catch (error) {
    console.log(error)
  }
}
