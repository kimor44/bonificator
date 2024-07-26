"use client";

import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/features/form/SubmitButton";
import { createCountryAction } from "./country.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const AddAllCountriesButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      await createCountryAction();

      toast.success("Countries created successfully");
    },
  });
  return (
    <LoadingButton
      loading={mutation.isPending}
      className={`${buttonVariants({ size: "sm" })} cursor-pointer`}
      onClick={() => mutation.mutate()}
    >
      Create all countries
    </LoadingButton>
  );
};
