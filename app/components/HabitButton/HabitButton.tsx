"use client"

import { motion } from "framer-motion"
import React, { useState } from "react"
import ExpandingCircle from "./ExpandingCircle"
import { useCounter } from "./useCounter"

const HabitButton = () => {
  const { counter, start, stop, reset, isMax } = useCounter(100, 100)
  const [isComplete, setIsComplete] = useState(false)

  const handleMouseDown = () => {
    setIsComplete(false)
    start()
  }

  const handleMouseUp = async () => {
    stop()
    if (isMax) {
      await new Promise((r) => setTimeout(r, 100))
      setIsComplete(true)
    }
    reset()
  }

  return (
    <div className="h-[90vh] w-screen flex justify-center items-center p-4">
      {/* max-w temp since i'll have it on a parent div */}
      <motion.button
        className="relative w-[300px] h-[300px] focus:outline-none bg-black rounded-full flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        whileTap={{ scale: 0.975 }}
      >
        {/* <ProgressBar progress={counter} /> */}
        <ExpandingCircle progress={counter} />
        {isComplete && <div className="absolute text-white text-2xl">✓</div>}
      </motion.button>
    </div>
  )
}

//

export default HabitButton
