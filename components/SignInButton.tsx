"use client"
import { useRouter } from "next/navigation"

const SignInButton = () => {
  const router = useRouter()

  // *** i don't like the flickering (on HabitMenubar, maybe do a useSWR or something)
  return (
    <button
      onClick={() => router.push("/sign-in")}
      className="bg-shadow text-xs z-40 font-semibold w-24 p-4 rounded-md h-8 mt-[2px] flex justify-center items-center shadow-md hover:bg-shadow_accent"
    >
      sign in
    </button>
  )
}

export default SignInButton
