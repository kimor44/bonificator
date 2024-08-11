"use server";

import { ActionError, adminAuthAction } from "@/lib/backend/safe-actions";
import { rapidApiCall } from "@/lib/rapid-api/rapid-api-call";
import { SLUGS } from "@/lib/rapid-api/slugs";
import type { FilteredLeaguesSchemaType } from "./league.schema";
import {
  deleteLeagueSchema,
  deleteSeasonSchema,
  filteredLeaguesSchema,
  leaguesSchema,
  selectCountryFormSchema,
} from "./league.schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const getCountryLeagues = adminAuthAction
  .schema(selectCountryFormSchema)
  .action(async ({ parsedInput: { country } }) => {
    const leagues = await rapidApiCall(SLUGS.leaguesByCountryName(country));

    try {
      const parsedLeagues = leaguesSchema.parse(leagues.response);

      if (parsedLeagues.length === 0) {
        throw new Error("No leagues found for this country");
      }

      return parsedLeagues;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation failed: ${error.issues[0]}`);
      } else {
        throw new Error("Unexpected error: ");
      }
    }
  });

export const getAllCountries = async () => {
  const countries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      flag: true,
    },
  });

  return countries;
};

export const createLeagueAction = adminAuthAction
  .schema(filteredLeaguesSchema)
  .action(async ({ parsedInput }) => {
    const parsedLeagues: FilteredLeaguesSchemaType =
      filteredLeaguesSchema.parse(parsedInput);

    for (const league of parsedLeagues) {
      const seasonsLeague = league.seasons.map((sea) => {
        return {
          season: {
            connect: {
              year: String(sea),
            },
          },
        };
      });
      const leagueData = {
        rapidId: league.rapidId,
        name: league.name,
        type: league.type,
        logo: league.logo,
        country: { connect: { name: league.countryName } },
        seasons: {
          create: seasonsLeague,
        },
      };

      await prisma.league.create({
        data: leagueData,
      });
    }

    return true;
  });

export const getLeagueIds = async () => {
  const leagueIds = await prisma.league.findMany({
    select: {
      id: true,
    },
  });

  return leagueIds;
};

export const getLeagues = async () => {
  const leagues = await prisma.country.findMany({
    where: {
      leagues: {
        some: {}, // Cette condition assure que seuls les pays avec des ligues sont inclus
      },
    },
    include: {
      leagues: {
        include: {
          seasons: {
            include: {
              season: true,
            },
          },
        },
      },
    },
  });

  return leagues;
};

export const deleteLeagueAction = adminAuthAction
  .schema(deleteLeagueSchema)
  .action(async ({ parsedInput }) => {
    try {
      const deletedLeague = await prisma.league.delete({
        where: {
          id: parsedInput.leagueId,
        },
      });

      return deletedLeague.name;
    } catch (err) {
      throw new ActionError(
        `League hasn't been deleted du some probleme ${err}}`,
      );
    }
  });

export const deleteSeasonAction = adminAuthAction
  .schema(deleteSeasonSchema)
  .action(async ({ parsedInput }) => {
    const { leagueId, seasonId } = deleteSeasonSchema.parse(parsedInput);
    try {
      const deletedSeason = await prisma.leagueSeason.delete({
        where: {
          leagueId_seasonId: {
            leagueId,
            seasonId,
          },
        },
        select: {
          season: true,
          league: true,
        },
      });

      return deletedSeason;
    } catch (err) {
      throw new ActionError(
        `Season hasn't been deleted du some probleme ${err}}`,
      );
    }
  });
