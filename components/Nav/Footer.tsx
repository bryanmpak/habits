import { SignOutButton, useClerk, useUser } from "@clerk/nextjs"
// import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const Footer = () => {
  // const { data: session } = useSession()
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  if (!user) {
    return null
  }

  return (
    <div className='w-full text-white mt-auto'>
      <div className='w-full h-[1px] bg-dark'></div>
      <div className='flex items-center p-4 gap-4'>
        <img
          className='rounded-full border-2 border-text w-12 h-12'
          src={user.imageUrl as string}
          alt='profile picture'
        />

        <div className='flex flex-col'>
          <p className='lowercase text-sm'>{user.fullName}</p>

          <SignOutButton
            signOutCallback={() => {
              signOut()
              router.push("/")
            }}
          >
            log out
          </SignOutButton>
        </div>
      </div>
    </div>
  )
}

export default Footer
