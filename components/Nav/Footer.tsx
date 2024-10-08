import { useClerk, useUser } from "@clerk/nextjs";
import React, { useContext } from "react";
import { Context } from "../HabitsContext";
import { Cycle } from "framer-motion";

type FooterProps = {
  toggleOpen: Cycle;
};

const Footer = ({ toggleOpen }: FooterProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { clearHabitData } = useContext(Context);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
    clearHabitData();
    toggleOpen();
  };

  return (
    <div className="w-full text-white mt-auto">
      <div className="w-full h-[1px] bg-dark"></div>
      <div className="flex items-center p-4 gap-4">
        <img
          className="rounded-full border-2 border-text w-12 h-12"
          src={user.imageUrl as string}
          alt="profile picture"
        />

        <div className="flex flex-col justify-center items-center gap-1">
          <p className="lowercase text-sm">{user.fullName}</p>

          <button
            className="rounded-md text-sm border border-dark py-2 px-4 hover:bg-destructive"
            onClick={handleSignOut}
          >
            log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
