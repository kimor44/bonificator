"use client";

import { useState } from "react";
import { SelectCountryForm } from "./SelectCountryForm";
import { SelectLeaguesForm } from "./SelectLeaguesForm";
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
  const [countryId, setCountryId] = useState<string>("");

  const handleSetLeagues = (leagues: LeagueSchemaType[]) => {
    setLeagues(leagues);
  };

  const handleCountryId = (id: string) => {
    setCountryId(id);
  };

  return (
    <>
      <SelectCountryForm
        defaultValues={{ country: "" }}
        countries={props.countries}
        handleLeagues={handleSetLeagues}
        handleCountryId={handleCountryId}
      />

      {leagues.length > 0 ? (
        <SelectLeaguesForm leagues={leagues} countryId={countryId} />
      ) : null}
    </>
  );
};
