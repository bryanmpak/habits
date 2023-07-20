import { motion } from "framer-motion"
import React, { useContext, useState } from "react"
import { Context } from "../HabitsContext"
import InlineForm from "./InlineForm"

const HabitMenubar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { habits, activeHabit, setActiveHabit } = useContext(Context)

  const variants = {
    open: { height: "auto" },
    closed: { height: 0 },
  }

  const habitNamesArr = habits.map((habit, i) => (
    <div
      key={i}
      className="py-1 text-xs cursor-pointer hover:underline decoration-shadow"
      onClick={() => {
        setActiveHabit(habit)
        setIsOpen(!isOpen)
      }}
    >
      {habit.habitName}
    </div>
  ))

  console.log(activeHabit)

  return (
    <div className="relative w-1/2 mx-auto mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-nav_bg border-2 border-neutral p-4 rounded-2xl w-full h-[40px] flex justify-center items-center z-40 "
      >
        <div className="text-title text-center flex-grow">
          <p className="font-sans text-xs">
            {habits.length < 1 ? "habits" : activeHabit?.habitName}
          </p>
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
        className="absolute top-full left-0 w-full overflow-hidden bg-transparent text-center text-title font-sans z-10"
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        {habitNamesArr}
        <InlineForm />
      </motion.div>
    </div>
  )
}

export default HabitMenubar
