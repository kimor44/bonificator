import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import {
  selectSeasonFormSchema,
  type TSeasonsFromLeagueId,
} from "./standing-new.schema";
import { LayoutContent } from "@/features/page/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TSelectSeasonForm = {
  seasons: TSeasonsFromLeagueId;
  defaultValues: { seasonId: string };
  handleSeason: (seasonId: string) => void;
};

const SelectSeasonForm = (props: TSelectSeasonForm) => {
  const seasons = [...props.seasons];

  const submitMutation = useMutation({
    mutationFn: async (values: { seasonId: string }) => {
      props.handleSeason(values.seasonId);
    },
  });

  const form = useZodForm({
    schema: selectSeasonFormSchema,
    defaultValues: props.defaultValues,
  });

  const handleSubmitOnChange = (seasonId: string) => {
    form.setValue("seasonId", seasonId);
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
          name="seasonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season</FormLabel>
              <Select
                onValueChange={(value) => handleSubmitOnChange(value)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a season" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.id} value={season.id}>
                      {season.year}
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
export { SelectSeasonForm };
