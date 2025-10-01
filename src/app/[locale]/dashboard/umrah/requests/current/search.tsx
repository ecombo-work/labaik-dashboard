"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";
import { UmrahStatus } from "@/constants/umrah";
// UmrahStatus
const umrahSearchSchema = z.object({
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
export default function UmrahSearchForm() {
  const defaults = {
    umrah_id: "",
    created_by: "",
    assigned_to: "",
    status: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={umrahSearchSchema}
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
            { value: "0", label: "umrah_status.0" },
            { value: "1", label: "umrah_status.1" },
            { value: "2", label: "umrah_status.2" },
            { value: "3", label: "umrah_status.3" },
            { value: "5", label: "umrah_status.5" },
            { value: "6", label: "umrah_status.6" },
            { value: "7", label: "umrah_status.7" },
            { value: "8", label: "umrah_status.8" },
            { value: "9", label: "umrah_status.9" },
            { value: "10", label: "umrah_status.10" },
            { value: "11", label: "umrah_status.11" },
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
