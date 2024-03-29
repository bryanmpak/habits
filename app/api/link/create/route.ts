// import { getAuthSession } from "@/lib/auth"
// import { prisma } from "@/lib/prisma"
// import { NextRequest } from "next/server"

// export async function POST(req: NextRequest) {
//   const session = await getAuthSession()
//   if (!session?.user) {
//     return new Response("Unauthorized", { status: 403 })
//   }

//   try {
//     const userId = session.user.id
//     const body = await req.json()
//     const { email, secretQuestion, secretAnswer } = body

//     const emailLookup = await prisma.user.findFirst({
//       where: { email: email },
//     })
//     if (!emailLookup) {
//       return new Response("Invalid credentials", { status: 400 })
//     }

//     // *** for now, until i figure out hashing
//     const secretAnswerHash = secretAnswer

//     await prisma.linkingRequest.create({
//       data: {
//         requestorId: userId,
//         responderEmail: email,
//         secretQuestion,
//         secretAnswerHash,
//         expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         linkType: "SECRET_QUESTION",
//       },
//     })

//     return new Response("OK", { status: 200 })
//   } catch (error) {
//     return new Response("Something went wrong", { status: 400 })
//   }
// }
