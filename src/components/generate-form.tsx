"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { z, ZodTypeAny } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDatePicker } from "@/components/date-range";
import { Button } from "@/components/ui/button";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { cn } from "@/lib/utils";
import SingleDateCalendar from "./single-date-calendar";

// ---------- Types ----------
type FieldConfig =
  | { type: "text"; name: string; placeholder?: string }
  | {
      type: "select";
      name: string;
      placeholder?: string;
      options: { value: string; label: string }[];
    }
  | {
      type: "dateRange";
      name: string;
      align?: "center" | "end" | "start";
      placeholder?: string;
    }
  | {
      type: "single_date_picker";
      name: string;
      align?: "center" | "end" | "start";
      placeholder?: string;
    };

interface GenerateFormProps<TSchema extends ZodTypeAny> {
  schema: TSchema;
  fields: FieldConfig[];
  namespace: string;
  custom_grid?: string;
  col_end?: string;
  defaultValues?: z.infer<TSchema>;
}

export default function GenerateForm<TSchema extends ZodTypeAny>({
  schema,
  fields,
  namespace,
  custom_grid,
  col_end,
  defaultValues,
}: GenerateFormProps<TSchema>) {
  const t = useTranslations(namespace);
  const { queryParams, updateParams, resetParams } = useUrlSearchParams();
  const urlDefaults = React.useMemo(() => {
    const acc: Record<string, unknown> = {};
    const qp = queryParams as Record<string, string>;

    for (const field of fields) {
      if (field.type === "dateRange") {
        const fromStr = qp["from"];
        const toStr = qp["to"];
        if (fromStr || toStr) {
          acc[field.name] = {
            from: fromStr ? new Date(fromStr) : undefined,
            to: toStr ? new Date(toStr) : undefined,
          };
        }
      } else if (field.type === "single_date_picker") {
        const dateStr = qp[field.name];
        if (dateStr) {
          acc[field.name] = new Date(dateStr);
        }
      } else {
        const val = qp[field.name];
        if (typeof val === "string") acc[field.name] = val;
      }
    }
    return acc;
  }, [fields, queryParams]);

  const initialValues = React.useMemo(() => {
    return { ...(defaultValues ?? {}), ...urlDefaults } as z.infer<TSchema>;
  }, [defaultValues, urlDefaults]);

  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  function onSubmit(data: z.infer<TSchema>) {
    updateParams(data);
  }

  function onReset() {
    updateParams({});
    resetParams();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2",
            custom_grid
          )}
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              name={field.name as any}
              control={form.control}
              render={({ field: rhfField }) => {
                if (field.type === "text") {
                  return (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <Input
                          placeholder={
                            field.name.includes("_id")
                              ? t("identifier")
                              : field.placeholder
                              ? t(field.placeholder)
                              : t(field.name)
                          }
                          {...rhfField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }
                if (field.type === "select") {
                  return (
                    <FormItem className="col-span-1">
                      <Select
                        onValueChange={rhfField.onChange}
                        defaultValue={rhfField.value}
                        value={rhfField.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue 
                              placeholder={field.placeholder ? t(field.placeholder) : t(field.name)}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {field.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {t(opt.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }
                if (field.type === "single_date_picker") {
                  return (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <SingleDateCalendar
                          placeholder={
                            field.placeholder ? t(field.placeholder) : ""
                          }
                          value={rhfField.value}
                          onChange={rhfField.onChange}
                          // {...rhfField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }
                if (field.type === "dateRange") {
                  return (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <CalendarDatePicker
                          date={
                            rhfField.value?.from
                              ? {
                                  from: rhfField.value.from,
                                  to: rhfField.value.to ?? rhfField.value.from,
                                }
                              : undefined
                          }
                          onDateSelect={({ from, to }) =>
                            rhfField.onChange({
                              from: from ?? undefined,
                              to: to ?? undefined,
                            })
                          }
                          align={field.align}
                          placeholder={
                            field.placeholder ? t(field.placeholder) : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }
                return <></>;
              }}
            />
          ))}

          <div
            className={cn(
              "col-span-1 lg:col-span-2 col-end-2 lg:col-end-6",
              col_end
            )}
          >
            <div className="flex items-center justify-end gap-2">
              <Button
                type="reset"
                onClick={onReset}
                className="w-20"
                variant={"ghost"}
              >
                {t("reset")}
              </Button>
              <Button type="submit" className="w-28">
                {t("search")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
