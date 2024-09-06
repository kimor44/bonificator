"use client";

import { useState } from "react";
import { SelectCountryForm } from "./SelectCountryForm";

export type TCountry = {
  id: string;
  name: string;
  flag: string;
};

export type TSelectCountryForm = {
  countries: TCountry[];
};

export const SelectNewStanding = ({ countries }: TSelectCountryForm) => {
  const [countryId, setCountryId] = useState<string>("");

  const handleCountry = (id: string) => {
    setCountryId(id);
  };

  return (
    <>
      <SelectCountryForm
        countries={countries}
        defaultValues={{ country: "" }}
        handleCountry={handleCountry}
      />
      {countryId ? countryId : <></>}
    </>
  );
};
