import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { NextAuthProvider } from "../components/SessionProvider"

import HabitMenubar from "../components/HabitMenubar"
import { getAuthSession } from "../lib/auth"
import { HabitsContext } from "../components/HabitsContext"
import { Toaster } from "@/components/ui/Toaster"
import { cookies } from "next/headers"
import ThemeProvider from "@/components/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "habits",
  description: "stay hard ♥️",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()
  const savedTheme = cookies().get("color-theme")

  const theme = savedTheme?.value || "light"
  const customBg =
    theme === "light"
      ? "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"
      : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"

  return (
    <html lang="en" data-color-theme={theme}>
      <body
        className={`${inter.className} min-h-full ${customBg} flex flex-col`}
      >
        <NextAuthProvider session={session}>
          <ThemeProvider>
            <HabitsContext>
              <HabitMenubar />
              {children}
            </HabitsContext>
          </ThemeProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
