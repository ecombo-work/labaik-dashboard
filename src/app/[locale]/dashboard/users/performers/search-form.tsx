"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";

const performersSearchSchema = z.object({
  user_id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  //   is_active: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function PerformersSearchForm() {
  const defaults = {
    user_id: "",
    username: "",
    email: "",
    phone_number: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={performersSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "user_id" },
        { type: "text", name: "username" },
        { type: "text", name: "phone_number" },
        { type: "text", name: "email" },
        { type: "dateRange", name: "date_range", align: "start", placeholder: "date_range" },
      ]}
    />
  );
}
