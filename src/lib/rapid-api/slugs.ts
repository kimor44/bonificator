export const SLUGS = {
  countries: "countries",
  seasons: "leagues/seasons",
  leaguesByCountryName: (country: string) => `leagues?country=${country}`,
};
