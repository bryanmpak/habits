import HabitButton from "@/app/components/HabitButton/HabitButton"
import HabitComponent from "@/app/components/HabitComponent"
import HabitsFooter from "@/app/components/HabitsFooter/HabitsFooter"
import Menu from "@/app/components/Nav/Menu"
import { prisma } from "@/app/lib/prisma"
import { Habit } from "@/app/types/typings"
import React, { useState } from "react"

type PageProps = {
  params: {
    slug: string
  }
}

// order of operations:
// pass the slug & updated completions into the body
// run the patch & update with latest data

const page = async ({ params }: PageProps) => {
  const { slug } = params
  // console.log(slug)

  const habitData = (await prisma.habit.findFirst({
    where: { habitName: slug },
    select: {
      habitName: true,
      completions: {
        select: {
          date: true,
          dayOfWeek: true,
          isActive: true,
          isComplete: true,
          isIncluded: true,
          habitId: true,
        },
      },
    },
  })) as Habit

  const activeIndex = habitData?.completions.findIndex(
    (day) => day.isActive
  ) as number

  // console.log("active index", activeIndex)

  const handleComplete = async () => {
    const response = await fetch(`/api/habit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    })
    console.log(response)
  }
  return (
    <main className="min-h-full relative">
      <Menu />
      {/* <HabitMenubar /> */}
      <HabitComponent activeHabit={habitData} activeIndex={activeIndex} />
    </main>
  )
}

export default page
