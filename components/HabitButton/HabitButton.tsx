"use client";

import { motion } from "framer-motion";
import ExpandingCircle from "./ExpandingCircle";
import { useCounter } from "../../lib/useCounter";

const HabitButton = ({
  activeHabit,
  activeId,
  onComplete,
}: {
  activeHabit: Habit;
  activeId: number;
  onComplete: (isComplete: boolean) => void;
}) => {
  const { counter, start, stop, reset, isMax } = useCounter(100, 100);
  const activeDay = activeHabit.completions[activeId];

  const handleMouseDown = () => {
    start();
  };

  const handleMouseUp = async () => {
    stop();
    if (isMax) {
      await new Promise((r) => setTimeout(r, 100));
      onComplete(true);
    } else {
      onComplete(false);
    }
    reset();
  };

  return (
    <div className="flex flex-1 justify-center items-center p-4">
      {/* max-w temp since i'll have it on a parent div */}
      <motion.button
        aria-label="Press and hold to complete habit"
        disabled={activeDay.isComplete || !activeDay.isIncluded}
        className="relative w-[300px] h-[300px] focus:outline-none bg-nav_bg rounded-full flex items-center justify-center shadow-2xl disabled:cursor-not-allowed select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        whileTap={activeDay.isComplete ? undefined : { scale: 0.975 }}
      >
        <ExpandingCircle progress={counter} />
        {activeDay.isComplete && (
          // should have some fun with this
          <div className="absolute text-text text-9xl select-none">😍</div>
        )}
      </motion.button>
    </div>
  );
};

//

export default HabitButton;
