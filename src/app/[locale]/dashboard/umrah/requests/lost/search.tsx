"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";
const lostUmrahSearchSchema = z.object({
  umrah_id: z.string().optional(),
  created_by: z.string().optional(),
  assigned_to: z.string().optional(),
  status: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function LostUmrahSearchForm() {
  const defaults = {
    umrah_id: "",
    created_by: "",
    assigned_to: "",
    status: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={lostUmrahSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "umrah_id" },
        { type: "text", name: "created_by" },
        { type: "text", name: "assigned_to" },
        {
          type: "select",
          name: "status",
          options: [
            { value: "4", label: "umrah_status.4" },
            { value: "13", label: "umrah_status.13" },
          ],
        },
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
