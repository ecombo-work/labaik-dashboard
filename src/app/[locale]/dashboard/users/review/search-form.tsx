"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";
import { UserVerificationStatus } from "@/constants/user.constants";

const reviewSearchSchema = z.object({
  user_id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  is_active: z.string().optional(),
  verification_status: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function ReviewSearchForm() {
  const defaults = {
    user_id: "",
    username: "",
    email: "",
    phone_number: "",
    is_active: "",
    verification_status: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={reviewSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "user_id" },
        { type: "text", name: "username" },
        { type: "text", name: "phone_number" },
        { type: "text", name: "email" },
        { type: "dateRange", name: "date_range", align: "end", placeholder: "date_range" },
        {
          type: "select",
          name: "is_active",
          options: [
            { value: "1", label: "active" },
            { value: "0", label: "inactive" },
          ],
        },
        {
          type: "select",
          name: "verification_status",
          options: [
            { value: "0", label: "no_verification_uploaded" },
            { value: "1", label: "pending" },
            { value: "2", label: "verified" },
            { value: "3", label: "rejected" },
          ],
        },
      ]}
    />
  );
}
