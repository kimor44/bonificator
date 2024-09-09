import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import type { SelectLeagueFormSchema } from "./standing-new.schema";
import {
  selectLeagueFormSchema,
  type TLeaguesFromCountryId,
  type TSeasonsFromLeagueId,
} from "./standing-new.schema";
import { useMutation } from "@tanstack/react-query";
import { getSeasonsByLeagueId } from "./standing-new.action";
import { LayoutContent } from "@/features/page/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FLAG_PLACEHOLDER } from "@/lib/constants";
import { toast } from "sonner";

export type TSelectLeagueForm = {
  defaultValues: SelectLeagueFormSchema;
  leagues: TLeaguesFromCountryId;
  handleSeasons: (seasons: TSeasonsFromLeagueId) => void;
  handleLeagueRapidId: (rapidId: string) => void;
  handleYear: (year: string) => void;
};

const SelectLeagueForm = (props: TSelectLeagueForm) => {
  const leagues = [...props.leagues];
  const submitMutation = useMutation({
    mutationFn: async (values: SelectLeagueFormSchema) => {
      const leagueId: SelectLeagueFormSchema["leagueId"] = String(
        values.leagueId,
      );

      const leagueRapidId = leagues.find((l) => l.id === leagueId);

      if (!leagueRapidId) {
        toast.error("League not found");
        throw new Error("League not found");
      }

      props.handleLeagueRapidId(leagueRapidId.rapidId);
      props.handleYear("");
      props.handleSeasons([]);

      const seasons: TSeasonsFromLeagueId =
        await getSeasonsByLeagueId(leagueId);

      props.handleSeasons(seasons);
    },
  });

  const form = useZodForm({
    schema: selectLeagueFormSchema,
    defaultValues: props.defaultValues,
  });

  const handleSubmitOnChange = (leagueId: string) => {
    form.setValue("leagueId", leagueId);
    form.handleSubmit((v) => submitMutation.mutate(v))();
  };

  return (
    <LayoutContent>
      <Form
        form={form}
        onSubmit={(v) => submitMutation.mutate(v)}
        disabled={submitMutation.isPending}
      >
        <FormField
          control={form.control}
          name="leagueId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>League</FormLabel>
              <Select
                onValueChange={(value) => handleSubmitOnChange(value)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a league" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leagues.map((league) => (
                    <SelectItem key={league.id} value={league.id}>
                      <span className="flex flex-row gap-4">
                        <img
                          src={league.logo || FLAG_PLACEHOLDER}
                          alt={league.name}
                          width={20}
                          height={12}
                        />
                        {league.name}
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
export { SelectLeagueForm };
