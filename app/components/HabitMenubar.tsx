import { motion } from "framer-motion"
import React, { useState } from "react"

const HabitMenubar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const variants = {
    open: { height: "auto" },
    closed: { height: 0 },
  }

  return (
    <div className="relative w-1/2 mx-auto mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-nav_bg border-2 border-neutral p-4 rounded-2xl w-full h-[40px] flex justify-center items-center z-40 "
      >
        <div className="text-title text-center flex-grow">
          <p className="text-xs font-sans">habits</p>
        </div>
        <motion.svg
          fill="var(--color-title)"
          width="12"
          height="12"
          viewBox="0 0 20 20"
          initial={false}
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <path d="M0 7 L 20 7 L 10 16" />
        </motion.svg>
      </button>

      {/* have fun with the animations here */}
      <motion.div
        className="absolute top-full left-0 w-full overflow-hidden bg-transparent rounded-2xl text-title text-center text-xs font-sans z-10"
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <div className="p-2">Huberman Fitness Protocol</div>
        <div className="p-2">Deploy on Github Daily</div>
        <div className="p-2">Wake up at 7AM Daily</div>
      </motion.div>
    </div>
  )
}

export default HabitMenubar
