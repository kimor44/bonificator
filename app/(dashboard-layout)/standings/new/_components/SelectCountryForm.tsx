"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import type { TCountry } from "./SelectNewStanding";
import type {
  SelectCountryFormSchema,
  TLeaguesFromCountryId,
  TSeasonsFromLeagueId,
} from "./standing-new.schema";
import { selectCountryFormSchema } from "./standing-new.schema";
import { useMutation } from "@tanstack/react-query";
import { LayoutContent } from "@/features/page/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLeaguesByCountryId } from "./standing-new.action";

export type TSelectCountryForm = {
  defaultValues: SelectCountryFormSchema;
  countries: TCountry[];
  handleLeagues: (leagues: TLeaguesFromCountryId) => void;
  handleSeasons: (seasons: TSeasonsFromLeagueId) => void;
  handleYear: (year: string) => void;
};

const SelectCountryForm = (props: TSelectCountryForm) => {
  const countries = [...props.countries];

  const submitMutation = useMutation({
    mutationFn: async (values: SelectCountryFormSchema) => {
      const countryId: SelectCountryFormSchema["countryId"] = String(
        values.countryId,
      );

      const leagues: TLeaguesFromCountryId =
        await getLeaguesByCountryId(countryId);

      props.handleLeagues(leagues);
      props.handleSeasons([]);
      props.handleYear("");
    },
  });

  const form = useZodForm({
    schema: selectCountryFormSchema,
    defaultValues: props.defaultValues,
  });

  const handleSubmitOnChange = (countryId: string) => {
    form.setValue("countryId", countryId); // Mets à jour la valeur dans le formulaire
    form.handleSubmit((v) => submitMutation.mutate(v))(); // Soumet le formulaire automatiquement
  };

  return (
    <LayoutContent>
      <Form
        form={form}
        disabled={submitMutation.isPending}
        onSubmit={(v) => submitMutation.mutate(v)} // Cette soumission est maintenant manuelle mais utilisée pour le déclenchement auto
      >
        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={(value) => handleSubmitOnChange(value)} // Appel à la soumission au changement
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-screen overflow-y-auto">
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      <span className="flex flex-row gap-4">
                        <img
                          src={country.flag}
                          alt={`${country.name}'s flag`}
                          width={20}
                          height={12}
                        />
                        {country.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </Form>
    </LayoutContent>
  );
};
export { SelectCountryForm };
