"use client";
import { motion, useCycle } from "framer-motion";
// import { useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Context } from "./HabitsContext";
import Icons from "./Icons";
import LinkButton from "./LinkButton";
import Menu from "./Nav/Menu";
import SignInButton from "./SignInButton";
import { User } from "@prisma/client";
import { toast } from "sonner";

type HabitMenubarProps = {
  user: User | null;
};

const HabitMenubar = ({ user }: HabitMenubarProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const router = useRouter();
  const { habitList, selectedHabit, setSelectedHabit } = useContext(Context);

  const variants = {
    open: { height: "auto" },
    closed: { height: 0 },
  };

  const handleClick = (habit: HabitName) => {
    if (!user) {
      toast.warning("not signed in", {
        description: "please sign in to edit habits",
      });
      return;
    }

    setSelectedHabit(habit.habitName);
    router.push(`/habits/${habit.slug}`);
    router.refresh();
    toggleOpen();
  };

  const habitNamesArr = habitList.map((habit, i) => (
    <div
      key={i}
      className="py-1 text-xs cursor-pointer hover:underline decoration-shadow"
      onClick={() => handleClick(habit)}
    >
      {habit.habitName}
    </div>
  ));

  return (
    <div className="flex">
      <Link aria-label="Logo" href="/" className="p-4">
        <Icons.logo />
      </Link>
      <div className="relative flex w-full mr-[60px] mt-2 gap-2">
        <button
          aria-label="Menu Toggle"
          onClick={() => toggleOpen()}
          className="bg-nav_bg border-2 border-neutral p-4 rounded-2xl w-full h-10 flex justify-center items-center z-20 shadow-md hover:shadow-lg"
        >
          <div className="text-title text-center flex-grow">
            <p className="font-sans text-xs">
              {selectedHabit === "" ? "habits" : selectedHabit}
            </p>
          </div>
          <motion.svg
            fill="var(--color-title)"
            width="12"
            height="12"
            viewBox="0 0 20 20"
            initial={false}
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <path d="M0 7 L 20 7 L 10 16" />
          </motion.svg>
        </button>

        {habitNamesArr.length > 0 && (
          <motion.div
            className="absolute flex flex-col top-full left-0 w-full overflow-hidden bg-transparent text-center text-title font-sans z-10"
            variants={variants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
          >
            <div className="border border-light p-4 bg-nav_bg rounded-md">
              {habitNamesArr}
            </div>
          </motion.div>
        )}

        {!user ? <SignInButton /> : !user.linkedUserId ? <LinkButton /> : null}
      </div>

      <Menu />
    </div>
  );
};

export default HabitMenubar;
