"use server";

import { ActionError, adminAuthAction } from "@/lib/backend/safe-actions";
import { prisma } from "@/lib/prisma";
import type { TStandingFromRapidId } from "./standing-new.schema";
import { createStandingFormSchema } from "./standing-new.schema";
import { rapidApiCall } from "@/lib/rapid-api/rapid-api-call";
import { SLUGS } from "@/lib/rapid-api/slugs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

const insertTeam = async (
  team: TStandingFromRapidId["team"],
  country: string,
) => {
  const rapidId = String(team.id);
  const existingTeam = await prisma.team.findFirst({
    where: {
      rapidId,
    },
  });

  if (existingTeam) {
    return;
  }

  await prisma.team.create({
    data: {
      rapidId,
      name: team.name,
      logo: team.logo,
      country: { connect: { name: country } },
    },
  });
};

export const createStandingAction = adminAuthAction
  .schema(createStandingFormSchema)
  .action(async ({ parsedInput }) => {
    const { leagueId, year } = createStandingFormSchema.parse(parsedInput);

    const existingStanding = await prisma.standing.findFirst({
      where: {
        leagueId: leagueId,
        year: year,
      },
    });

    if (existingStanding) {
      return false;
    }

    const call = await rapidApiCall(SLUGS.standingByLeagueId(leagueId, year));

    const response = await call.response;

    const [first] = response;

    const country = first.league.country;

    const standingTeams: TStandingFromRapidId[] = first.league.standings[0];

    const standingData = standingTeams.map((team: TStandingFromRapidId) => {
      insertTeam(team.team, country);

      return {
        teamId: String(team.team.id),
        leagueId: leagueId,
        rank: team.rank,
        year: year,
        played: team.all.played,
        win: team.all.win,
        draw: team.all.draw,
        lose: team.all.lose,
        for: team.all.goals.for,
        against: team.all.goals.against,
        goalsDiff: team.goalsDiff,
        points: team.points,
        form: team.form,
      };
    });

    try {
      await prisma.standing.createMany({
        data: standingData,
      });

      revalidatePath("/standings");
      redirect("/standings");
    } catch (error) {
      throw new ActionError("Error creating standing");
    }
  });
