import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const Footer = () => {
  const { data: session } = useSession()
  const router = useRouter()
  if (!session) {
    return null
  }

  return (
    <div className="w-full text-white mt-auto">
      <div className="w-full h-[1px] bg-dark"></div>
      <div className="flex items-center p-4 gap-4">
        <img
          className="rounded-full border-2 border-text w-12 h-12"
          src={session.user.image as string}
          alt="profile picture"
        />

        <div className="flex flex-col">
          <p className="lowercase text-sm">{session.user.name}</p>

          <button
            onClick={async () => {
              await signOut()
              router.push("/")
            }}
            className="text-xs text-left rounded-sm hover:underline hover:decoration-shadow hover:text-text lowercase"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
