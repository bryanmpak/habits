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
  slug: string
}

interface HabitName {
  habitName: string
  id?: string
  slug: string
}

import { Session } from "next-auth"

interface UserWithId extends Session["user"] {
  id: string
}

interface ExtendedSession extends Session {
  user: UserWithId
}
