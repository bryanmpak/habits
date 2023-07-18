import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import UserToggle from "../UserToggle"

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
}

const Sidebar = ({ isOpen }: Props) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="min-h-screen w-[40vw] fixed right-0 bg-neutral px-4 py-3 z-10"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { delay: 0.4, duration: 0.2 } }}
            exit={{ x: "100%", transition: { delay: 0.7, duration: 0.3 } }}
          >
            <motion.div
              className="flex flex-col gap-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <UserToggle />
              <div className="h-[2px] bg-light"></div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
