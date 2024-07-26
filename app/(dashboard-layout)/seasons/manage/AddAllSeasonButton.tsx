"use client";

import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/features/form/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSeasonAction } from "./season.action";

export const AddAllSeasonsButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      await createSeasonAction();

      toast.success("Seasons created successfully");
    },
  });
  return (
    <LoadingButton
      loading={mutation.isPending}
      className={`${buttonVariants({ size: "sm" })} cursor-pointer`}
      onClick={() => mutation.mutate()}
    >
      Create all seasons
    </LoadingButton>
  );
};
