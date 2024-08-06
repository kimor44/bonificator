"use client";

import { LayoutContent } from "@/features/page/layout";
import type { SelectLeaguesFormSchemaType } from "./league.schema";
import {
  selectLeaguesFormSchema,
  type LeagueSchemaType,
} from "./league.schema";
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
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/features/form/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

export type TCountryLeagues = {
  leagues: LeagueSchemaType[];
};

const SelectLeaguesForm = (props: TCountryLeagues) => {
  const form = useZodForm({
    schema: selectLeaguesFormSchema,
    defaultValues: { leagues: [] },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: SelectLeaguesFormSchemaType) => {
      const sourceLeagues = props.leagues.filter((league) =>
        values.leagues.includes(league.league.id),
      );
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
                            checked={field.value.includes(league.league.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    league.league.id,
                                  ])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== league.league.id,
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
