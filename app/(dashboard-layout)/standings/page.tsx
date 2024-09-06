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
      <LayoutHeader>
        <LayoutTitle>Standings</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <Link href="standings/new" className={buttonVariants({ size: "sm" })}>
          New standing
        </Link>
      </LayoutActions>
      <LayoutContent>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo reiciendis
        repellendus dolores at velit nemo ipsam sint inventore beatae tempore et
        incidunt expedita nobis, itaque laborum consequuntur. Quas,
        necessitatibus tempora.
      </LayoutContent>
    </Layout>
  );
}
