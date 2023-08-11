import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(res: NextResponse) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized, please sign in.", { status: 401 })
    }
    const userId = session?.user.id
    // remember to remove id & userId since i don't think it's needed
    const data = await prisma.habit.findMany({
      where: { userId: userId },
    })

    return NextResponse.json(data)
  } catch (error) {
    return new Response("Could not fetch habits", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized, please sign in!", { status: 401 })
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
