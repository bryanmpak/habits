import Calendar from "@/components/Calendar";
// import { getAuthSession } from "@/lib/auth"
import { getDateRange } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";

const page = async () => {
  const [startDate, endDate] = getDateRange();
  // const session = await getAuthSession()
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

  console.log("linkedUser", linkedUser);

  let userIds = [userId];
  if (!!linkedUser?.linkedUserId) {
    userIds.push(linkedUser.linkedUserId);
  }

  // if (session.user.linkedUserId) {
  //   userIds.push(session.user.linkedUserId)
  // }

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

  console.log(habits);

  return (
    // set up an overflow section on the calendar div
    <div className="flex justify-center mt-6">
      <Calendar users={userInfo} habits={habits} />
    </div>
  );
};

export default page;
