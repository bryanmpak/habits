import { useDate } from "@/app/lib/useDate"
import React, { useContext } from "react"
import { Context } from "../HabitsContext"

export default function DaySelector() {
  const { activeHabit, setActiveHabit } = useContext(Context)

  const handleOnClick = (i: number) => {
    setActiveHabit((prevHabit) => ({
      ...prevHabit,
      completions: prevHabit.completions.map((day, index) =>
        index === i ? { ...day, isIncluded: !day.isIncluded } : day
      ),
    }))
  }

  console.log({ activeHabit })

  return (
    <div className="flex mx-auto gap-1">
      {activeHabit.completions.map((date, i) => (
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
