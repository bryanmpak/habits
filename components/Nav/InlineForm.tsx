import { toast } from "@/lib/useToast"
import { HabitCompletion } from "@/types/typings"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useContext, useState } from "react"
import { Context } from "../HabitsContext"
import DaySelector from "./DaySelector"

type Props = {
  toggleItem: () => void
  handleDismiss: (e: React.FormEvent) => void
}

const InlineForm = ({ toggleItem, handleDismiss }: Props) => {
  const [habitInput, setHabitInput] = useState("")
  const [habitColor, setHabitColor] = useState("#FFFFFF")
  const { addHabit, datesArr, setHabitList, setSelectedHabit } =
    useContext(Context)
  const [completions, setCompletions] = useState<HabitCompletion[]>(datesArr)
  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const slug = habitInput.replace(/\s+/g, "-").toLowerCase()
    if (session?.user) {
      await addHabit(habitInput, completions, slug)
      setTimeout(() => {
        router.push(`/habits/${slug}`)
        router.refresh()
        handleDismiss(e)
      }, 100)
    } else {
      toast({
        title: "not signed in",
        description: "sign in to add habits!",
      })
      router.push("/")
      router.refresh()
      handleDismiss(e)
    }
    // create habit object and setHabitList here for optimistic UI pattern
    setHabitList((prevHabits) => [
      ...prevHabits,
      { slug, habitName: habitInput },
    ])

    setSelectedHabit(habitInput)

    setHabitInput("")
    setCompletions([])
    toggleItem()
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-full  mt-2 justify-center items-center gap-1 border border-light"
    >
      <div className="p-1 h-16 flex justify-center items-center">
        <input
          className="rounded-sm w-6 h-6 cursor-pointer bg-title"
          type="color"
          value={habitColor}
          onChange={(e) => setHabitColor(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 justify-center">
        <input
          className="flex-grow px-2 bg-title text-black focus:outline-none"
          type={"text"}
          placeholder="Add New Habit"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        ></input>
        <DaySelector
          completions={completions}
          setCompletions={setCompletions}
        />
      </div>
      <button
        className="w-16 h-16 rounded-md flex justify-center items-center hover:bg-shadow"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="var(--color-title)"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </form>
  )
}

export default InlineForm
