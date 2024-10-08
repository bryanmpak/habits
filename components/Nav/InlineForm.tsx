// import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../HabitsContext";
import DaySelector from "./DaySelector";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

type Props = {
  toggleItem: () => void;
  handleDismiss: (e: React.FormEvent) => void;
};

const InlineForm = ({ toggleItem, handleDismiss }: Props) => {
  const [habitInput, setHabitInput] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const { addHabit, datesArr } = useContext(Context);
  const [completions, setCompletions] = useState<HabitCompletion[]>(datesArr);
  const router = useRouter();
  // const { data: session } = useSession()
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function generateSlug(input: string) {
    return input
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove all non-word chars (except whitespace and hyphens)
      .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slug = generateSlug(habitInput);
    if (user) {
      try {
        await addHabit(habitInput, completions, slug, color);
        router.push(`/habits/${slug}`);
        handleDismiss(e);
      } catch (error) {
        console.error("Error adding habit:", error);
        toast.error("Failed to add habit");
      }
    } else {
      toast.warning("not signed in", {
        description: "sign in to add habits!",
      });
      router.push("/");
      handleDismiss(e);
    }

    setHabitInput("");
    setCompletions([]);
    toggleItem();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-full p-2 justify-center items-center gap-1 bg-neutral rounded-md mt-1"
    >
      <div className="w-12 h-16 flex justify-center items-center">
        <input
          className="rounded-md w-8 h-8 cursor-pointer bg-title"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 justify-center p-2">
        <input
          ref={inputRef}
          className="flex-grow px-2 font-sans text-md bg-title border border-light rounded-md focus:border-white focus:outline-none"
          type={"text"}
          placeholder="add new habit"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        ></input>
        <DaySelector
          completions={completions}
          setCompletions={setCompletions}
        />
      </div>
      <button
        aria-label="Submit habit"
        className="w-12 h-16 rounded-md flex justify-center items-center border border-light bg-shadow disabled:bg-transparent disabled:cursor-not-allowed hover:bg-shadow_accent"
        type="submit"
        disabled={habitInput === ""}
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
  );
};

export default InlineForm;
