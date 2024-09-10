import { z } from "zod";

export const selectCountryFormSchema = z.object({
  countryId: z.string(),
});

export type SelectCountryFormSchema = z.infer<typeof selectCountryFormSchema>;

export const selectLeagueFormSchema = z.object({
  leagueId: z.string(),
});

export type SelectLeagueFormSchema = z.infer<typeof selectLeagueFormSchema>;

export type TLeaguesFromCountryId = {
  id: string;
  name: string;
  logo: string | null;
  type: string;
  rapidId: string;
}[];

export type TSeasonsFromLeagueId = {
  id: string;
  year: string;
}[];

export const selectSeasonFormSchema = z.object({
  seasonYear: z.string(),
});

export type SelectSeasonFormSchema = z.infer<typeof selectSeasonFormSchema>;

export const createStandingFormSchema = z.object({
  year: z.string(),
  leagueId: z.string(),
});

type TTeamFromRapidId = {
  id: string;
  name: string;
  logo: string | null;
};

type TGoals = {
  for: number;
  against: number;
};

type TResults = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: TGoals;
};

export type TStandingFromRapidId = {
  rank: number;
  team: TTeamFromRapidId;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: TResults;
  home: TResults;
  away: TResults;
  update: string;
};

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
