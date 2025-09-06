"use client";
import React from "react";
import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { CalendarDatePicker } from "../date-range";
import { startOfMonth, endOfMonth } from "date-fns";
function ReportsHeader() {
  const t = useTranslations("breadcrumb");
  const pathname = usePathname();
  const current = pathname.split("/").pop()!;
  const month_start = startOfMonth(new Date());
  const month_end = endOfMonth(new Date());
  const form = useForm({
    defaultValues: {
      date_range: { from: month_start, to: month_end },
    },
  });
  const onSubmit = (data: { date_range: { from: Date; to: Date } }) => {
    const params = new URLSearchParams(window.location.search);
    params.set("from", data.date_range.from.toISOString());
    params.set("to", data.date_range.to.toISOString());
    window.history.replaceState(null, "", `?${params.toString()}`);
  };
  return (
    <section className="flex justify-between items-center gap-4 my-4">
      <Title className="mb-0">{t(current)}</Title>
      <Form {...form}>
        <form
          className="bg-white rounded-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="date_range"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <CalendarDatePicker
                    date={field.value}
                    onDateSelect={field.onChange}
                    onSave={() => form.handleSubmit(onSubmit)()}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}

export default ReportsHeader;
