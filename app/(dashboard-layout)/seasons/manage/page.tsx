import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { prisma } from "@/lib/prisma";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { AddAllSeasonsButton } from "./AddAllSeasonButton";
import { sortBy } from "@/lib/sortBy";
import { DeleteSeasonButton } from "./DeleteSeasonButton";

export default async function RoutePage(props: PageParams<{}>) {
  let seasons = await prisma.season.findMany();
  seasons = sortBy(seasons, "year");

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Manage seasons</LayoutTitle>
        <LayoutActions>
          <AddAllSeasonsButton />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seasons.map((season) => (
              <TableRow key={season.id}>
                <TableCell>{season.id}</TableCell>
                <TableCell>{season.year}</TableCell>
                <TableCell>
                  <DeleteSeasonButton seasonId={season.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
