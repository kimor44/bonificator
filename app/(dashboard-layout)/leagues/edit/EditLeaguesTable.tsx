import type { TLeaguesByCountries } from "../new/league.schema";

export type TEditLeaguesTable = {
  countries: TLeaguesByCountries;
};

const EditLeaguesTable = (props: TEditLeaguesTable) => {
  return <h1>Edit league table</h1>;
};
export { EditLeaguesTable };
