import { useHabitsData } from "@/app/lib/useHabitsData"
import { AnimatePresence, motion, useCycle } from "framer-motion"
import React from "react"
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
}

const Sidebar = ({ isOpen, handleDismiss }: Props) => {
  const habitList = useHabitsData()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            className="h-full w-[80vw] sm:w-[60vw] fixed right-0 bg-neutral px-4 py-3 z-20"
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
              <Footer />
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
