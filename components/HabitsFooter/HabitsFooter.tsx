"use client";

import { Dispatch, SetStateAction } from "react";
import Day from "./Day";
import { getDate } from "@/lib/dates";

type Props = {
  activeHabit: Habit;
  activeId: number;
  setActiveId: Dispatch<SetStateAction<number>>;
};

const HabitsFooter = ({ activeHabit, activeId, setActiveId }: Props) => {
  const handleClick = (id: number) => {
    setActiveId(id);
  };

  const weekDates = getDate(7);

  return (
    <div className="flex p-4 justify-evenly items-center mx-auto mt-auto max-w-lg gap-4">
      {weekDates.map((dayInfo, index) => {
        const completion = activeHabit.completions.find(
          (c) => new Date(c.date).toDateString() === dayInfo.date.toDateString()
        );
        return (
          <Day
            key={dayInfo.date.toISOString()}
            id={index}
            dayOfWeek={dayInfo.dayOfWeek}
            dateOfWeek={dayInfo.date.getDate()}
            isActive={dayInfo.isActive}
            isComplete={completion?.isComplete || false}
            isIncluded={completion?.isIncluded || false}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default HabitsFooter;
