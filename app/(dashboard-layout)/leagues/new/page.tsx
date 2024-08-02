import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { SelectNewLeague } from "./SelectNewLeague";
import { getAllCountries } from "./league.action";

export default async function RoutePage(props: PageParams<{}>) {
  const countries = await getAllCountries();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>New Leagues</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <SelectNewLeague countries={countries} />
      </LayoutContent>
    </Layout>
  );
}
