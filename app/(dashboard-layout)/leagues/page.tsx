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

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Leagues</LayoutTitle>
        <LayoutActions>
          <Link className={buttonVariants({ size: "sm" })} href="/leagues/new">
            Add new league
          </Link>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cupiditate
        eum officia quos blanditiis vel consequatur maiores aliquid deleniti
        enim, cum voluptatum, assumenda molestiae. Veritatis a magnam commodi
        vero unde? Iste velit facere nemo fuga nostrum deserunt consectetur
        assumenda officia, iusto porro ab! Nemo aut mollitia ipsum adipisci
        reprehenderit fugiat ratione reiciendis error dolor exercitationem
        consequuntur quod, minima sapiente a. Doloribus ab consectetur fuga
        delectus asperiores fugit repellat voluptates commodi error nostrum,
        odio voluptatibus earum sint in optio veniam quaerat. Consectetur
        deleniti voluptates enim ab, fugit suscipit ducimus laboriosam optio.
      </LayoutContent>
    </Layout>
  );
}
