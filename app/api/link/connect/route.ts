// import { getAuthSession } from "@/lib/auth"
// import { prisma } from "@/lib/prisma"
// import { NextRequest } from "next/server"

// export async function GET(req: NextRequest) {
//   const session = await getAuthSession()
//   if (!session) {
//     return new Response("Unauthorized", { status: 403 })
//   }
//   const userEmail = session?.user.email as string

//   try {
//     const data = await prisma.linkingRequest.findFirst({
//       where: { responderEmail: userEmail },
//       select: { secretQuestion: true },
//     })

//     return new Response(JSON.stringify(data), { status: 200 })
//   } catch (error) {
//     return new Response(null, { status: 500 })
//   }
// }

// export async function POST(req: NextRequest) {
//   const session = await getAuthSession()
//   const userId = session?.user.id as string
//   const userEmail = session?.user.email as string

//   if (!session) {
//     return new Response("Unauthorized", { status: 403 })
//   }

//   try {
//     const body = await req.json()
//     const { answer } = body

//     // *** for now, need to figure out a hash solution
//     const hashedAnswer = answer

//     const request = await prisma.linkingRequest.findFirst({
//       where: { responderEmail: userEmail },
//     })

//     if (!request || request.responderEmail !== session?.user.email) {
//       return new Response(
//         "Request not found or you're not the intended recipient",
//         { status: 404 }
//       )
//     }

//     if (hashedAnswer !== request.secretAnswerHash) {
//       return new Response("Incorrect Answer", { status: 403 })
//     }

//     await prisma.user.update({
//       where: { id: userId },
//       data: { linkedUserId: request.requestorId },
//     })

//     await prisma.user.update({
//       where: { id: request.requestorId },
//       data: { linkedUserId: userId },
//     })

//     return new Response("Users linked successfully", { status: 200 })
//   } catch (error) {
//     return new Response("Something went wrong", { status: 400 })
//   }
// }
