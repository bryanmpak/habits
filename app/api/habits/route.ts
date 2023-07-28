import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/app/lib/prisma"
import { getSession } from "next-auth/react"
import { Habit, HabitCompletion } from "@/app/types/typings"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  /*
  setting up the handler:
  a GET (retrieve all habits data) & POST (add to habits data)
  */

  if (!session || !session.user) {
    return res.status(401).json({ message: "Please log in!" })
  }

  const userId = session!.user.id as string

  switch (req.method) {
    case "GET":
      const habits = await prisma.habit.findMany({
        where: { userId: userId },
      })
      return res.status(200).json(habits)

    case "POST":
      const {
        habitName,
        completions,
      }: { habitName: string; completions: HabitCompletion[] } = req.body

      try {
        const newHabit: Habit = await prisma.habit.create({
          data: {
            habitName,
            completions: {
              create: completions.map((completion) => ({
                date: completion.date,
                dayOfWeek: completion.dayOfWeek,
                isActive: completion.isActive,
                isComplete: completion.isComplete,
                isIncluded: completion.isIncluded,
              })),
            },
            userId,
          },
          include: {
            completions: true, // Include the completions field in the returned data
          },
        })
        res.status(200).json(newHabit)
      } catch (error) {
        res.status(500).json({ error: "unable to create habit" })
      }

    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
