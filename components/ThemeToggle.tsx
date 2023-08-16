"use client"
import { motion } from "framer-motion"
import React, { useContext, useState } from "react"
import Cookie from "js-cookie"
import { ThemeContext } from "./ThemeContext"

const spring: {} = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}

const ThemeToggle = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error("UserToggle must be used within a ThemeProvider")
  }
  const { theme, setTheme } = themeContext

  const toggleCSS = theme === "dark" ? "justify-start" : "justify-end"

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
    document.documentElement.setAttribute("data-color-theme", nextTheme)

    const customBg =
      nextTheme === "light"
        ? "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"
        : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"
    document.body.className = `min-h-full ${customBg}`

    Cookie.set("color-theme", nextTheme, { expires: 1000 })
  }

  return (
    <div
      className={
        "flex cursor-pointer rounded-full p-[2px] bg-dark w-[60px] h-[30px] items-center " +
        toggleCSS
      }
      onClick={handleClick}
    >
      <motion.div
        className="bg-neutral border-light border-2 w-[24px] h-[24px] rounded-full flex justify-center items-center"
        layout
        transition={spring}
      >
        <p className="text-sm items-center">{theme === "dark" ? "🍆" : "🍑"}</p>
      </motion.div>
    </div>
  )
}

export default ThemeToggle
