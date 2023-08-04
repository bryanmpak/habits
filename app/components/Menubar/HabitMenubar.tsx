"use client"

import { useHabitsData } from "@/app/lib/useHabitsData"
import { motion, useCycle } from "framer-motion"
import { useRouter } from "next/navigation"
import React, { useContext, useState } from "react"
import { Context } from "../HabitsContext"

const HabitMenubar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const router = useRouter()
  const { habitList } = useContext(Context)
  const [habitName, setHabitName] = useState("")

  const variants = {
    open: { height: "auto" },
    closed: { height: 0 },
  }

  const habitNamesArr = habitList.map((habit, i) => (
    <div
      key={i}
      className="py-1 text-xs cursor-pointer hover:underline decoration-shadow"
      onClick={() => {
        router.push(`/habits/${habit.slug}`)
        setHabitName(habit.habitName)
        toggleOpen()
      }}
    >
      {habit.habitName}
    </div>
  ))

  return (
    <div className="relative w-2/3 sm:w-1/2 mx-auto mt-2">
      <button
        onClick={() => toggleOpen()}
        className="bg-nav_bg border-2 border-neutral p-4 rounded-2xl w-full h-[40px] flex justify-center items-center z-40 shadow-md"
      >
        <div className="text-title text-center flex-grow">
          <p className="font-sans text-xs">
            {habitName === "" ? "habits" : habitName}
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
        {/* <InlineForm /> */}
      </motion.div>
    </div>
  )
}

export default HabitMenubar
