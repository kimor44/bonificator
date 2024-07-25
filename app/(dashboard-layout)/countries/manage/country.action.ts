"use server";

import { prisma } from "@/lib/prisma";
import { rapidApiCall } from "@/lib/rapid-api/rapid-api-call";
import { SLUGS } from "@/lib/rapid-api/slugs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCountryAction = async () => {
  const response = await rapidApiCall(SLUGS.countries);

  const countries = await response.response;

  for (const country of countries) {
    if (!country.flag || !country.name || !country.code) {
      continue;
    } else {
      await prisma.country.upsert({
        where: {
          code: country.code,
        },
        update: {
          flag: country.flag,
          name: country.name,
        },
        create: {
          name: country.name,
          code: country.code,
          flag: country.flag,
        },
      });
    }
  }

  revalidatePath("/countries");
  redirect("/countries");
};
