import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingButton } from "@/features/form/SubmitButton";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import { Trash } from "lucide-react";
import { AddAllCountriesButton } from "./AddAllCountriesButton";

export default async function RoutePage(props: PageParams<{}>) {
  const countries = await prisma.country.findMany();
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
            <TableHead>Name</TableHead>
            <TableHead>Flag</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Actions</TableHead>
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
                  <LoadingButton>
                    Delete <Trash />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
