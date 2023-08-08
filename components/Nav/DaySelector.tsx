import { HabitCompletion } from "@/types/typings"
import React, { Dispatch, SetStateAction } from "react"

type Props = {
  completions: HabitCompletion[]
  setCompletions: Dispatch<SetStateAction<HabitCompletion[]>>
}

export default function DaySelector({ completions, setCompletions }: Props) {
  const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const handleOnClick = (clickedDayIndex: number) => {
    const clickedDay = completions[clickedDayIndex]
    setCompletions((prevCompletions) =>
      prevCompletions.map((day) =>
        day.dayOfWeek === clickedDay.dayOfWeek
          ? { ...day, isIncluded: !day.isIncluded }
          : day
      )
    )
  }

  return (
    <div className="flex justify-evenly">
      {DAYS_OF_WEEK.map((dayOfWeek, i) => (
        <button
          type="button"
          onClick={() => handleOnClick(i)}
          key={i}
          className="flex flex-col justify-center items-center text-[8px] text-text"
        >
          <div
            className={`${
              completions[i]?.isIncluded ? "bg-title" : "bg-nav_bg"
            } flex w-8 h-8 rounded-full border-2 border-neutral justify-center items-center`}
          >
            <p>{dayOfWeek}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
