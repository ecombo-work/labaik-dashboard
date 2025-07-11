"use client";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
type DateRange = {
  from?: Date;
  to?: Date;
};

type UpdateParamsInput = Record<string, string | DateRange | undefined>;

export const useUrlSearchParams = () => {
  const searchParams = useSearchParams();
  const updateParams = useCallback((data: UpdateParamsInput) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(data).forEach(([key, value]) => {
      if (key === "date" && value && typeof value === "object") {
        const { from, to } = value;
        if (from) params.set("from", from.toISOString());
        if (to) params.set("to", to.toISOString());
      } else if (typeof value === "string" && value.trim() !== "") {
        params.set(key, value);
      }
    });

    window.history.pushState(null, "", `?${params.toString()}`);
  }, []);
  const resetParams = useCallback(() => {
    const params = new URLSearchParams();
    window.history.pushState(null, "", `?${params.toString()}`);
  }, []);
  const getParams = new URLSearchParams(searchParams.toString());
  const queryParams = searchParams
    ? Object.fromEntries(searchParams.entries())
    : {};
  return { updateParams, resetParams, queryParams, getParams };
};
