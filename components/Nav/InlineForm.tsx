import { toast } from "@/lib/useToast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../HabitsContext"
import DaySelector from "./DaySelector"

type Props = {
  toggleItem: () => void
  handleDismiss: (e: React.FormEvent) => void
}

const InlineForm = ({ toggleItem, handleDismiss }: Props) => {
  const [habitInput, setHabitInput] = useState("")
  const [color, setColor] = useState("#FFFFFF")
  const { addHabit, datesArr, setHabitList, setSelectedHabit } =
    useContext(Context)
  const [completions, setCompletions] = useState<HabitCompletion[]>(datesArr)
  const router = useRouter()
  const { data: session } = useSession()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const slug = habitInput.replace(/\s+/g, "-").toLowerCase()
    if (session?.user) {
      await addHabit(habitInput, completions, slug, color)
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
      // router.refresh()
      handleDismiss(e)
    }
    // create habit object and setHabitList here for optimistic UI pattern
    setHabitList((prevHabits) => [
      ...prevHabits,
      { slug, habitName: habitInput, color },
    ])

    setSelectedHabit(habitInput)

    setHabitInput("")
    setCompletions([])
    toggleItem()
  }

  // *** maybe add a way for the "create habit" button to spin onClick
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex w-full p-2 justify-center items-center gap-1 '
    >
      <div className='w-12 h-16 flex justify-center items-center'>
        <input
          className='rounded-sm w-8 h-8 cursor-pointer bg-title'
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-1 flex-1 justify-center p-2'>
        <input
          ref={inputRef}
          className='flex-grow px-2 bg-neutral border border-light text-title rounded-sm focus:border-white focus:outline-none'
          type={"text"}
          placeholder='add new habit'
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        ></input>
        <DaySelector
          completions={completions}
          setCompletions={setCompletions}
        />
      </div>
      <button
        aria-label='Submit habit'
        className='w-12 h-16 rounded-md flex justify-center items-center border border-light bg-shadow disabled:bg-transparent disabled:cursor-not-allowed hover:bg-shadow_accent'
        type='submit'
        disabled={habitInput === ""}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='var(--color-title)'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
    </form>
  )
}

export default InlineForm
