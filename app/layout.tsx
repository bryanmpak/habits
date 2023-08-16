import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { NextAuthProvider } from "../components/SessionProvider"

import HabitMenubar from "../components/Menubar/HabitMenubar"
import { getAuthSession } from "../lib/auth"
import { HabitsContext } from "../components/HabitsContext"
import { Toaster } from "@/components/ui/Toaster"
import { Context, UserContext } from "@/components/UserContext"

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

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-full theme-mar bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300`} //"bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300" "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black"
      >
        <NextAuthProvider session={session}>
          <HabitsContext>
            <HabitMenubar />
            {children}
          </HabitsContext>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
