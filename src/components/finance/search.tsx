"use client";
import React from "react";
import { z } from "zod";
import GenerateForm from "@/components/generate-form";
const transactionSearchSchema = z.object({
  transaction_id: z.string().optional(),
  received_at: z.date().optional(),
  term: z.string().optional(),
  account: z.string().optional(),
  date_range: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
});
export default function TransactionSearchForm() {
  const defaults = {
    transaction_id: "",
    term: "",
    account: "",
    received_at: undefined,
    date_range: { from: undefined, to: undefined },
  };
  return (
    <GenerateForm
      schema={transactionSearchSchema}
      namespace="search_form"
      defaultValues={defaults}
      fields={[
        { type: "text", name: "transaction_id" },
        { type: "text", name: "term", placeholder: "transactions.term" },
        { type: "text", name: "account", placeholder: "transactions.account" },
        {
          type: "single_date_picker",
          name: "received_at",
          placeholder: "transactions.receive_date",
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
