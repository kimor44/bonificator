"use server";

import { prisma } from "../prisma";

export const checkCallApisRemaining = async () => {
  const callApisRemaining = await getCallApisRemaining();

  if (!callApisRemaining || callApisRemaining === 0) {
    throw new Error("No remaining requests");
  }

  return true;
};

export const getCallApisRemaining = async () => {
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
    return 0;
  }

  return response.count;
};
