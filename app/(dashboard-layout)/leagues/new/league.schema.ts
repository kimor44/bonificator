import { z } from "zod";

export const newLeagueFormSchema = z.object({
  country: z.string(),
});

export type newLeagueFormSchemaType = z.infer<typeof newLeagueFormSchema>;

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

export const leaguesArraySchema = z.array(leagueSchema);

export type LeagueSchemaType = z.infer<typeof leagueSchema>;
