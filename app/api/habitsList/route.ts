// import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized, please sign in.", { status: 401 });
    }

    const data = await prisma.habit.findMany({
      where: { userId: userId },
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch habits", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized, please sign in!", { status: 401 });
    }
    const body = await req.json();
    const { id }: { id: string } = body;

    await prisma.habitCompletion.deleteMany({
      where: { habitId: id },
    });

    await prisma.habit.delete({
      where: { id: id },
    });

    return NextResponse.json("OK");
  } catch (error) {
    console.log(error);
  }
}
