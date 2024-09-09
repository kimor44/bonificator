"use server";

import { prisma } from "@/lib/prisma";

export const getCountriesByLeagues = async () => {
  const countries = await prisma.country.findMany({
    where: {
      leagues: {
        some: {},
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

export const getLeaguesByCountryId = async (countryId: string) => {
  const leagues = await prisma.league.findMany({
    where: {
      countryId,
    },
    select: {
      id: true,
      name: true,
      logo: true,
      type: true,
      rapidId: true,
    },
  });

  return leagues;
};

export const getSeasonsByLeagueId = async (leagueId: string) => {
  const seasons = await prisma.season.findMany({
    where: {
      leagues: {
        some: {
          leagueId,
        },
      },
    },
    select: {
      id: true,
      year: true,
    },
    orderBy: {
      year: "desc",
    },
  });

  return seasons;
};
