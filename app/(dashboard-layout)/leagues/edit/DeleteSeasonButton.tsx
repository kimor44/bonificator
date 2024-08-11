"use client";

import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/features/form/SubmitButton";
import { Trash } from "lucide-react";
import { deleteSeasonAction } from "../new/league.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { DeleteSeasonSchemaType } from "../new/league.schema";
import { useRouter } from "next/navigation";
import { waiting } from "@/lib/utils";

export type TDeleteSeasonButton = DeleteSeasonSchemaType;

const DeleteSeasonButton = (props: TDeleteSeasonButton) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ seasonId, leagueId }: DeleteSeasonSchemaType) => {
      await waiting(500);

      const deleteSeason = await deleteSeasonAction({
        seasonId,
        leagueId,
      });

      if (!deleteSeason?.data) {
        toast.error(`Season hasn't been deleted due to some problem`);
        return;
      }

      const { season, league } = deleteSeason.data;

      toast.success(
        `The ${season.year} season of the "${league.name}" league has been successfully deleted`,
      );

      router.refresh();
    },
  });
  return (
    <LoadingButton
      className={`${buttonVariants({ size: "sm", variant: "secondary" })}`}
      onClick={() =>
        mutation.mutate({ seasonId: props.seasonId, leagueId: props.leagueId })
      }
      loading={mutation.isPending}
    >
      <Trash />
    </LoadingButton>
  );
};
export { DeleteSeasonButton };
