"use client";

import { LoadingButton } from "@/features/form/SubmitButton";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteSeasonAction } from "./season.action";

export type TDeleteSeasonButton = {
  seasonId: string;
};

export const DeleteSeasonButton = (props: TDeleteSeasonButton) => {
  const mutation = useMutation({
    mutationFn: async (seasonId: string) => {
      await deleteSeasonAction(seasonId);

      toast.success(`Season deleted successfully`);
    },
  });

  return (
    <LoadingButton
      loading={mutation.isPending}
      onClick={() => mutation.mutate(props.seasonId)}
      className="bg- flex flex-row"
    >
      <Trash />
    </LoadingButton>
  );
};
