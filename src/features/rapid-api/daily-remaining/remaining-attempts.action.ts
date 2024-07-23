"use server";

import { prisma } from "@/lib/prisma";

export const remainingAttemptsAction = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const response = await prisma.callApi.findFirst({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    select: {
      count: true,
    },
  });

  if (!response) {
    return { attempts: 100 };
  }

  return { attempts: response.count };
};
