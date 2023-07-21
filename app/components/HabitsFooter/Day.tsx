import { motion } from "framer-motion"

type Props = {
  id: number
  dayOfWeek: string
  dateOfWeek: number
  isActive: boolean
  onClick: (id: number) => void
  isComplete: boolean
  isIncluded: boolean
}

const Day = ({
  id,
  dayOfWeek,
  dateOfWeek,
  isActive,
  onClick,
  isComplete,
  isIncluded,
}: Props) => {
  return (
    <button
      type="button"
      onClick={() => isIncluded && onClick(id)}
      disabled={!isIncluded}
      key={id}
      className={`flex flex-col justify-center items-center gap-1 text-xs ${
        isIncluded ? "text-text" : "text-gray-400 cursor-not-allowed"
      }`}
    >
      {isComplete ? (
        <div
          className={`flex w-8 h-8 rounded-full bg-title border-2 border-neutral justify-center items-center`}
        >
          {/* should have some fun with this, ie ❤️ */}
          <p>✓</p>
        </div>
      ) : (
        <div
          className={`flex w-8 h-8 rounded-full bg-nav_bg border-2 border-neutral justify-center items-center`}
        >
          <p>{dateOfWeek}</p>
        </div>
      )}
      <p className="text-xs text-text">{dayOfWeek}</p>
      {isActive ? (
        <motion.div
          className="bg-shadow h-[2px] w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
          style={{ originX: 0.5 }}
        ></motion.div>
      ) : (
        <div className="h-[2px]"></div>
      )}
    </button>
  )
}

export default Day
