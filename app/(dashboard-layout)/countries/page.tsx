import { buttonVariants } from "@/components/ui/button";
import {
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import { sortBy } from "@/lib/sortBy";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  let countries = await prisma.country.findMany();
  countries = sortBy(countries, "name");

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Countries</LayoutTitle>
        <LayoutActions>
          <Link
            className={buttonVariants({ size: "sm" })}
            href="countries/manage"
          >
            Manage
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Flag</TableHead>
              <TableHead>Code</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
