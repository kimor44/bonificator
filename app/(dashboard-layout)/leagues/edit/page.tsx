import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { getLeagues } from "../new/league.action";
import type { TLeaguesByCountries } from "../new/league.schema";
import { EditLeaguesTable } from "./EditLeaguesTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function RoutePage(props: PageParams<{}>) {
  const countries: TLeaguesByCountries = await getLeagues();

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Edit leagues</LayoutTitle>
        <LayoutActions>
          <Link
            className={buttonVariants({ size: "sm", variant: "secondary" })}
            href="/leagues"
          >
            <span>Leagues</span>
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <EditLeaguesTable countries={countries} />
      </LayoutContent>
    </Layout>
  );
}
