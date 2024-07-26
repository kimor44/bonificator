"use client";

import { LoadingButton } from "@/features/form/SubmitButton";
import { Trash } from "lucide-react";
import { deleteCountryAction } from "./country.action";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export type TDeleteCountryButton = {
  countryId: string;
};

export const DeleteCountryButton = (props: TDeleteCountryButton) => {
  const mutation = useMutation({
    mutationFn: async (countryId: string) => {
      await deleteCountryAction(countryId);

      toast.success(`Country deleted successfully`);
    },
  });

  return (
    <LoadingButton
      loading={mutation.isPending}
      onClick={() => mutation.mutate(props.countryId)}
      className="bg- flex flex-row"
    >
      <Trash />
    </LoadingButton>
  );
};
