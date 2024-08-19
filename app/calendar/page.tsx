import { redirect } from "next/navigation";
import Calendar from "@/components/Calendar";
import { getDateRange } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function CalendarPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const [startDate, endDate] = getDateRange();

  try {
    const linkedUser = await prisma.user.findUnique({
      where: { userId },
      select: { linkedUserId: true },
    });

    const userIds = [
      userId,
      ...(linkedUser?.linkedUserId ? [linkedUser.linkedUserId] : []),
    ];

    const [userInfo, habits] = await Promise.all([
      prisma.user.findMany({
        where: { userId: { in: userIds } },
        select: { userId: true, name: true, linkedUserId: true },
      }),
      prisma.habit.findMany({
        where: { userId: { in: userIds } },
        include: {
          completions: {
            where: {
              date: { gte: startDate, lte: endDate },
            },
            orderBy: { date: "asc" },
          },
        },
      }),
    ]);

    const formattedHabits = habits.map((habit) => ({
      id: habit.id,
      habitName: habit.habitName,
      userId: habit.userId,
      color: habit.color,
      completions: habit.completions.map((completion) => ({
        date: completion.date.toISOString(),
        isIncluded: completion.isIncluded,
        isComplete: completion.isComplete,
        dayOfWeek: completion.date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
      })),
    }));

    return (
      <div className="flex justify-center mt-6">
        <Calendar users={userInfo} habits={formattedHabits} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p>
          We're having trouble loading your calendar. Please try again later.
        </p>
      </div>
    );
  }
}
