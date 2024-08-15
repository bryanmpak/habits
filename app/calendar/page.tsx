import Calendar from "@/components/Calendar";
// import { getAuthSession } from "@/lib/auth"
import { getDateRange } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";

const page = async () => {
  const [startDate, endDate] = getDateRange();
  const { userId } = auth();

  if (!userId) {
    toast("sign in to see this feature", {
      description: "only signed-in users can save and view habits",
    });
    return;
  }

  const linkedUser = await prisma.user.findFirst({
    where: {
      userId,
    },
    select: {
      linkedUserId: true,
    },
  });

  let userIds = [userId];
  if (!!linkedUser?.linkedUserId) {
    userIds.push(linkedUser.linkedUserId);
  }

  const userInfo = await prisma.user.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    select: {
      userId: true,
      name: true,
      linkedUserId: true,
    },
  });

  const habits = await prisma.habit.findMany({
    where: { userId: { in: userIds } },
    include: {
      completions: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          date: "asc",
        },
      },
    },
  });

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
};

export default page;
