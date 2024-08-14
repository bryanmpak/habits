import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/Button";

type Props = {
  completions: HabitCompletion[];
  setCompletions: Dispatch<SetStateAction<HabitCompletion[]>>;
};

export default function DaySelector({ completions, setCompletions }: Props) {
  const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const handleOnClick = (clickedDayIndex: number) => {
    const clickedDay = completions[clickedDayIndex];
    setCompletions((prevCompletions) =>
      prevCompletions.map((day) =>
        day.dayOfWeek === clickedDay.dayOfWeek
          ? { ...day, isIncluded: !day.isIncluded }
          : day
      )
    );
  };

  return (
    <div className="flex justify-evenly">
      {DAYS_OF_WEEK.map((dayOfWeek, i) => (
        <Button
          type="button"
          size={"icon"}
          onClick={() => handleOnClick(i)}
          key={i}
          className="flex h-8 w-8 flex-col justify-center items-center rounded-full text-[8px] text-text ring-title"
        >
          <div
            className={`${
              completions[i]?.isIncluded
                ? "bg-shadow text-black"
                : "bg-transparent"
            } flex w-8 h-8 rounded-full border-2 border-neutral justify-center items-center`}
          >
            <p>{dayOfWeek}</p>
          </div>
        </Button>
      ))}
    </div>
  );
}
