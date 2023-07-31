"use client"

import { Habit } from "@/app/types/typings"
import { Dispatch, SetStateAction, useState } from "react"
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
