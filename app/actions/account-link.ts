"use server";

import { prisma } from "@/lib/prisma";
import { accountLinkValidator } from "@/lib/validators/accountLinkValidator";
import { auth } from "@clerk/nextjs/server";

export const createLink = async (newLink: unknown) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  const validateResult = accountLinkValidator.safeParse(newLink);
  if (!validateResult.success) {
    let errorMsg = "";

    validateResult.error.issues.forEach((issue) => {
      errorMsg = errorMsg + issue.path[0] + ": " + issue.message;
    });

    return {
      error: errorMsg,
    };
  }

  const link = await prisma.accountLink.upsert({
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
  });

  return link;
};

export const submitLink = async (partnerEmail: string, passcode: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthorized");
  }
  const accountLink = await prisma.accountLink.findFirst({
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
  });
  if (!accountLink || accountLink.partnerEmail !== partnerEmail) {
    throw new Error("request not found or you're not the intended recipient");
  }
  if (accountLink.passcode !== passcode) {
    throw new Error("incorrect passcode");
  }
  await prisma.accountLink.update({
    where: {
      id: accountLink.id,
    },
    data: {
      partnerId: userId,
    },
  });
  if (!!accountLink.partnerId) {
    await prisma.user.update({
      where: {
        userId: accountLink.partnerId,
      },
      data: {
        isAccountLinked: true,
        linkedUserId: accountLink.userId,
      },
    });

    await prisma.user.update({
      where: {
        userId: accountLink.userId,
      },
      data: {
        isAccountLinked: true,
        linkedUserId: accountLink.partnerId,
      },
    });
  }
};
