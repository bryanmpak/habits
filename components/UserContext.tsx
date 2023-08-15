import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import React, { createContext } from "react"

type UserContextTypes = {
  email: string | null
  name: string | null
}

const defaultUserContextTypes: UserContextTypes = {
  email: "",
  name: "",
}

const Context = createContext<UserContextTypes[]>([defaultUserContextTypes])

const UserContext = async (children: React.ReactNode) => {
  const session = await getAuthSession()
  if (!session) {
    return
  }

  const userId = session.user.id
  let userIds = [userId]
  const linkedUserId = session.user.linkedUserId
    ? userIds.push(session.user.linkedUserId)
    : null

  const userData = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      email: true,
      name: true,
    },
  })

  const mainUser = userData.filter((user) => user.email === session.user.email)
  const linkedUser = userData.filter(
    (user) => user.email !== session.user.email
  )

  return <Context.Provider value={userData}>{children}</Context.Provider>
}

export { Context, UserContext }
