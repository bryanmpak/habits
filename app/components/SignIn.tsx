"use client"
import React from "react"
import { signIn, useSession } from "next-auth/react"

const SignIn = () => {
  const { data: session, status } = useSession()

  return (
    <div className="w-80 rounded-md mx-auto flex flex-col items-center gap-10 pt-20">
      <h1 className="text-3xl text-title">placeholder text</h1>
      <button
        className="w-full h-12 text-black bg-title hover:bg-text"
        onClick={() => signIn("google")}
      >
        <p>Continue with Google</p>
      </button>
      <div className="h-[1px] w-full bg-text"></div>
      <p className="text-title">Continue as Guest (setup later)</p>
    </div>
  )
}

export default SignIn
