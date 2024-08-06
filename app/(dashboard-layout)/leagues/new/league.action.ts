"use server";

import { adminAuthAction } from "@/lib/backend/safe-actions";
import { rapidApiCall } from "@/lib/rapid-api/rapid-api-call";
import { SLUGS } from "@/lib/rapid-api/slugs";
import { leaguesSchema, selectCountryFormSchema } from "./league.schema";
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
