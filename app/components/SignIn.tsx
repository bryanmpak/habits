"use client"
import React from "react"
import { signIn, useSession } from "next-auth/react"

const SignIn = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <main className="h-screen bg-bg_main flex flex-col justify-center items-center">
        <div className="max-w-[500px] ">
          <button
            className="flex gap-1 mx-4 py-2 px-4 text-[#bebebe] bg-bg_secondary justify-between items-center hover:bg-accent_1 hover:text-white rounded"
            onClick={() => signIn("google")}
          >
            <p>sign-in with google</p>
          </button>
        </div>
      </main>
    </>
  )
}

export default SignIn
