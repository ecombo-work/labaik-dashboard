"use client";
import { PayPal } from "@/interfaces/withdrawal";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

function PayPalDetails({ withdrawal }: { withdrawal: PayPal }) {
  const t = useTranslations("withdrawal_details.paypal");
  const form = useForm({
    defaultValues: withdrawal,
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Controller
          name="paypal_email"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="paypal_id"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>{t("id")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default PayPalDetails;
