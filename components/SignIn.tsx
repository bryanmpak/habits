"use client"
import React from "react"
import { signIn } from "next-auth/react"
import Icons from "./Icons"

const SignIn = () => {
  const handleLogin = async () => {
    try {
      throw new Error()
      // await signIn("google")
    } catch (error) {
      // toast({
      //   title: "oops, there was a problem",
      //   description: "there was an error logging in with google",
      //   variant: "destructive",
      // })
    }
  }

  return (
    <div className="w-80 rounded-md mx-auto flex flex-col items-center gap-10 pt-20">
      <h1 className="text-3xl text-title">placeholder text</h1>
      <button
        className="flex items-center justify-center gap-2 p-2 w-full h-12 text-black bg-title hover:bg-text"
        onClick={handleLogin}
      >
        <Icons.google className="w-6 h-6" />
        <p>Continue with Google</p>
      </button>
      <div className="h-[1px] w-full bg-text"></div>
      <p className="text-title">Continue as Guest (setup later)</p>
    </div>
  )
}

export default SignIn
