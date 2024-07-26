"use server";

import { adminAuth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";
import { rapidApiCall } from "@/lib/rapid-api/rapid-api-call";
import { SLUGS } from "@/lib/rapid-api/slugs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const createSeasonAction = async () => {
  adminAuth();

  const response = await rapidApiCall(SLUGS.seasons);

  const seasons = await response.response;

  if (!seasons) {
    return;
  } else {
    seasons.forEach(async (season: string) => {
      const year = String(season);
      await prisma.season.upsert({
        where: {
          year: year,
        },
        update: {
          year: year,
        },
        create: {
          year: year,
        },
      });
    });
  }

  revalidatePath("/seasons");
  redirect("/seasons");
};

export const deleteSeasonAction = async (seasonId: string) => {
  adminAuth();

  try {
    await prisma.season.delete({
      where: {
        id: seasonId,
      },
    });

    revalidatePath("/seasons/manage");
    return true;
  } catch (error) {
    return NextResponse.json({ error: "Season not deleted" }, { status: 500 });
  }
};
