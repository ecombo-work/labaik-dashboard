import React, { forwardRef, JSX } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./skeleton";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-xl text-muted-foreground",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      multilineCode:
        "relative rounded bg-muted p-4 font-mono text-sm font-semibold overflow-x-auto",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      quote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
      title:
        "mb-4 text-xl font-medium leading-tight tracking-tighter md:text-2xl lg:text-3xl",
    },
  },
});

type TypographyVariant = VariantProps<typeof typographyVariants>;

type CustomProps = {
  is_loading?: boolean;
  children?: React.ReactNode;
};

type HTMLTag = keyof JSX.IntrinsicElements;

const createComponent = <T extends HTMLTag>(
  tag: T,
  variant: TypographyVariant["variant"],
  displayName: string
) => {
  const Component = forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & CustomProps
  >(({ className, is_loading, children, ...props }, ref) => {
    const Tag = tag as any;

    return (
      <Tag
        {...props}
        ref={ref as any}
        className={cn(typographyVariants({ variant }), className)}
      >
        {is_loading ? <Skeleton className="w-full h-6" /> : children}
      </Tag>
    );
  });

  Component.displayName = displayName;
  return Component as React.FC<React.HTMLAttributes<HTMLElement> & CustomProps>;
};
export const Title = createComponent("h2", "title", "Title");
export const H1 = createComponent("h1", "h1", "H1");
export const H2 = createComponent("h2", "h2", "H2");
export const H3 = createComponent("h3", "h3", "H3");
export const H4 = createComponent("h4", "h4", "H4");
export const Lead = createComponent("p", "lead", "Lead");
export const P = createComponent("p", "p", "P");
export const Large = createComponent("div", "large", "Large");
export const Small = createComponent("p", "small", "Small");
export const Muted = createComponent("span", "muted", "Muted");
export const InlineCode = createComponent("code", "inlineCode", "InlineCode");
export const MultilineCode = createComponent(
  "pre",
  "multilineCode",
  "MultilineCode"
);
export const List = createComponent("ul", "list", "List");
export const Quote = createComponent("blockquote", "quote", "Quote");
