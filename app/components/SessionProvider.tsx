"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ExtendedSession } from "../types/typings"

type Props = {
  children?: React.ReactNode
  session: ExtendedSession | null
}

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}
