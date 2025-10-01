"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  left_icon?: React.ReactNode;
  right_icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", left_icon, right_icon, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <input
          ref={ref}
          autoComplete="off"
          type={type}
          data-slot="input"
          className={cn(
            "flex h-9 w-full min-w-0",
            "text-lg md:text-sm",
            "bg-transparent dark:bg-input/30 rounded-lg border",
            "px-3 py-1",
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            "transition-[color,box-shadow] outline-none",
            "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-0",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "selection:bg-primary selection:text-primary-foreground",
            "shadow-none",

            left_icon && "ltr:pl-9 rtl:pr-9",
            right_icon && "ltr:pr-9 rtl:pl-9",
            className
          )}
          {...props}
        />
        {left_icon && (
          <div className="absolute ltr:left-2 rtl:right-2 top-1/2 -translate-y-1/2 flex-center">
            {left_icon}
          </div>
        )}
        {right_icon && (
          <div className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 flex-center">
            {right_icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
