interface HabitCompletion {
  date: Date
  dayOfWeek: string
  isActive: boolean
  isComplete: boolean
  isIncluded: boolean
  habitId?: string
}

interface Habit {
  habitName: string
  completions: HabitCompletion[]
  id?: string
  userId?: string
  slug: string
}

type PartialHabit = Pick<Habit, "habitName" | "slug">

import { Session } from "next-auth"

interface UserWithId extends Session["user"] {
  id: string
}

interface ExtendedSession extends Session {
  user: UserWithId
}
