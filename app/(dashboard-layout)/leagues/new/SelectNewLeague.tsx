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
  const [countryName, setCountryName] = useState<string>("");

  const handleLeagues = (leagues: LeagueSchemaType[]) => {
    setLeagues(leagues);
  };

  const handleCountry = (name: string) => {
    setCountryName(name);
  };

  return (
    <>
      {leagues.length === 0 ? (
        <SelectCountryForm
          defaultValues={{ country: "" }}
          countries={props.countries}
          handleLeagues={handleLeagues}
          handleCountry={handleCountry}
        />
      ) : (
        <SelectLeaguesForm
          leagues={leagues}
          countryName={countryName}
          handleLeagues={handleLeagues}
        />
      )}
    </>
  );
};
