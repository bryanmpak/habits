import { prisma } from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest) {
  return NextResponse.json({ message: "cool" })
}
