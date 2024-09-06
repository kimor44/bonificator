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
import type { SelectCountryFormSchema } from "./standing-new.schema";
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
import { buttonVariants } from "@/components/ui/button";
import { LoadingButton } from "@/features/form/SubmitButton";

export type TSelectCountryForm = {
  defaultValues: SelectCountryFormSchema;
  countries: TCountry[];
  handleCountry: (name: string) => void;
};

const SelectCountryForm = (props: TSelectCountryForm) => {
  const countries = [...props.countries];

  const submitMutation = useMutation({
    mutationFn: async (values: SelectCountryFormSchema) => {
      const country: SelectCountryFormSchema["country"] = String(
        values.country,
      );

      props.handleCountry(country);
    },
  });

  const form = useZodForm({
    schema: selectCountryFormSchema,
    defaultValues: props.defaultValues,
  });

  return (
    <LayoutContent>
      <Form
        form={form}
        disabled={submitMutation.isPending}
        onSubmit={(v) => submitMutation.mutate(v)}
      >
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                {" "}
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
        <LoadingButton
          loading={submitMutation.isPending}
          className={`${buttonVariants({ size: "sm" })} mt-6`}
          type="submit"
        >
          Select
        </LoadingButton>
      </Form>
    </LayoutContent>
  );
};
export { SelectCountryForm };
