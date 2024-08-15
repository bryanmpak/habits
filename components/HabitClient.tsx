"use client";

// import { useSession } from "next-auth/react"
import { useState } from "react";
import { getDate } from "../lib/dates";
import HabitButton from "./HabitButton/HabitButton";
import HabitsFooter from "./HabitsFooter/HabitsFooter";
import { useUser } from "@clerk/nextjs";

type Props = {
  habitData: Habit;
};

const HabitClient = ({ habitData }: Props) => {
  const activeWeek = getDate();
  const activeIndex = activeWeek.findIndex((day) => day.isActive);
  console.log("index", activeIndex);

  const [activeId, setActiveId] = useState(activeIndex);
  const [activeHabit, setActiveHabit] = useState(habitData);
  const { user } = useUser();

  const handleComplete = (isComplete: boolean, id: number) => {
    // need to split id & activeId since anon users won't be logged to DBs
    if (isComplete) {
      let activeCompletion = { ...activeHabit.completions[id] };
      activeCompletion.isComplete = true;

      setActiveHabit((prevHabit) => {
        const updatedHabit = {
          ...prevHabit,
          completions: prevHabit.completions.map((day, i) =>
            i === activeId ? { ...day, isComplete } : day
          ),
        };

        if (user) {
          if (!activeHabit.slug) {
            return updatedHabit;
          }
          const requestBody = JSON.stringify(activeCompletion);

          fetch(`/api/habits/${activeHabit.slug}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: requestBody,
          });
        }

        return updatedHabit;
      });
    }
  };

  return (
    <>
      <HabitButton
        activeHabit={activeHabit}
        activeId={activeId}
        onComplete={(isComplete) => handleComplete(isComplete, activeId)}
      />
      <HabitsFooter
        activeHabit={activeHabit}
        activeId={activeId}
        setActiveId={setActiveId}
      />
    </>
  );
};

export default HabitClient;
