import { motion } from "framer-motion"
import React, { useState } from "react"

const spring: {} = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}

const UserToggle = () => {
  // using state for now, need to plug into user auth
  const [user, setUser] = useState(true)

  const toggleCSS = user ? "justify-start" : "justify-end"

  return (
    <div
      className={
        "flex cursor-pointer rounded-full p-[2px] bg-dark border-neutral border-2 w-[60px] h-[30px] items-center " +
        toggleCSS
      }
      // using state for now, need to plug into user auth
      onClick={() => setUser(!user)}
    >
      <motion.div
        className="bg-neutral border-light border-2 w-[24px] h-[24px] rounded-full"
        layout
        transition={spring}
      />
    </div>
  )
}

export default UserToggle
