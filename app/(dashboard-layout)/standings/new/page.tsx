import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { getCountriesByLeagues } from "./_components/standing-new.action";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { SelectNewStanding } from "./_components/SelectNewStanding";

export default async function RoutePage(props: PageParams<{}>) {
  const countries = await getCountriesByLeagues();

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>New Standing</LayoutTitle>
        <LayoutActions>
          <Link href="/standings" className={buttonVariants({ size: "sm" })}>
            Standings
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <SelectNewStanding countries={countries} />
      </LayoutContent>
    </Layout>
  );
}
