import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import ExpandingCircle from "./ExpandingCircle"
import { useCounter } from "./useCounter"

const HabitButton = ({
  habit,
  onComplete,
}: {
  habit: Habit
  onComplete: (isComplete: boolean) => void
}) => {
  const { counter, start, stop, reset, isMax } = useCounter(100, 100)

  const handleMouseDown = () => {
    start()
  }

  const handleMouseUp = async () => {
    stop()
    if (isMax) {
      await new Promise((r) => setTimeout(r, 100))
      onComplete(true)
    } else {
      onComplete(false)
    }
    reset()
  }

  return (
    <div className="h-[90vh] w-screen flex justify-center items-center p-4">
      {/* max-w temp since i'll have it on a parent div */}
      <motion.button
        disabled={habit.isComplete}
        className="relative w-[300px] h-[300px] focus:outline-none bg-nav_bg rounded-full flex items-center justify-center disabled:cursor-not-allowed"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        whileTap={habit.isComplete ? undefined : { scale: 0.975 }}
      >
        <ExpandingCircle progress={counter} />
        {habit.isComplete && (
          // should have some fun with this
          <div className="absolute text-text text-9xl">😍</div>
        )}
      </motion.button>
    </div>
  )
}

//

export default HabitButton
