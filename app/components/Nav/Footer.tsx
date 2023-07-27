import { useSession, signOut } from "next-auth/react"
import React from "react"

const Footer = () => {
  const { data: session } = useSession()

  return (
    <div className="w-full flex flex-col text-white mt-auto justify-center items-center gap-2">
      <div className="flex items-center ">
        <div className="rounded-full border-2 border-text w-8 h-8 mr-2"></div>
        <p className="flex-grow">{session?.user?.name}</p>
      </div>
      <button
        onClick={() => signOut()}
        className="text-white text-sm hover:text-text"
      >
        Sign Out
      </button>
    </div>
  )
}

export default Footer
