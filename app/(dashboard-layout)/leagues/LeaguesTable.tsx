"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TLeaguesByCountries } from "./new/league.schema";

export type TLeaguesTable = {
  countries: TLeaguesByCountries;
};

const LeaguesTable = (props: TLeaguesTable) => {
  return (
    <Accordion type="single" collapsible={true} className="w-full">
      {props.countries.map((country) => (
        <AccordionItem key={country.id} value={country.name}>
          <AccordionTrigger>
            <img src={country.flag} width="30" height="20" alt={country.name} />{" "}
            <span className="uppercase">{country.name}</span>
          </AccordionTrigger>
          {country.leagues.map((league) => (
            <AccordionContent
              key={league.id}
              className="px-11 md:w-9/12 lg:w-8/12 2xl:w-5/12"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={league.name}>
                  <AccordionTrigger className="font-normal">
                    {" "}
                    <img
                      src={league.logo || "https://placehold.co/80x50"}
                      width="20"
                      height="20"
                      alt={league.name}
                    />
                    {league.name}
                  </AccordionTrigger>
                  {league.seasons.map((season) => (
                    <AccordionContent key={season.seasonId} className="pl-10">
                      {season.season.year}
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export { LeaguesTable };
