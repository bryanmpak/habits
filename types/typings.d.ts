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
  color: string
}

interface HabitName {
  color?: string
  habitName: string
  id?: string
  slug: string
}
