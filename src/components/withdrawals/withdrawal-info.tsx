"use client";
import React from "react";
import { WithdrawalBaseInfo } from "@/interfaces/withdrawal";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { withdrawalMethodToString } from "../data-table/reuseable";
import { formatPrice } from "@/lib/utils/price-utils";
import { useDirLang } from "@/hooks/use-dir-lang";
import { formatDate } from "@/lib/utils/date-utils";
import { Separator } from "../ui/separator";

function WithdrawalInfo({ withdrawal }: { withdrawal: WithdrawalBaseInfo }) {
  const t = useTranslations("withdrawal_details.info");
  const { dir } = useDirLang();
  const withdrawalMethod = withdrawalMethodToString(withdrawal.method);
  const withdrawalMethodKey = t(withdrawalMethod);
  const price = formatPrice(withdrawal.amount, {
    isRTL: dir === "rtl",
    price_with_currency: true,
  });
  const form = useForm({
    defaultValues: {
      ...withdrawal,
      amount: price as string,
      method: withdrawalMethodKey,
      created_at: formatDate(withdrawal.created_at),
    },
  });
  return (
    <Form {...form}>
      <form className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 ">
        <Controller
          name="amount"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("amount")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="method"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("method")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="transaction_ref"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("transaction_ref")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="created_at"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("created_at")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="note"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-6">
              <FormLabel>{t("note")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
      <Separator />
    </Form>
  );
}

export default WithdrawalInfo;
