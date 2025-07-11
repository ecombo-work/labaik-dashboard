import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

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
      title: "mb-4 text-xl rtl:font-semibold ltr:font-medium leading-tight tracking-tighter md:text-2xl",
    },
  },
});

type TypographyVariant = VariantProps<typeof typographyVariants>;

const createComponent = <T extends HTMLElement>(
  tag: T["tagName"],
  variant: TypographyVariant["variant"],
  displayName: string
) => {
  const Component = forwardRef<T, React.HTMLAttributes<T>>(
    ({ className, ...props }, ref) => {
      return React.createElement(
        tag,
        {
          ...props,
          ref,
          className: cn(typographyVariants({ variant }), className),
        },
        props.children
      );
    }
  );

  Component.displayName = displayName;
  return Component;
};
export const Title = createComponent<HTMLHeadingElement>(
  "h2",
  "title",
  "Title"
);
export const H1 = createComponent<HTMLHeadingElement>("h1", "h1", "H1");
export const H2 = createComponent<HTMLHeadingElement>("h2", "h2", "H2");
export const H3 = createComponent<HTMLHeadingElement>("h3", "h3", "H3");
export const H4 = createComponent<HTMLHeadingElement>("h4", "h4", "H4");
export const Lead = createComponent<HTMLParagraphElement>("p", "lead", "Lead");
export const P = createComponent<HTMLParagraphElement>("p", "p", "P");
export const Large = createComponent<HTMLDivElement>("div", "large", "Large");
export const Small = createComponent<HTMLParagraphElement>(
  "p",
  "small",
  "Small"
);
export const Muted = createComponent<HTMLSpanElement>("span", "muted", "Muted");
export const InlineCode = createComponent<HTMLSpanElement>(
  "code",
  "inlineCode",
  "InlineCode"
);
export const MultilineCode = createComponent<HTMLPreElement>(
  "pre",
  "multilineCode",
  "MultilineCode"
);
export const List = createComponent<HTMLUListElement>("ul", "list", "List");
export const Quote = createComponent<HTMLQuoteElement>(
  "blockquote",
  "quote",
  "Quote"
);
