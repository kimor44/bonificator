import { z } from "zod";

export const CountryDeleteSchema = z.object({
  countryId: z.string(),
});

export type CountryDeleteSchemaType = z.infer<typeof CountryDeleteSchema>;
