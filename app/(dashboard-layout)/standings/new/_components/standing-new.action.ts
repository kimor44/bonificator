import { prisma } from "@/lib/prisma";

export const getCountriesByLeagues = async () => {
  const countries = await prisma.country.findMany({
    where: {
      leagues: {
        some: {}, // Cette condition assure que seuls les pays avec des ligues sont inclus
      },
    },
    select: {
      id: true,
      name: true,
      flag: true,
    },
  });

  return countries;
};
