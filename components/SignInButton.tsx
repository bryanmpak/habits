"use client"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "@/lib/useToast"
import { useRouter } from "next/navigation"

const SignInButton = () => {
  const router = useRouter()

  // *** i don't like the flickering (on HabitMenubar, maybe do a useSWR or something)
  return (
    <button
      onClick={() => router.push("/sign-in")}
      className="mt-[2px] bg-shadow text-xs z-40 font-semibold w-24 p-4 rounded-md h-8 flex justify-center items-center shadow-md hover:bg- disabled:bg-neutral"
    >
      sign in
    </button>
  )
}

export default SignInButton
