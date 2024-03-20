"use server"

import { prisma } from "@/lib/prisma"
import { accountLinkValidator } from "@/lib/validators/accountLinkValidator"
import { auth } from "@clerk/nextjs"

export const createLink = async (newLink: unknown) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error("unauthorized")
  }

  const validateResult = accountLinkValidator.safeParse(newLink)
  if (!validateResult.success) {
    let errorMsg = ""

    validateResult.error.issues.forEach((issue) => {
      errorMsg = errorMsg + issue.path[0] + ": " + issue.message
    })

    return {
      error: errorMsg,
    }
  }

  const link = await prisma.linkingRequest.upsert({
    where: {
      unique_user_responderEmail: {
        requestorUserId: userId,
        responderEmail: validateResult.data.email,
      },
    },
    create: {
      requestorUserId: userId,
      responderEmail: validateResult.data.email,
      passcode: validateResult.data.passcode,
    },
    update: {
      passcode: validateResult.data.passcode,
    },
    select: {
      id: true, // Select only the necessary fields
    },
  })

  return link
}

export const submitLink = async (responderEmail: string, passcode: string) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("unauthorized")
  }

  const submit = await prisma.linkingRequest.findFirst({
    where: {
      responderEmail,
    },
  })
  if (!submit || submit.responderEmail !== responderEmail) {
    throw new Error("request not found or you're not the intended recipient")
  }
  if (submit.passcode !== passcode) {
    throw new Error("incorrect passcode")
  }

  await prisma.linkingRequest.update({
    where: {
      id: submit.id,
    },
    data: {
      responderUserId: userId,
    },
  })
  if (!!submit.requestorUserId) {
    await prisma.user.update({
      where: {
        userId: submit.requestorUserId,
      },
      data: {
        isAccountLinked: true,
        linkedUserId: submit.requestorUserId,
      },
    })
  }
}
