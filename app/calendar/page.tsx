import Calendar from "@/components/Calendar"
import { getAuthSession } from "@/lib/auth"
import { getDateRange } from "@/lib/dates"
import { prisma } from "@/lib/prisma"
import { toast } from "@/lib/useToast"

const page = async () => {
  const [startDate, endDate] = getDateRange()
  const session = await getAuthSession()

  if (!session) {
    toast({
      title: "sign in to see this feature",
      description: "only signed-in users can save and view habits",
    })
    return
  }

  const userId = session.user.id
  let userIds = [userId]
  if (session.user.linkedUserId) {
    userIds.push(session.user.linkedUserId)
  }

  const userInfo = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
    },
  })

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
  })

  return (
    // set up an overflow section on the calendar div
    <div className='flex justify-center mt-6'>
      <Calendar users={userInfo} habits={habits} />
    </div>
  )
}

export default page
