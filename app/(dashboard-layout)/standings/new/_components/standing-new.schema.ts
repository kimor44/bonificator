import { z } from "zod";

export const selectCountryFormSchema = z.object({
  country: z.string(),
});

export type SelectCountryFormSchema = z.infer<typeof selectCountryFormSchema>;

// export const StandingFormSchema = z.object({
//   seasonId: z.string(),
//   rank: z.number().int(),
//   teamId: z.string(),
//   points: z.number().int(),
//   goalsDiff: z.number().int(),
//   played: z.number().int(),
//   win: z.number().int(),
//   draw: z.number().int(),
//   lose: z.number().int(),
//   for: z.number().int(),
//   against: z.number().int(),
//   form: z.string().optional(),
// });

// export type StandingFormSchemaType = z.infer<typeof StandingFormSchema>;
