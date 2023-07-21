import React, { useContext, useState } from "react"
import { Context } from "../HabitsContext"

const InlineForm = () => {
  const [habitInput, setHabitInput] = useState("")
  const { addHabit } = useContext(Context)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addHabit(habitInput)
    setHabitInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 flex w-full gap-1">
      <input
        className="flex-grow px-2 bg-title text-black rounded-md"
        type={"text"}
        placeholder="Add New Habit"
        value={habitInput}
        onChange={(e) => setHabitInput(e.target.value)}
      ></input>
      <button className="p-[1px]" type="submit">
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
