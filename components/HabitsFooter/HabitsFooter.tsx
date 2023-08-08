"use client"

import { Habit } from "@/types/typings"
import { Dispatch, SetStateAction } from "react"
import Day from "./Day"

type Props = {
  activeHabit: Habit
  activeId: number
  setActiveId: Dispatch<SetStateAction<number>>
}

const HabitsFooter = ({ activeHabit, activeId, setActiveId }: Props) => {
  const handleClick = (id: number) => {
    setActiveId(id)
  }

  // set this up so that it maps across the whole thing but only shows this week's 7 days
  // with the ability to go back (overflow css)

  const recentCompletions = activeHabit.completions.slice(-7)

  return (
    <div className="flex px-4 justify-evenly items-center mx-auto mt-auto max-w-md">
      {recentCompletions.map((day, i) => {
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