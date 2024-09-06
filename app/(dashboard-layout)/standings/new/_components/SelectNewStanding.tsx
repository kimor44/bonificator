"use client";

import { useState } from "react";
import { SelectCountryForm } from "./SelectCountryForm";
import type {
  TLeaguesFromCountryId,
  TSeasonsFromLeagueId,
} from "./standing-new.schema";
import { SelectLeagueForm } from "./SelectLeagueForm";
import { SelectSeasonForm } from "./SelectSeasonForm";
import { LayoutContent } from "@/features/page/layout";

export type TCountry = {
  id: string;
  name: string;
  flag: string;
};

export type TSelectCountryForm = {
  countries: TCountry[];
};

export const SelectNewStanding = ({ countries }: TSelectCountryForm) => {
  const [leagues, setLeagues] = useState<TLeaguesFromCountryId>([]);
  const [seasons, setSeasons] = useState<TSeasonsFromLeagueId>([]);
  const [year, setYear] = useState<string>();

  const handleLeagues = (leagues: TLeaguesFromCountryId) => {
    setLeagues(leagues);
  };

  const handleSeasons = (seasons: TSeasonsFromLeagueId) => {
    setSeasons(seasons);
  };

  const handleYear = (year: string) => {
    setYear(year);
  };

  return (
    <LayoutContent>
      <SelectCountryForm
        countries={countries}
        defaultValues={{ countryId: "" }}
        handleLeagues={handleLeagues}
        handleSeasons={handleSeasons}
      />
      {leagues.length > 0 && (
        <SelectLeagueForm
          leagues={leagues}
          handleSeasons={handleSeasons}
          defaultValues={{ leagueId: "" }}
        />
      )}
      {leagues.length > 0 && seasons.length > 0 && (
        <SelectSeasonForm
          seasons={seasons}
          defaultValues={{ seasonId: "" }}
          handleSeason={handleYear}
        />
      )}
    </LayoutContent>
  );
};
