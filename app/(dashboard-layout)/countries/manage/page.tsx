import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import { AddAllCountriesButton } from "./AddAllCountriesButton";
import { DeleteCountryButton } from "./DeleteCountryButton";
import { sortBy } from "@/lib/sortBy";

export default async function RoutePage(props: PageParams<{}>) {
  let countries = await prisma.country.findMany();
  countries = sortBy(countries, "name");

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Manage countries</LayoutTitle>
        <LayoutActions>
          <AddAllCountriesButton />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Flag</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.name}</TableCell>
                <TableCell>
                  <img
                    width={40}
                    height={25}
                    src={country.flag}
                    alt={`${country.name} flag`}
                  />
                </TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>
                  <DeleteCountryButton countryId={country.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
