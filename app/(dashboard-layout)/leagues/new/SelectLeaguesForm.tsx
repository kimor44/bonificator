"use client";

import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { LoadingButton } from "@/features/form/SubmitButton";
import { LayoutContent } from "@/features/page/layout";
import { useMutation } from "@tanstack/react-query";
import { createLeagueAction } from "./league.action";
import type {
  FilteredLeaguesSchemaType,
  SelectLeaguesFormSchemaType,
} from "./league.schema";
import {
  selectLeaguesFormSchema,
  type LeagueSchemaType,
} from "./league.schema";
import { toast } from "sonner";

export type TCountryLeagues = {
  leagues: LeagueSchemaType[];
  countryId: string;
};

const SelectLeaguesForm = (props: TCountryLeagues) => {
  const form = useZodForm({
    schema: selectLeaguesFormSchema,
    defaultValues: { leagues: [] },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: SelectLeaguesFormSchemaType) => {
      const clonedLeagues = [...props.leagues];
      const sourceLeagues: FilteredLeaguesSchemaType = clonedLeagues
        .filter((league) => values.leagues.includes(league.league.name))
        .map((league) => {
          return {
            rapidId: String(league.league.id),
            name: league.league.name,
            type: league.league.type,
            logo: league.league.logo,
            countryId: props.countryId,
            seasons: league.seasons.map((season) => season.year),
          };
        });

      const res = await createLeagueAction(sourceLeagues);

      if (!res?.data) {
        toast.error(res?.serverError);
        return;
      }

      toast.success(`Leagues registered successfully`);
    },
  });

  return (
    <LayoutContent>
      <Form form={form} onSubmit={async (v) => submitMutation.mutate(v)}>
        <FormField
          control={form.control}
          name="leagues"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Leagues</FormLabel>
                <FormDescription>
                  Select the leagues you want to register.
                </FormDescription>
              </div>
              {props.leagues.map((league) => (
                <FormField
                  key={league.league.id}
                  control={form.control}
                  name="leagues"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={league.league.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(league.league.name)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    league.league.name,
                                  ])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== league.league.name,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {league.league.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          className={`${buttonVariants({ size: "sm" })} mt-12`}
          disabled={submitMutation.isPending}
          type="submit"
        >
          Register leagues
        </LoadingButton>
      </Form>
    </LayoutContent>
  );
};
export { SelectLeaguesForm };
