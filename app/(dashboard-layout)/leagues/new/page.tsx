import {
  Layout,
  LayoutActions,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { SelectNewLeague } from "./SelectNewLeague";
import { getAllCountries } from "./league.action";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function RoutePage(props: PageParams<{}>) {
  const countries = await getAllCountries();

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>New Leagues</LayoutTitle>
        <LayoutActions>
          <Link className={buttonVariants({ size: "sm" })} href="/leagues">
            Leagues
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <SelectNewLeague countries={countries} />
    </Layout>
  );
}
