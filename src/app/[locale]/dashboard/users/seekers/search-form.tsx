"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";

const seekersSearchSchema = z.object({
  user_id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  is_active: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function SeekersSearchForm() {
  const defaults = {
    user_id: "",
    username: "",
    email: "",
    phone_number: "",
    is_active: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={seekersSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "user_id" },
        { type: "text", name: "username" },
        { type: "text", name: "email" },
        { type: "text", name: "phone_number" },
        { type: "dateRange", name: "date_range", align: "start", placeholder: "date_range" },
        {
          type: "select",
          name: "is_active",
          options: [
            { value: "1", label: "active" },
            { value: "0", label: "inactive" },
          ],
        },
      ]}
    />
  );
}
