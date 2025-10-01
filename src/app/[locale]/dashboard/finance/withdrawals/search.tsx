"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";

const withdrawalsSearchSchema = z.object({
  withdrawal_id: z.string().optional(),
  performer: z.string().optional(),
  method: z.string().optional(),
  status: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function WithdrawalsSearchForm() {
  const defaults = {
    withdrawal_id: "",
    performer: "",
    method: "",
    status: "",
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={withdrawalsSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "withdrawal_id" },
        { type: "text", name: "performer" ,placeholder: "withdrawals.performer" },
        { type: "select", name: "method",placeholder: "withdrawals.method", options: [
            { value: "0", label: "withdrawals.methods.0" },
            { value: "1", label: "withdrawals.methods.1" },
            { value: "2", label: "withdrawals.methods.2" },
          ],
        },
        { type: "select", name: "status", placeholder: "withdrawals.status", options: [
            { value: "0", label: "withdrawals.withdrawal_status.0" },
            { value: "1", label: "withdrawals.withdrawal_status.1" },
            { value: "2", label: "withdrawals.withdrawal_status.2" },
          ],
        },
        { type: "dateRange", name: "date_range", align: "end", placeholder: "date_range" },
      ]}
    />
  );
}
