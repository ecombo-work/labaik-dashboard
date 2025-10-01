"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";

type DateRange = {
  from?: Date;
  to?: Date;
};

type UpdateParamsInput = Record<
  string,
  string | Date | DateRange | undefined | null
>;

export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (data: UpdateParamsInput) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(data).forEach(([key, value]) => {
        if (!value) {
          // remove empty/undefined/null values
          params.delete(key);
          return;
        }

        // Handle DateRange (e.g., filters)
        if (value && typeof value === "object" && "from" in value) {
          const { from, to } = value as DateRange;
          if (from) params.set("from", from.toISOString());
          else params.delete("from");
          if (to) params.set("to", to.toISOString());
          else params.delete("to");
          return;
        }

        // Handle single Date
        if (value instanceof Date) {
          params.set(key, value.toISOString());
          return;
        }

        // Handle string values
        if (typeof value === "string" && value.trim() !== "") {
          params.set(key, value.trim());
        } else {
          params.delete(key);
        }
      });

      window.history.pushState(null, "", `?${params.toString()}`);
    },
    [searchParams]
  );

  const resetParams = useCallback(
    (keepKeys: string[] = []) => {
      const params = new URLSearchParams();
      keepKeys.forEach((key) => {
        const existing = searchParams.get(key);
        if (existing) params.set(key, existing);
      });
      window.history.pushState(null, "", `?${params.toString()}`);
    },
    [searchParams]
  );

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()) as Record<string, string>,
    [searchParams]
  );

  const getParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  return { updateParams, resetParams, queryParams, getParams };
};
