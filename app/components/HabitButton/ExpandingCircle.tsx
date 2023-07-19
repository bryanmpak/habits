import { AnimatePresence, motion } from "framer-motion"
import React from "react"

type Props = {
  progress: number
}

const springAnimate = {
  type: "spring",
  stiffness: 400,
  damping: 50,
  duration: 0.5,
}

const ExpandingCircle = ({ progress }: Props) => {
  return (
    <motion.div
      layout
      className="absolute bg-shadow rounded-full w-full h-full"
      initial={{ scale: 0 }}
      animate={{ scale: progress / 100, transition: springAnimate }}
      exit={{ scale: 0 }}
    />
  )
}

export default ExpandingCircle
