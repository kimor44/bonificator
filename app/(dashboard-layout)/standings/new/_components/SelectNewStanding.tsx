"use client";

import { useState } from "react";
import { SelectCountryForm } from "./SelectCountryForm";
import type {
  TLeaguesFromCountryId,
  TSeasonsFromLeagueId,
} from "./standing-new.schema";
import { SelectLeagueForm } from "./SelectLeagueForm";

export type TCountry = {
  id: string;
  name: string;
  flag: string;
};

export type TSelectCountryForm = {
  countries: TCountry[];
};

export const SelectNewStanding = ({ countries }: TSelectCountryForm) => {
  const [countryId, setCountryId] = useState<string>("");
  const [leagues, setLeagues] = useState<TLeaguesFromCountryId>([]);
  const [seasons, setSeasons] = useState<TSeasonsFromLeagueId>([]);

  const handleCountry = (id: string) => {
    setCountryId(id);
  };

  const handleLeagues = (leagues: TLeaguesFromCountryId) => {
    setLeagues(leagues);
  };

  const handleSeasons = (seasons: TSeasonsFromLeagueId) => {
    setSeasons(seasons);
  };

  return (
    <>
      <SelectCountryForm
        countries={countries}
        defaultValues={{ countryId: "" }}
        handleCountry={handleCountry}
        handleLeagues={handleLeagues}
      />
      {leagues.length > 0 && (
        <SelectLeagueForm
          leagues={leagues}
          handleSeasons={handleSeasons}
          defaultValues={{ leagueId: "" }}
        />
      )}
    </>
  );
};
