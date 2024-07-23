import { CircleSvg } from "@/components/svg/CircleSvg";
import { Typography } from "../../components/ui/typography";

export const HeroBonifcator = () => {
  return (
    <main className="relative m-auto my-12 flex min-h-[400px] w-full max-w-7xl items-center gap-4 px-8 max-lg:flex-col">
      <div className="relative flex flex-1 flex-col items-start gap-4 lg:gap-6 xl:gap-8">
        <Typography variant="h1" className="!leading-tight">
          Get your championship's ranking.{" "}
          <span className="inline-block -rotate-2 bg-foreground text-background">
            See it{" "}
            <span className="relative inline-block">
              <span>bonified</span>
              <CircleSvg className="fill-primary" />
            </span>
          </span>
        </Typography>
        <Typography variant="large">
          Built to see, compare and rank your championship with bonificating
          system.
        </Typography>
      </div>
      <div className="flex flex-1 justify-end">
        <img
          src="https://dummyimage.com/600x400/000/fff"
          className="max-w-lg object-contain max-md:max-w-md"
          alt="Hero images"
        />
      </div>
    </main>
  );
};
