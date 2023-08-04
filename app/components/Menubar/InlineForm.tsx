import React, { useContext, useState } from "react"
import { Context } from "../HabitsContext"
import DaySelector from "./DaySelector"

type Props = {
  toggleItem: () => void
  handleDismiss: (e: React.FormEvent) => void
}

const InlineForm = ({ toggleItem, handleDismiss }: Props) => {
  const [habitInput, setHabitInput] = useState("")
  const { addHabit, datesArr, habitsList, setHabitsList } = useContext(Context)
  const [completions, setCompletions] = useState<HabitCompletion[]>(datesArr)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addHabit(habitInput, completions)
    setHabitInput("")
    setCompletions([])
    toggleItem()
    setHabitsList((prevHabitsList) => [
      ...prevHabitsList,
      { habitName: habitInput, slug },
    ])
    setTimeout(() => {
      handleDismiss(e)
    }, 100)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex pb-2">
        <input
          className="flex-grow px-2 bg-title text-black focus:outline-none"
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
      </div>
      <DaySelector completions={completions} setCompletions={setCompletions} />
    </form>
  )
}

export default InlineForm
