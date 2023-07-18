"use client"

import { useDate } from "@/app/lib/useDate"
import { useState } from "react"
import Day from "./Day"

const HabitsFooter = () => {
  const datesArr = useDate()
  const [activeId, setActiveId] = useState(
    datesArr.findIndex((day) => day.isActive)
  )

  return (
    <div className="flex px-4 justify-evenly items-center mx-auto mt-auto max-w-md">
      {datesArr.map((day, i) => {
        return (
          <Day
            id={i}
            key={i}
            dayOfWeek={day.dayOfWeek}
            dateOfWeek={day.date.getDate()}
            isActive={i === activeId}
            onClick={setActiveId}
          />
        )
      })}
    </div>
  )
}

export default HabitsFooter
