"use client";

import React, { useState } from "react";
import {
  useForm,
  Controller,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { Switch } from "@/components/ui/switch";
import { endOfMonth, format, startOfToday } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDatePicker } from "@/components/date-range";
import { useCreateCouponMutation } from "@/lib/apis/coupon";
import { toast } from "sonner";

export enum DiscountType {
  PERCENTAGE = "0",
  FIXED = "1",
}

// Define the form schema
const couponFormSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  discount_type: z.nativeEnum(DiscountType, {
    required_error: "Discount type is required",
  }),
  discount_value: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Discount value must be a positive number",
    }
  ),
  max_uses: z.string().refine(
    (val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num > 0 && Number.isInteger(num);
    },
    {
      message: "Max uses must be a positive integer",
    }
  ),
  date_range: z.object({
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z.date({
      required_error: "End date is required",
    }),
  }).refine(
    (data) => !data.to || !data.from || data.to >= data.from,
    {
      message: "End date must be after start date",
      path: ["to"],
    }
  ),
  is_active: z.boolean(),
});

type FormSchemaType = z.infer<typeof couponFormSchema>;

export default function CreateCoupon({ pre_loader }: { pre_loader: boolean }) {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const t = useTranslations("coupons");
  // Create form with default values
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      discount_type: DiscountType.PERCENTAGE,
      discount_value: "",
      max_uses: "1",
      date_range: { from: startOfToday(), to: endOfMonth(new Date()) },
      is_active: true,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
   
      const { date_range, ...restData } = data;
      const couponData = {
        ...restData,
        valid_from: date_range.from
          ? format(date_range.from, "yyyy-MM-dd")
          : null,
        valid_to: date_range.to ? format(date_range.to, "yyyy-MM-dd") : null,
      };

     await createCoupon(couponData)
        .unwrap()
        .then(() => {
          toast.success(t("success.created"));
          form.reset();
        })
        .catch(() => {
          toast.error(t("error.create_failed"));
        });
  };

  return pre_loader ? (
    <Skeleton className="!h-9 w-[125px]" />
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!h-9">{t("create_new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("create_coupon")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code Field */}
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium">{t("code")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Discount Type */}
              <Controller
                name="discount_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium">{t("discount_type")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={DiscountType.PERCENTAGE}>
                          {t("percentage")}
                        </SelectItem>
                        <SelectItem value={DiscountType.FIXED}>
                          {t("fixed_amount")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount Value */}
              <Controller
                name="discount_value"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium">{t("discount_value")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className="h-9 pl-8" />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          {form.watch("discount_type") === DiscountType.PERCENTAGE ? '%' : '$'}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Max Uses */}
              <Controller
                name="max_uses"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium">{t("max_uses")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-9" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {/* Expiry Date */}
              <Controller
                name="date_range"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 space-y-1">
                    <FormLabel className="text-sm font-medium">{t("valid_date")}</FormLabel>
                    <FormControl>
                      <CalendarDatePicker
                        date={field.value}
                        onDateSelect={field.onChange}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Is Active */}
              <Controller
                name="is_active"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 bg-muted/30">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium">
                        {t("is_active")}
                      </FormLabel>
                    
                    </div>
                    <FormControl>
                      <Switch
                        className="!bg-transparent"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading} onClick={() => form.reset()}>
                  {t("cancel")}
                </Button>
              </DialogClose>
              <Button type="submit" is_loading={isLoading} className="h-9 min-w-[100px]">
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
