"use client"
import { useAccountLink } from "@/lib/useAccountLink"
import { motion, useCycle } from "framer-motion"
import Link from "next/link"

const LinkButton = () => {
  // *** i don't like the flickering (on HabitMenubar, maybe do a useSWR or something)
  // const [isOpen, toggleOpen] = useCycle(false, true)
  // const variants = {
  //   open: { height: "auto" },
  //   closed: { height: 0 },
  // }
  const accountLink = useAccountLink()
  return (
    <button
      aria-label='link accounts'
      onClick={accountLink.onOpen}
      className='bg-shadow text-xs z-40 font-semibold w-24 p-4 rounded-md h-8 mt-[3px] flex justify-center items-center shadow-md hover:bg-shadow_accent'
    >
      link
    </button>
    // <div className='relative flex bg-shadow text-xs z-40 font-semibold w-28 py-4 px-2 rounded-md h-8 mt-[3px] items-center shadow-md hover:bg-shadow_accent'>
    //   <button aria-label="Link account" onClick={() => toggleOpen()} className='flex w-full'>
    //     <div className='flex-grow'>link</div>
    //     <motion.svg
    //       width='12'
    //       height='12'
    //       viewBox='0 0 20 20'
    //       initial={false}
    //       animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
    //       transition={{ duration: 0.2 }}
    //       style={{ originY: 0.55 }}
    //     >
    //       <path d='M0 7 L 20 7 L 10 16' />
    //     </motion.svg>
    //   </button>

    //   <motion.div
    //     className='absolute flex flex-col top-full left-0 w-full mt-2 gap-1 overflow-hidden bg-transparent text-center text-title font-sans z-10'
    //     variants={variants}
    //     initial='closed'
    //     animate={isOpen ? "open" : "closed"}
    //     transition={{ duration: 0.3 }}
    //   >
    //     <Link
    //       href='/create-link'
    //       className='hover:underline hover:decoration-shadow'
    //       onClick={() => toggleOpen()}
    //     >
    //       create link
    //     </Link>
    //     <Link
    //       href='/connect-link'
    //       className='hover:underline hover:decoration-shadow'
    //       onClick={() => toggleOpen()}
    //     >
    //       connect link
    //     </Link>
    //   </motion.div>
    // </div>
  )
}

export default LinkButton
