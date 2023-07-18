import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

type Props = {
  id: number
  dayOfWeek: string
  dateOfWeek: number
  isActive: boolean
  onClick: Dispatch<SetStateAction<number>>
}

const Day = ({ id, dayOfWeek, dateOfWeek, isActive, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      key={id}
      className="flex flex-col justify-center items-center gap-1 text-xs text-[#bebebe]"
    >
      <div
        className={`flex w-8 h-8 rounded-full bg-black border-2 border-zinc-800 justify-center items-center`}
      >
        <p className="">{dateOfWeek}</p>
      </div>
      <p className="text-xs text-[#bebebe]">{dayOfWeek}</p>
      {isActive ? (
        <motion.div
          className="bg-yellow-500 h-[2px] w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.15 }}
          style={{ originX: 0.5 }}
        ></motion.div>
      ) : (
        <div className="h-[2px]"></div>
      )}
    </button>
  )
}

export default Day
