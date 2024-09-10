export const SLUGS = {
  countries: "countries",
  seasons: "leagues/seasons",
  leaguesByCountryName: (country: string) => `leagues?country=${country}`,
  standingByLeagueId: (leagueId: string, year: string) =>
    `standings?league=${leagueId}&season=${year}`,
};
