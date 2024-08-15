import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const { slug, habitName, completions, color }: Habit = body;

  const newHabit = await prisma.habit.create({
    data: {
      slug,
      habitName,
      color,
      userId: userId as string,
    },
  });

  const completionRecords = completions.map((completion) => ({
    date: new Date(completion.date),
    dayOfWeek: completion.dayOfWeek,
    isActive: completion.isActive,
    isComplete: completion.isComplete,
    isIncluded: completion.isIncluded,
    habitId: newHabit.id,
  }));

  await prisma.habitCompletion.createMany({
    data: completionRecords,
  });

  const response = new Response(JSON.stringify(newHabit), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/habits");

  return response;
}
