interface HabitCompletion {
  date: Date
  dayOfWeek: string
  isActive: boolean
  isComplete: boolean
}

interface Habit {
  habitName: string
  completions: HabitCompletion[]
}
