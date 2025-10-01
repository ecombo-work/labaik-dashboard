"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";
const accountSearchSchema = z.object({
  account_id: z.string().optional(),
  account_name: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function AccountSearchForm() {
  const defaults = {
    account_id: "",
    account_name: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={accountSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
    //   custom_grid="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    //   col_end="col-span-1 lg:col-span-3 col-end-3 md:col-end-4 lg:col-end-3 "
      fields={[
        { type: "text", name: "account_id" },
        { type: "text", name: "account_name" },
        {
          type: "dateRange",
          name: "date_range",
          align: "end",
          placeholder: "date_range",
        },
      ]}
    />
  );
}
