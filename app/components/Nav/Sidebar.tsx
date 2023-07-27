import { AnimatePresence, motion, useCycle } from "framer-motion"
import React from "react"
import InlineForm from "../Menubar/InlineForm"
import UserToggle from "../UserToggle"
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
  const [addItem, toggleItem] = useCycle(false, true)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            className="h-full w-[60vw] fixed right-0 bg-neutral px-4 py-3 z-20"
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
              <div>
                <button
                  onClick={() => toggleItem()}
                  className="flex w-full text-title"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="var(--color-title)"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="flex-grow text-left text-sm px-1">
                    Create New Habit
                  </p>
                </button>
                {addItem && (
                  <motion.div
                    className="p-2 flex"
                    initial={{ opacity: 0, translateY: "-25%" }}
                    animate={
                      addItem
                        ? { opacity: 1, translateY: "0%" }
                        : { opacity: 0, translateY: "-25%" }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <InlineForm
                        toggleItem={toggleItem}
                        handleDismiss={handleDismiss}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
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
