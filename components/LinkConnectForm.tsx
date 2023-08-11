"use client"
import { toast } from "@/lib/useToast"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const LinkConnectForm = () => {
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/link/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      })
      if (response.ok) {
        toast({
          title: "correct answer",
          description: "enjoy using your shared habits app 🥳",
        })
        router.push("/")
        router.refresh()
      }

      if (!response.ok) {
        toast({
          title: "efff",
          description: "wtf",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "something went wrong",
        description: "please try again",
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
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
        placeholder="enter secret answer"
        className="p-2 bg-neutral border border-neutral text-title focus:border-shadow border-1 focus:outline-none"
      ></input>
      <button
        className="flex mt-8 items-center justify-center p-2 w-full h-12 text-black bg-title hover:bg-text"
        type="submit"
      >
        {isLoading ? "checking answer.." : "submit answer"}
      </button>
    </form>
  )
}

export default LinkConnectForm
