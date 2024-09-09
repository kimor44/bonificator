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
import { ProviderConfirmationDialog } from "@/features/dialogs-provider/DialogProviderDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  const [leagueRapidId, setLeagueRapidId] = useState<string>();

  const router = useRouter();

  const handleLeagues = (leagues: TLeaguesFromCountryId) => {
    setLeagues(leagues);
  };

  const handleSeasons = (seasons: TSeasonsFromLeagueId) => {
    setSeasons(seasons);
  };

  const handleYear = (year: string) => {
    setYear(year);
  };

  const handleLeagueRapidId = (rapidId: string) => {
    setLeagueRapidId(rapidId);
  };

  const onConfirmNewStanding = () => {
    setLeagues([]);
    setSeasons([]);
    setYear("");
    toast.success("New standing created");
    router.push("/standings");
  };

  return (
    <>
      <LayoutContent>
        <SelectCountryForm
          countries={countries}
          defaultValues={{ countryId: "" }}
          handleLeagues={handleLeagues}
          handleSeasons={handleSeasons}
          handleYear={handleYear}
        />
        {leagues.length > 0 && (
          <SelectLeagueForm
            leagues={leagues}
            handleSeasons={handleSeasons}
            handleLeagueRapidId={handleLeagueRapidId}
            handleYear={handleYear}
            defaultValues={{ leagueId: "" }}
          />
        )}
        {leagues.length > 0 && seasons.length > 0 && (
          <SelectSeasonForm
            seasons={seasons}
            defaultValues={{ seasonYear: "" }}
            handleSeason={handleYear}
          />
        )}
      </LayoutContent>
      {year && leagueRapidId && (
        <ProviderConfirmationDialog
          title="Create new standing"
          action={{ label: "new standing", onClick: onConfirmNewStanding }}
          cancel={{
            label: "Cancel",
            onClick: () => {
              setYear("");
            },
          }}
          description={`Are you sure you want to create the ${leagues.find((l) => l.rapidId === leagueRapidId)?.name} ${year} season standings?`}
        />
      )}
    </>
  );
};
