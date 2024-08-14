"use client";

// import { useSession } from "next-auth/react"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getDate } from "../lib/dates";
import { useUser } from "@clerk/nextjs";

type HabitContextTypes = {
  habitList: HabitName[];
  setHabitList: Dispatch<SetStateAction<HabitName[]>>;
  addHabit: (
    habitName: string,
    completions: HabitCompletion[],
    slug: string,
    habitColor: string
  ) => Promise<Habit>;
  selectedHabit: string;
  setSelectedHabit: Dispatch<SetStateAction<string>>;
  datesArr: HabitCompletion[];
  clearHabitData: () => void;
};

type Props = {
  children: React.ReactNode;
};

const defaultHabitContext: HabitContextTypes = {
  habitList: [],
  setHabitList: () => {},
  addHabit: async () => ({
    slug: "",
    habitName: "",
    completions: [],
    color: "",
  }),
  selectedHabit: "",
  setSelectedHabit: () => {},
  datesArr: [],
  clearHabitData: () => {},
};

const Context = createContext<HabitContextTypes>(defaultHabitContext);

const HabitsContext = ({ children }: Props) => {
  const dates = getDate(90);
  const datesArr = dates.map((date) => ({
    ...date,
    isComplete: false,
    isIncluded: true,
  }));
  // const { data: session } = useSession()
  const { user, isLoaded } = useUser();

  const [habitList, setHabitList] = useState<HabitName[]>([]);
  const [selectedHabit, setSelectedHabit] = useState("");

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        fetchHabits();
      } else {
        clearHabitData();
      }
    }
  }, [user, isLoaded]);

  const fetchHabits = async () => {
    const response = await fetch("/api/habitsList");
    const habitsList: Habit[] = await response.json();
    setHabitList(habitsList);
  };

  const clearHabitData = () => {
    setHabitList([]);
    setSelectedHabit("");
  };

  const addHabit = async (
    habitName: string,
    completions: HabitCompletion[],
    slug: string,
    color: string
  ): Promise<Habit> => {
    // Filter out completions where isIncluded is false
    const includedCompletions = completions.filter(
      (completion) => completion.isIncluded
    );

    const response = await fetch("/api/addHabit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        habitName,
        completions: includedCompletions,
        color,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`);
    } else {
      const newHabit: Habit = await response.json();
      // Update habitList state immediately
      setHabitList((prevList) => [...prevList, { slug, habitName, color }]);

      // Update selectedHabit
      setSelectedHabit(habitName);

      return newHabit;
    }
  };

  return (
    <Context.Provider
      value={{
        habitList,
        setHabitList,
        addHabit,
        selectedHabit,
        setSelectedHabit,
        datesArr,
        clearHabitData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, HabitsContext };
