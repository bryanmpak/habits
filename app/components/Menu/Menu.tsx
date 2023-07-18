"use client"

import { useCycle } from "framer-motion"
import React from "react"
import HamburgerMenuToggle from "./HamburgerMenuToggle"
import Sidebar from "./Sidebar"

const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)

  return (
    <div>
      <div className="fixed top-0 right-0 p-4 z-50">
        <HamburgerMenuToggle isOpen={isOpen} toggleOpen={() => toggleOpen()} />
      </div>
      <Sidebar isOpen={isOpen} />
    </div>
  )
}

export default Menu
