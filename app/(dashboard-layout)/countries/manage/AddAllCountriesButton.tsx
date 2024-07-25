"use client";

import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/features/form/SubmitButton";
import { createCountryAction } from "./country.action";

export const AddAllCountriesButton = () => {
  return (
    <LoadingButton
      className={`${buttonVariants({ size: "sm" })} cursor-pointer`}
      onClick={async () => createCountryAction()}
    >
      Create all countries
    </LoadingButton>
  );
};
