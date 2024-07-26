import { buttonVariants } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
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
  let seasons = await prisma.season.findMany();
  seasons = sortBy(seasons, "year");

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Seasons</LayoutTitle>
        <LayoutActions>
          <Link
            className={buttonVariants({ size: "sm" })}
            href="/seasons/manage"
          >
            Manage
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seasons.map((season) => (
              <TableRow key={season.id}>
                <TableCell>{season.id}</TableCell>
                <TableCell>{season.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
