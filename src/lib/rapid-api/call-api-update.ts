import { prisma } from "../prisma";

export const callApiUpdate = async (remaining: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const currentDay = await prisma.callApi.findFirst({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  if (currentDay) {
    await prisma.callApi.update({
      where: {
        id: currentDay.id,
      },
      data: {
        count: remaining,
      },
    });
  } else {
    await prisma.callApi.create({
      data: {
        count: remaining,
      },
    });
  }
};
