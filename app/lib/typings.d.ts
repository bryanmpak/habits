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
