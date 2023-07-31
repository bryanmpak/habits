"use client"

import { useState } from "react"
import { Habit } from "../types/typings"
import HabitButton from "./HabitButton/HabitButton"
import HabitsFooter from "./HabitsFooter/HabitsFooter"

type Props = {
  activeHabit: Habit
  activeIndex: number
}

const HabitComponent = ({ activeHabit, activeIndex }: Props) => {
  const [activeId, setActiveId] = useState(activeIndex)

  return (
    <>
      {/* <HabitButton
        activeHabit={activeHabit}
        activeId={activeId}
        onComplete={(isComplete) => handleComplete(isComplete, activeId)}
      /> */}
      <HabitsFooter
        activeHabit={activeHabit}
        activeId={activeId}
        setActiveId={setActiveId}
      />
    </>
  )
}

export default HabitComponent
