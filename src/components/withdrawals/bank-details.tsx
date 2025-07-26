"use client";
import { BankAccount } from "@/interfaces/withdrawal";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { getCountryName } from "@/lib/utils/country-name";
import { useDirLang } from "@/hooks/use-dir-lang";

function BankDetails({ withdrawal }: { withdrawal: BankAccount }) {
  const t = useTranslations("withdrawal_details.bank");
  const { lang } = useDirLang();
  const form = useForm({
    defaultValues: { ...withdrawal,
        bank_country: getCountryName(withdrawal.bank_country,lang)!
    },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 ">
        <Controller
          name="account_holder_name"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("holder_name")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="account_number"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("account_number")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="bank_name"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("bank_name")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="bank_country"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>{t("bank_country")}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
          name="iban"
          control={form.control}
          disabled
          render={({ field }) => (
            <FormItem className="col-span-4 lg:col-span-6">
              <FormLabel>{t("iban")}</FormLabel>
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

export default BankDetails;
