import HabitClient from "@/components/HabitClient";
import { getDate } from "@/lib/dates";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const dates = getDate(90);

  const startOfWeek = dates[0].date;
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setHours(0, 0, 0, 0);

  // Reset all isIncluded flags to false
  await prisma.habitCompletion.updateMany({
    where: { habit: { slug } },
    data: { isIncluded: false },
  });

  // Set isIncluded to true for the current week
  await prisma.habitCompletion.updateMany({
    where: {
      habit: { slug },
      date: {
        gte: startOfWeek,
        lt: endOfWeek,
      },
    },
    data: { isIncluded: true },
  });

  // Fetch the updated habit data
  const habitData = (await prisma.habit.findFirst({
    where: { slug },
    select: {
      id: true,
      habitName: true,
      slug: true,
      completions: {
        where: {
          date: {
            gte: startOfWeek,
            lt: endOfWeek,
          },
        },
        orderBy: {
          date: "asc",
        },
        select: {
          date: true,
          dayOfWeek: true,
          isActive: true,
          isComplete: true,
          isIncluded: true,
          habitId: true,
          id: true,
        },
      },
    },
  })) as Habit;

  console.log("habitData", habitData);

  return <HabitClient habitData={habitData} />;
};

export default page;
