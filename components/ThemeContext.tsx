"use client"

import React, { useState, useEffect } from "react"
import Cookie from "js-cookie"

type ThemeContextType = {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const savedTheme = Cookie.get("color-theme") || "light"

  const [theme, setTheme] = useState(savedTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-color-theme", theme)
    Cookie.set("color-theme", theme, { expires: 1000 })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
