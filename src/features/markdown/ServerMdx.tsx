import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import { ErrorBoundary } from "../../components/utils/ErrorBoundaries";
import { rehypePlugins, remarkPlugins } from "./markdown.config";
import { Alert } from "@/components/ui/alert";

export type ServerMdxProps = {
  source: string;
  className?: string;
};

// * If you want to add custom component, such as an "EmailForm", you can add it to the MdxComponent object.
const MdxComponent = {
  Alert: Alert,
} satisfies Record<string, React.ComponentType>;

export const ServerMdx = (props: ServerMdxProps) => {
  return (
    <ErrorBoundary>
      <div className={cn("prose dark:prose-invert", props.className)}>
        <Suspense fallback={<Loader />}>
          <RenderMdx {...props} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

const RenderMdx = (props: ServerMdxProps) => {
  return (
    <MDXRemote
      source={props.source}
      components={MdxComponent}
      options={{
        mdxOptions: {
          remarkPlugins: remarkPlugins,
          rehypePlugins: rehypePlugins,
          format: "mdx",
        },
      }}
    />
  );
};
