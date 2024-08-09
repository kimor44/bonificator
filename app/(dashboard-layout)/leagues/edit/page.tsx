import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { getLeagues } from "../new/league.action";
import type { TLeaguesByCountries } from "../new/league.schema";
import { EditLeaguesTable } from "./EditLeaguesTable";

export default async function RoutePage(props: PageParams<{}>) {
  const countries: TLeaguesByCountries = await getLeagues();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit leagues</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <EditLeaguesTable countries={countries} />
      </LayoutContent>
    </Layout>
  );
}
