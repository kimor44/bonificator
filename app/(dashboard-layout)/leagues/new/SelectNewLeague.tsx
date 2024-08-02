"use client";

import { useState } from "react";
import { LeagueForm } from "./LeagueForm";
import { CountryLeagues } from "./CountryLeagues";
import type { LeagueSchemaType } from "./league.schema";

type TCountriesSelect = {
  id: string;
  name: string;
  code: string;
  flag: string;
};

export type TSelectNewLeague = {
  countries: TCountriesSelect[];
};

export const SelectNewLeague = async (props: TSelectNewLeague) => {
  const [leagues, setLeagues] = useState<LeagueSchemaType[]>([]);

  const handleSetLeagues = (leagues: LeagueSchemaType[]) => {
    setLeagues(leagues);
  };

  return (
    <>
      <LeagueForm
        defaultValues={{ country: "" }}
        countries={props.countries}
        handleLeagues={handleSetLeagues}
      />

      {leagues.length > 0 ? <CountryLeagues leagues={leagues} /> : null}
    </>
  );
};
