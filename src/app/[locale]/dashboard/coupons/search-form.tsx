"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";

const couponsSearchSchema = z.object({
  coupon_id: z.string().optional(),
  code: z.string().optional(),
  discount_type: z.string().optional(),
  is_active: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function CouponsSearchForm() {
  const defaults = {
    coupon_id: "",
    code: "",
    discount_type: "",
    is_active: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={couponsSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "coupon_id" },
        { type: "text", name: "code" },
        {
          type: "select",
          name: "discount_type",
          options: [
            { value: "1", label: "fixed" },
            { value: "0", label: "percent" },
          ],
        },
        {
          type: "select",
          name: "is_active",
          options: [
            { value: "1", label: "active" },
            { value: "0", label: "inactive" },
          ],
        },
        { type: "dateRange", name: "date_range", align: "end", placeholder: "date_range" },
      ]}
    />
  );
}
