import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { getLeagues } from "./new/league.action";
import { LeaguesTable } from "./LeaguesTable";
import { Pen } from "lucide-react";

export default async function RoutePage(props: PageParams<{}>) {
  const countries = await getLeagues();

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Leagues</LayoutTitle>
        <LayoutActions className="flex gap-4">
          <Link
            className={buttonVariants({ size: "sm", variant: "link" })}
            href="/leagues/new"
          >
            Add new league
          </Link>
          <Link
            className={`${buttonVariants({ size: "sm" })} flex gap-4`}
            href="/leagues/edit"
          >
            <Pen /> Edit leagues
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <LeaguesTable countries={countries} />
      </LayoutContent>
    </Layout>
  );
}
