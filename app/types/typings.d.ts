interface HabitCompletion {
  date: Date
  dayOfWeek: string
  isActive: boolean
  isComplete: boolean
  isIncluded: boolean
}

interface Habit {
  habitName: string
  completions: HabitCompletion[]
}

import { Session } from "next-auth"

interface UserWithId extends Session["user"] {
  id: string
}

interface ExtendedSession extends Session {
  user: UserWithId
}
