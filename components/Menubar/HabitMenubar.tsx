"use client"
import { toast } from "@/lib/useToast"
import { HabitName } from "@/types/typings"
import { motion, useCycle } from "framer-motion"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"
import { Context } from "../HabitsContext"
import Icons from "../Icons"
import LinkButton from "../LinkButton"

import Menu from "../Nav/Menu"
import SignInButton from "../SignInButton"

const HabitMenubar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const router = useRouter()
  const { habitList, selectedHabit, setSelectedHabit } = useContext(Context)
  const { data: session } = useSession()

  const variants = {
    open: { height: "auto" },
    closed: { height: 0 },
  }

  const handleClick = (habit: HabitName) => {
    if (!session) {
      toast({
        title: "not signed in",
        description: "please sign in to edit habits!",
        variant: "destructive",
      })
      return
    }

    setSelectedHabit(habit.habitName)
    router.push(`/habits/${habit.slug}`)
    toggleOpen()
  }

  const habitNamesArr = habitList.map((habit, i) => (
    <div
      key={i}
      className="py-1 text-xs cursor-pointer hover:underline decoration-shadow"
      onClick={() => handleClick(habit)}
    >
      {habit.habitName}
    </div>
  ))

  return (
    <div className="flex">
      <Link href="/" className="p-4">
        <Icons.logo />
      </Link>
      <div className="relative flex w-full mr-[60px] mt-2 gap-2">
        <button
          onClick={() => toggleOpen()}
          className="bg-nav_bg border-2 border-neutral p-4 rounded-2xl w-full h-10 flex justify-center items-center z-20 shadow-md"
        >
          <div className="text-title text-center flex-grow">
            <p className="font-sans text-xs">
              {selectedHabit === "" ? "habits" : selectedHabit}
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
        </motion.div>
        {!session && <LinkButton />}
      </div>

      <Menu />
    </div>
  )
}

export default HabitMenubar
