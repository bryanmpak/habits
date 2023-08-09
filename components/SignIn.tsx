"use client"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import Icons from "./Icons"
import Link from "next/link"
import { toast } from "@/lib/useToast"

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "oops, there was a problem",
        description: "there was an error logging in with google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-80 rounded-md mx-auto flex flex-col items-center gap-8 pt-20">
      <h1 className="text-3xl text-title">placeholder text</h1>
      <button
        disabled={isLoading}
        className="flex items-center justify-center gap-2 p-2 w-full h-12 text-black bg-title hover:bg-text"
        onClick={handleLogin}
      >
        <Icons.google className="w-6 h-6" />
        <p>Continue with Google</p>
      </button>
      <div className="relative flex w-full items-center">
        <div className="h-[1px] w-full bg-text"></div>
        <p className="text-title px-2">OR</p>
        <div className="h-[1px] w-full bg-text"></div>
      </div>
      <Link
        href="/"
        className="text-title text-sm hover:decoration-white hover:underline"
      >
        Continue as Guest
      </Link>
    </div>
  )
}

export default SignIn
