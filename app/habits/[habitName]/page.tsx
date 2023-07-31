import HabitButton from "@/app/components/HabitButton/HabitButton"
import HabitsFooter from "@/app/components/HabitsFooter/HabitsFooter"
import Menu from "@/app/components/Nav/Menu"
import { getAuthSession } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

interface PageProps {
  params: {
    slug: string
  }
}

// populate the components with data points
// refactor 1: replace all state values with DB returned values
// refactor 2: if performance is slow, figure out a way to map in state where necessary

const page = async ({ params }: PageProps) => {
  const { slug } = params
  // const session = getAuthSession()

  // using this slug, GET all data points to populate this page from mongodb
  const habit = await prisma.habit.findFirst({
    where: { habitName: slug },
    include: {
      completions: true,
    },
  })
  console.log("From the habits/habitName", habit)

  // // from this
  // const { setHabits, activeHabit, setActiveHabit } = useContext(Context)
  // // to this (don't need setHabits or setActiveHabit)
  // const activeHabit = {
  //   habitName: habit?.habitName,
  //   habitCompletions: habit.completions,
  // }

  // // from this
  // const [activeId, setActiveId] = useState(
  //   activeHabit.completions.findIndex((day) => day.isActive)
  // )
  // // to some version of this
  // const now = new Date()
  // const currentDay = now.getDay()
  // const activeId = currentDay

  // const handleComplete = (isComplete: boolean, id: number) => {
  //   if (isComplete) {
  //     // update this:
  //     setActiveHabit((prevHabit) => {
  //       const updatedHabit = {
  //         ...prevHabit,
  //         completions: prevHabit.completions.map((day, i) =>
  //           i === activeId ? { ...day, isComplete } : day
  //         ),
  //       }

  //     // to an UPDATE on habit db

  //       // can get rid of this
  //       setHabits((prevHabits) =>
  //         prevHabits.map((habit) =>
  //           habit.habitName === updatedHabit.habitName ? updatedHabit : habit
  //         )
  //       )

  //       return updatedHabit
  //     })
  //   }
  // }

  // return (
  //   <main className="min-h-full relative">
  //     <Menu />
  //     {/* <HabitMenubar /> */}
  //     <HabitButton
  //     // activeHabit={activeHabit}
  //     // activeId={activeId}
  //     // onComplete={(isComplete) => handleComplete(isComplete, activeId)}
  //     />
  //     <HabitsFooter
  //     // activeHabit={activeHabit} onDayClick={setActiveId}
  //     />
  //   </main>
  // )
}

export default page
