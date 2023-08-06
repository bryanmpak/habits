"use client"
import React from "react"
import { signIn, useSession } from "next-auth/react"
import Icons from "./Icons"

const SignIn = () => {
  const { data: session, status } = useSession()

  return (
    <div className="w-80 rounded-md mx-auto flex flex-col items-center gap-10 pt-20">
      <h1 className="text-3xl text-title">placeholder text</h1>
      <button
        className="flex items-center p-2 w-full h-12 text-black bg-title hover:bg-text"
        onClick={() => signIn("google")}
      >
        <Icons.google className="w-8 h-8" />
        <p className="mx-auto">Continue with Google</p>
      </button>
      <div className="h-[1px] w-full bg-text"></div>
      <p className="text-title">Continue as Guest (setup later)</p>
    </div>
  )
}

export default SignIn
