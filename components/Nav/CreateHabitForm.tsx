import { motion, useCycle } from "framer-motion";
import React from "react";
import InlineForm from "./InlineForm";

type Props = {
  handleDismiss: (e: React.FormEvent) => void;
};

const CreateHabitForm = ({ handleDismiss }: Props) => {
  const [addItem, toggleItem] = useCycle(false, true);

  return (
    <div>
      <button
        onClick={() => toggleItem()}
        className="flex w-full p-1 md:p-2 rounded-md bg-neutral text-title hover:shadow-lg"
        aria-label="open to create habit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          strokeWidth="1.5"
          stroke="var(--color-title)"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p className="flex-grow text-left text-xs px-2">create new habit</p>
      </button>
      {addItem && (
        <motion.div
          initial={{ opacity: 0, translateY: "-25%" }}
          animate={
            addItem
              ? { opacity: 1, translateY: "0%" }
              : { opacity: 0, translateY: "-25%" }
          }
          transition={{ duration: 0.3 }}
        >
          <InlineForm toggleItem={toggleItem} handleDismiss={handleDismiss} />
        </motion.div>
      )}
    </div>
  );
};

export default CreateHabitForm;
