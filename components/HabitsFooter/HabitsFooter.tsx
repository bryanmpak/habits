"use client";

import { Dispatch, SetStateAction } from "react";
import Day from "./Day";

type Props = {
  activeHabit: Habit;
  activeId: number;
  setActiveId: Dispatch<SetStateAction<number>>;
};

const HabitsFooter = ({ activeHabit, activeId, setActiveId }: Props) => {
  const handleClick = (id: number) => {
    setActiveId(id);
  };

  const currentWeekCompletions = activeHabit.completions.filter(
    (completion) => completion.isIncluded
  );

  currentWeekCompletions.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="flex p-4 justify-evenly items-center mx-auto mt-auto max-w-lg gap-4">
      {currentWeekCompletions.map((day, i) => {
        return (
          <Day
            id={i}
            key={`${i}-${day.isComplete}`}
            dayOfWeek={day.dayOfWeek}
            dateOfWeek={day.date.getDate()}
            isActive={i === activeId}
            isComplete={day.isComplete}
            isIncluded={day.isIncluded}
            onClick={() => handleClick(i)}
          />
        );
      })}
    </div>
  );
};

export default HabitsFooter;
