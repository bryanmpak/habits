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
      unique_user_partnerEmail: {
        userId: userId,
        partnerEmail: validateResult.data.email,
      },
    },
    create: {
      userId: userId,
      partnerEmail: validateResult.data.email,
      passcode: validateResult.data.passcode,
    },
    update: {
      passcode: validateResult.data.passcode,
    },
    select: {
      id: true,
    },
  })

  return link
}

export const submitLink = async (partnerEmail: string, passcode: string) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("unauthorized")
  }
  const linkingRequest = await prisma.linkingRequest.findFirst({
    where: {
      partnerEmail,
    },
    select: {
      id: true,
      userId: true,
      partnerEmail: true,
      passcode: true,
      partnerId: true,
    },
  })
  if (!linkingRequest || linkingRequest.partnerEmail !== partnerEmail) {
    throw new Error("request not found or you're not the intended recipient")
  }
  if (linkingRequest.passcode !== passcode) {
    throw new Error("incorrect passcode")
  }
  await prisma.linkingRequest.update({
    where: {
      id: linkingRequest.id,
    },
    data: {
      partnerId: userId,
    },
  })
  if (!!linkingRequest.partnerId) {
    await prisma.user.update({
      where: {
        userId: linkingRequest.partnerId,
      },
      data: {
        isAccountLinked: true,
        linkedUserId: linkingRequest.userId,
      },
    })

    await prisma.user.update({
      where: {
        userId: linkingRequest.userId,
      },
      data: {
        isAccountLinked: true,
        linkedUserId: linkingRequest.partnerId,
      },
    })
  }
}
