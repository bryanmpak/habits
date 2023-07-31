import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user.id) {
    throw new Error("not signed in!")
  }

  const userId = session?.user.id

  return { userId }
}

export default serverAuth
