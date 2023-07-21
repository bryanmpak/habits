import { useState } from "react"
import Day from "./Day"

const HabitsFooter = ({
  activeHabit,
  onDayClick,
}: {
  activeHabit: Habit
  onDayClick: (id: number) => void
}) => {
  const [activeId, setActiveId] = useState(
    activeHabit.completions.findIndex((day) => day.isActive)
  )

  const handleClick = (id: number) => {
    setActiveId(id)
    onDayClick(id)
  }

  return (
    <div className="flex px-4 justify-evenly items-center mx-auto mt-auto max-w-md">
      {activeHabit.completions.map((day, i) => {
        return (
          <Day
            id={i}
            key={`${i}-${day.isComplete}`}
            dayOfWeek={day.dayOfWeek}
            dateOfWeek={day.date.getDate()}
            isActive={i === activeId}
            isComplete={day.isComplete}
            isIncluded={day.isIncluded}
            onClick={() => handleClick(i)}
          />
        )
      })}
    </div>
  )
}

export default HabitsFooter
