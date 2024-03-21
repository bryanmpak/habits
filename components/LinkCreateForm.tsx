"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

const LinkCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [secretQuestion, setSecretQuestion] = useState("")
  const [secretAnswer, setSecretAnswer] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const response = await fetch("/api/link/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, secretQuestion, secretAnswer }),
      })

      if (response.ok) {
        toast("request submitted", {
          description: "nudge your partner to finish the linking process 😉",
        })

        router.push("/")
        router.refresh()
      }
      // *** add an else clause here
    } catch (error) {
      toast.error("request failed", {
        description: "check the inputs & try again!",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className='flex flex-col gap-2 w-full'
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type='email'
        required
        placeholder="partner's email"
        className='p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        placeholder='secret question'
        className='p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none'
        value={secretQuestion}
        onChange={(e) => setSecretQuestion(e.target.value)}
      />
      <input
        required
        placeholder='secret answer'
        className='p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none'
        value={secretAnswer}
        onChange={(e) => setSecretAnswer(e.target.value)}
      />
      <button
        aria-label='Submit secret question and answer'
        type='submit'
        className='flex mt-8 items-center justify-center p-2 w-full h-12 text-black bg-title hover:bg-text'
      >
        {isLoading ? "submitting..." : "submit request"}
      </button>
    </form>
  )
}

export default LinkCreateForm
