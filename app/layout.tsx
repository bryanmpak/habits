import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NextAuthProvider } from "../components/SessionProvider";

import HabitMenubar from "../components/HabitMenubar";
import { HabitsContext } from "../components/HabitsContext";
import { cookies } from "next/headers";
import ThemeProvider from "@/components/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

import ModalProvider from "@/components/Modals/modal-provider";
import { Toaster } from "@/components/ui/Sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "habits",
  description: "stay hard ♥️",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const savedTheme = cookies().get("color-theme");

  const theme = savedTheme?.value || "dark";
  const customBg =
    theme === "light"
      ? "bg-gradient-to-t from-rose-200 via-rose-200 to-rose-300"
      : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black";

  const { userId } = auth();
  const user: User | null = userId
    ? await prisma.user.findFirst({ where: { userId } })
    : null;

  return (
    <html lang="en" data-color-theme={theme} suppressHydrationWarning>
      <body className={`${inter.className} ${customBg}`}>
        <div className="min-h-full flex flex-col">
          <ClerkProvider>
            <ThemeProvider>
              <HabitsContext>
                <HabitMenubar user={user} />
                <ModalProvider />
                {children}
              </HabitsContext>
            </ThemeProvider>
          </ClerkProvider>
          <Toaster richColors duration={1500} />
        </div>
      </body>
    </html>
  );
}
