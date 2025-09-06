"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer focus-visible:border-primary focus-visible:ring-ring/50 inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-primary transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary",
        "data-[state=unchecked]:bg-red-500",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full ring-0 transition-transform",
          "data-[state=checked]:!bg-green-500 dark:data-[state=checked]:!bg-green-800",
          "data-[state=unchecked]:bg-red-500 dark:data-[state=unchecked]:bg-red-800",
          "ltr:data-[state=checked]:translate-x-[21px]",
          "ltr:data-[state=unchecked]:translate-x-[2px]",
          "rtl:data-[state=checked]:-translate-x-[21px]",
          "rtl:data-[state=unchecked]:-translate-x-[2px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
