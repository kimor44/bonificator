"use client";

import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/features/form/SubmitButton";
import { Trash } from "lucide-react";
import { deleteLeagueAction } from "../new/league.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { DeleteLeagueSchemaType } from "../new/league.schema";
import { useRouter } from "next/navigation";

export type TDeleteLeagueButton = {
  leagueId: string;
};

const DeleteLeagueButton = (props: TDeleteLeagueButton) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (leagueId: DeleteLeagueSchemaType["leagueId"]) => {
      // waiting 2 seconds
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      const deletedLeague = await deleteLeagueAction({ leagueId: leagueId });

      toast.success(`${deletedLeague?.data} League deleted succesfully`);

      router.refresh();
    },
  });
  return (
    <LoadingButton
      className={`${buttonVariants({ size: "sm", variant: "secondary" })}`}
      onClick={() => mutation.mutate(props.leagueId)}
      loading={mutation.isPending}
    >
      <Trash />
    </LoadingButton>
  );
};
export { DeleteLeagueButton };
