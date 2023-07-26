import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/app/lib/prisma"

export default async function handle(
  res: NextApiResponse,
  req: NextApiRequest
) {
  if (req.method === "GET") {
    const habits = await prisma.habit.findMany()
    res.json(habits)
  }
}

/*
export default async function handle(req, res) {
  if (req.method === "GET") {
    const habits = await prisma.habit.findMany()
    res.json(habits)
  } else if (req.method === "POST") {
    const { habitName, completions } = req.body
    const newHabit = await prisma.habit.create({
      data: {
        habitName,
        completions,
      },
    })
    res.json(newHabit)
  }
}
*/
