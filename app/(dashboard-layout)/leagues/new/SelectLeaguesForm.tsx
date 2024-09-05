"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { LayoutActions, LayoutContent } from "@/features/page/layout";
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
import { useRouter } from "next/navigation";

export type TCountryLeagues = {
  leagues: LeagueSchemaType[];
  countryName: string;
  handleLeagues: (leagues: LeagueSchemaType[]) => void;
};

const SelectLeaguesForm = (props: TCountryLeagues) => {
  const router = useRouter();

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
            countryName: props.countryName,
            seasons: league.seasons.map((season) => season.year),
          };
        });

      const res = await createLeagueAction(sourceLeagues);

      if (!res?.data) {
        toast.error(res?.serverError);
        return;
      }

      toast.success(`Leagues registered successfully`);
      router.push("/leagues");
      router.refresh();
    },
  });

  return (
    <LayoutContent>
      <Form
        form={form}
        onSubmit={async (v) => submitMutation.mutate(v)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="leagues"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Leagues of {props.countryName}
                </FormLabel>
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
                        className="flex h-10 flex-row items-center space-x-3 space-y-0"
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
                        <FormLabel className="flex items-center gap-4 text-sm font-normal">
                          <img
                            width={20}
                            height={20}
                            src={league.league.logo}
                            alt={league.league.name}
                          />{" "}
                          {league.league.name} ({league.league.type})
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
        <LayoutActions className="flex gap-6">
          <LoadingButton
            className={`${buttonVariants({ size: "sm" })}`}
            loading={submitMutation.isPending}
            type="submit"
          >
            Register leagues
          </LoadingButton>
          <Button variant="secondary" onClick={() => props.handleLeagues([])}>
            Cancel
          </Button>
        </LayoutActions>
      </Form>
    </LayoutContent>
  );
};
export { SelectLeaguesForm };
