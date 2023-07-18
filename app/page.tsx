import HabitButton from "./components/HabitButton/HabitButton"
import HabitsFooter from "./components/HabitsFooter/HabitsFooter"
import Menu from "./components/Menu/Menu"
import { useDate } from "./lib/useDate"

export default function Home() {
  useDate()
  return (
    <main className="min-h-full">
      <Menu />
      <HabitButton />

      <HabitsFooter />
    </main>
  )
}
