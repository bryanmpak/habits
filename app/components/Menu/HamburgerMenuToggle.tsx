import React from "react"
import { motion } from "framer-motion"

type Props = {
  isOpen: boolean
  toggleOpen: (e: React.MouseEvent) => void
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="var(--color-light)"
    strokeLinecap="round"
    {...props}
  />
)

export default function HamburgerMenuToggle({ isOpen, toggleOpen }: Props) {
  return (
    <button
      type="button"
      onClick={toggleOpen}
      className="bg-transparent border-none cursor-pointer focus:outline-none"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        />
      </svg>
    </button>
  )
}
