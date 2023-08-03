import { HabitCompletion } from "@/app/types/typings"
import React, { Dispatch, SetStateAction, useContext } from "react"
import { Context } from "../HabitsContext"

type Props = {
  completions: HabitCompletion[]
  setCompletions: Dispatch<SetStateAction<HabitCompletion[]>>
}

export default function DaySelector({ completions, setCompletions }: Props) {
  const handleOnClick = (i: number) => {
    setCompletions((prevCompletions) =>
      prevCompletions.map((day, index) =>
        index === i ? { ...day, isIncluded: !day.isIncluded } : day
      )
    )
  }

  return (
    <div className="flex justify-evenly">
      {completions.map((date, i) => (
        <button
          type="button"
          onClick={() => handleOnClick(i)}
          key={i}
          className="flex flex-col justify-center items-center text-[8px] text-text"
        >
          <div
            className={`${
              date.isIncluded ? "bg-title" : "bg-nav_bg"
            } flex w-8 h-8 rounded-full border-2 border-neutral justify-center items-center`}
          >
            <p>{date.dayOfWeek}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
