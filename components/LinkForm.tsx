"use client"
import { toast } from "@/lib/useToast"
import React, { useState } from "react"

const LinkForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [secretQuestion, setSecretQuestion] = useState("")
  const [secretAnswer, setSecretAnswer] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {}
  const handleClick = async () => {
    setIsLoading(true)
    try {
      toast({
        title: "request submitted",
        description: "nudge your partner to finish the linking process 😉",
      })
    } catch (error) {
      toast({
        title: "request failed",
        description: "check the inputs & try again!",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="email"
        required
        placeholder="partner's email"
        className="p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        placeholder="secret question"
        className="p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none"
        value={secretQuestion}
        onChange={(e) => setSecretQuestion(e.target.value)}
      />
      <input
        required
        placeholder="secret answer"
        className="p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none"
        value={secretAnswer}
        onChange={(e) => setSecretAnswer(e.target.value)}
      />
      <button
        type="submit"
        className="flex mt-8 items-center justify-center p-2 w-full h-12 text-black bg-title hover:bg-text"
      >
        {isLoading ? "submitting..." : "submit request"}
      </button>
    </form>
  )
}

export default LinkForm
