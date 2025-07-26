"use client";

import React, { useState } from "react";
import {
  useForm,
  Controller,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDatePicker } from "@/components/date-range";
import { DateRange } from "react-day-picker";
import { useCreateCouponMutation } from "@/lib/apis/coupon";
import { toast } from "sonner";

export enum DiscountType {
  PERCENTAGE = "0",
  FIXED = "1",
  FREE = "2",
}

// Define the form schema type first
type FormSchemaType = {
  code: string;
  discount_type: DiscountType;
  discount_value: string;
  max_uses: string;
  date_range: DateRange;
  is_active: boolean;
};

export default function CreateCoupon({ pre_loader }: { pre_loader: boolean }) {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const t = useTranslations("coupons");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create form with default values
  const form = useForm<FormSchemaType>({
    defaultValues: {
      code: "",
      discount_type: DiscountType.PERCENTAGE,
      discount_value: "",
      max_uses: "1",
      date_range: { from: undefined, to: undefined },
      is_active: true,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const { date_range, ...restData } = data;
      const couponData = {
        ...restData,
        valid_from: date_range.from
          ? format(date_range.from, "yyyy-MM-dd")
          : null,
        valid_to: date_range.to ? format(date_range.to, "yyyy-MM-dd") : null,
      };

      // TODO: Implement API call to create coupon
      console.log("Submitting coupon:", couponData);
      await createCoupon(couponData);
      toast.success(t("success.created"));
      // router.push("/dashboard/coupons");
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error(t("error.create_failed"));
    }
  };

  return pre_loader ? (
    <Skeleton className="!h-10 w-[125px]" />
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!h-10">{t("create_new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("create_coupon")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code Field */}
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("code")} </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Discount Type */}
              <Controller
                name="discount_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("discount_type")} </FormLabel>
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
                        <SelectItem value={DiscountType.FREE}>
                          {t("free")}
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
                disabled={form.watch("discount_type") === DiscountType.FREE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("discount_value")} </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Uses */}
              <Controller
                name="max_uses"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("max_uses")} </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Expiry Date */}
              <Controller
                name="date_range"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>{t("valid_date")}</FormLabel>
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
                  <FormItem className="col-span-2 flex flex-row items-center justify-between rounded-lg border border-primary h-10 p-2">
                    <FormLabel className="text-base">
                      {t("is_active")}
                    </FormLabel>
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
              <DialogClose disabled={isLoading} onClick={() => form.reset()}>
                {t("cancel")}
              </DialogClose>
              <Button is_loading={isLoading} className="!h-10 !w-30">
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
