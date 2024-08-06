import { z } from "zod";

export const selectCountryFormSchema = z.object({
  country: z.string(),
});

export type SelectCountryFormSchema = z.infer<typeof selectCountryFormSchema>;

export const leagueSchema = z.object({
  league: z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    logo: z.string(),
  }),
  country: z.object({
    name: z.string(),
    code: z.string(),
    flag: z.string(),
  }),
  seasons: z.array(
    z.object({
      year: z.number(),
      start: z.string(),
      end: z.string(),
      current: z.boolean(),
      coverage: z.object({
        fixtures: z.object({
          events: z.boolean(),
          lineups: z.boolean(),
          statistics_fixtures: z.boolean(),
          statistics_players: z.boolean(),
        }),
        standings: z.boolean(),
        players: z.boolean(),
        top_scorers: z.boolean(),
        top_assists: z.boolean(),
        top_cards: z.boolean(),
        injuries: z.boolean(),
        predictions: z.boolean(),
        odds: z.boolean(),
      }),
    }),
  ),
});

export type LeagueSchemaType = z.infer<typeof leagueSchema>;

export const leaguesSchema = z.array(leagueSchema);

export type LeaguesSchemaType = z.infer<typeof leaguesSchema>;

export const filteredLeague = z.object({
  rapidId: z.string(),
  name: z.string(),
  type: z.string(),
  logo: z.string(),
  countryId: z.string(),
  seasons: z.array(z.number()),
});

export type FilteredLeagueType = z.infer<typeof filteredLeague>;

export const filteredLeaguesSchema = z.array(filteredLeague);

export type FilteredLeaguesSchemaType = z.infer<typeof filteredLeaguesSchema>;

export type TSelectedLeagues = {
  id: number;
  name: string;
  type: string;
  logo: string;
  countryId: number;
};

export const selectLeaguesFormSchema = z.object({
  leagues: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export type SelectLeaguesFormSchemaType = z.infer<
  typeof selectLeaguesFormSchema
>;
