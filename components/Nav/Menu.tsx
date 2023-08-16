"use client"

import { useCycle } from "framer-motion"
import React, { useEffect } from "react"
import HamburgerMenuToggle from "./HamburgerMenuToggle"
import Sidebar from "./Sidebar"

const Menu = ({ initialTheme }: { initialTheme: string }) => {
  const [isOpen, toggleOpen] = useCycle(false, true)

  useEffect(() => {
    const handleWindowClick = () => {
      if (isOpen) {
        toggleOpen()
      }
    }
    window.addEventListener("click", handleWindowClick)

    return () => {
      window.removeEventListener("click", handleWindowClick)
    }
  }, [isOpen, toggleOpen])

  // *** at certain size, display sidebar & get rid of menu
  return (
    <div className="flex right-0">
      <Sidebar
        isOpen={isOpen}
        toggleOpen={() => toggleOpen()}
        handleDismiss={(e: React.FormEvent) => {
          e.stopPropagation()
          toggleOpen()
        }}
        initialTheme={initialTheme}
      />
      <div className="fixed top-0 right-0 p-4 z-50 lg:hidden">
        <HamburgerMenuToggle
          isOpen={isOpen}
          toggleOpen={(e: React.MouseEvent) => {
            e.stopPropagation()
            toggleOpen()
          }}
        />
      </div>
    </div>
  )
}

export default Menu
