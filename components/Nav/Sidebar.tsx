import { HabitName } from "@/types/typings"
import { AnimatePresence, Cycle, motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"
import { Context } from "../HabitsContext"
import UserToggle from "../UserToggle"
import CreateHabitForm from "./CreateHabitForm"
import Footer from "./Footer"

const sidebarVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
}

type Props = {
  isOpen: boolean
  handleDismiss: (e: React.FormEvent) => void
  toggleOpen: Cycle
}

const Sidebar = ({ isOpen, handleDismiss, toggleOpen }: Props) => {
  const { habitList, setHabitList } = useContext(Context)
  const router = useRouter()
  const { data: session } = useSession()

  const handleClick = async (habit: HabitName) => {
    setHabitList((prevHabits) =>
      prevHabits.filter((habits) => habits.id !== habit.id)
    )

    if (session) {
      await fetch("/api/habitsList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habit),
      })
    }

    toggleOpen()
    router.push("/")
  }

  const habitsListArr = habitList.map((habit, i) => (
    <div
      key={i}
      className="flex w-full text-title justify-between items-center p-[2px] hover:bg-light"
    >
      <p className="text-xs pl-2">{habit.habitName}</p>
      <button
        onClick={() => handleClick(habit)}
        className="p-2 border-light border rounded-md hover:bg-red-500"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  ))

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            className="h-full w-[90vw] sm:w-[60vw] fixed right-0 bg-neutral px-1 sm:px-4 py-3 z-20"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { delay: 0.4, duration: 0.2 } }}
            exit={{ x: "100%", transition: { delay: 0.7, duration: 0.3 } }}
          >
            <motion.div
              className="flex flex-col gap-2 min-h-full"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <UserToggle />
              <div className="h-[2px] bg-dark"></div>
              {/* create habit (component?) */}
              <CreateHabitForm handleDismiss={handleDismiss} />
              <div className="h-[2px] bg-dark"></div>
              <div>{habitsListArr}</div>
              <Footer />
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
