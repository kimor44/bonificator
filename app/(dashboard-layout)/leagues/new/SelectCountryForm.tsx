"use client";

import {
  useZodForm,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  selectCountryFormSchema,
  type SelectCountryFormSchema,
} from "./league.schema";
import { LoadingButton } from "@/features/form/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getCountryLeagues } from "./league.action";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TSelectNewLeague } from "./SelectNewLeague";
import type { LeagueSchemaType } from "./league.schema";
import { LayoutContent } from "@/features/page/layout";

export type LeagueFormProps = {
  defaultValues: SelectCountryFormSchema;
  countries: TSelectNewLeague["countries"];
  handleLeagues: (leagues: LeagueSchemaType[]) => void;
  handleCountry: (name: string) => void;
};

export const SelectCountryForm = (props: LeagueFormProps) => {
  const countries = [...props.countries];

  const form = useZodForm({
    schema: selectCountryFormSchema,
    defaultValues: props.defaultValues,
  });

  const submitMutation = useMutation({
    mutationFn: async (values: SelectCountryFormSchema) => {
      const country: SelectCountryFormSchema["country"] = String(
        values.country,
      );

      props.handleCountry(country);
      const res = await getCountryLeagues({ country });

      if (!res?.data) {
        toast.error(res?.serverError);
        return;
      }
      const leagues: LeagueSchemaType[] = res.data;
      props.handleLeagues(leagues);
      toast.success("Leagues fetched successfully");
    },
  });

  return (
    <LayoutContent>
      <Form
        form={form}
        disabled={submitMutation.isPending}
        onSubmit={async (v) => submitMutation.mutate(v)}
      >
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-screen overflow-y-auto">
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.name}>
                      <span className="flex flex-row gap-4">
                        <img
                          src={country.flag}
                          width="20"
                          height="12"
                          alt={country.name}
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
        <LoadingButton
          loading={submitMutation.isPending}
          className={`${buttonVariants({ size: "sm" })} mt-6`}
          type="submit"
        >
          Get leagues
        </LoadingButton>
      </Form>
    </LayoutContent>
  );
};
