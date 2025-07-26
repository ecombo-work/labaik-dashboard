"use client"
import { Binance } from "@/interfaces/withdrawal";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

function BinanceDetails({ withdrawal }: { withdrawal: Binance }) {
  const t = useTranslations("withdrawal_details.binance");
  const form = useForm({
    defaultValues: withdrawal,
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Controller
          name="account_id"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>{t("account_id")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="link"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>{t("link")}</FormLabel>
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

export default BinanceDetails;
