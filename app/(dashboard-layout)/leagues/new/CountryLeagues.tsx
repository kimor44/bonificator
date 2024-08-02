"use client";

import type { LeagueSchemaType } from "./league.schema";

export type TCountryLeagues = {
  leagues: LeagueSchemaType[];
};

const CountryLeagues = (props: TCountryLeagues) => {
  return (
    <div>
      {props.leagues.map((league) => {
        return <div key={league.league.name}>{league.league.name}</div>;
      })}
    </div>
  );
};
export { CountryLeagues };
