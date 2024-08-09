import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TLeaguesByCountries } from "../new/league.schema";
import { DeleteLeagueButton } from "./DeleteLeagueButton";

export type TEditLeaguesTable = {
  countries: TLeaguesByCountries;
};

const EditLeaguesTable = (props: TEditLeaguesTable) => {
  return (
    <Accordion type="single" collapsible>
      {props.countries.map((country) => (
        <AccordionItem key={country.id} value={country.name}>
          <AccordionTrigger>
            <img src={country.flag} width="30" height="20" alt={country.name} />{" "}
            <span className="uppercase">{country.name}</span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-6 pl-10">
            {country.leagues.map((league) => (
              <div
                key={league.id}
                className="flex max-h-20 items-center justify-between"
              >
                <img
                  src={league.logo || "https://placeholder"}
                  alt={league.name}
                  width="30"
                  height="20"
                />
                {league.name}
                <DeleteLeagueButton leagueId={league.id} />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export { EditLeaguesTable };
