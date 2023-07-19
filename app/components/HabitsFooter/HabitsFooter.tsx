import { useState } from "react"
import Day from "./Day"

const HabitsFooter = ({
  habits,
  onDayClick,
}: {
  habits: Habit[]
  onDayClick: (id: number) => void
}) => {
  const [activeId, setActiveId] = useState(
    habits.findIndex((day) => day.isActive)
  )

  const handleClick = (id: number) => {
    setActiveId(id)
    onDayClick(id)
  }

  return (
    <div className="flex px-4 justify-evenly items-center mx-auto mt-auto max-w-md">
      {habits.map((habit, i) => {
        return (
          <Day
            id={i}
            key={`${i}-${habits[i].isComplete}`}
            dayOfWeek={habit.dayOfWeek}
            dateOfWeek={habit.date.getDate()}
            isActive={i === activeId}
            isComplete={habit.isComplete}
            onClick={() => handleClick(i)}
          />
        )
      })}
    </div>
  )
}

export default HabitsFooter
