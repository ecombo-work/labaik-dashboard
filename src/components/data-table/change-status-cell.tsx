"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Switch } from "../ui/switch";
import { useTranslations } from "next-intl";
import { Form, FormField } from "../ui/form";
import { useToggleUserStatusMutation } from "@/lib/apis/user";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useToggleCouponStatusMutation } from "@/lib/apis/coupon";

const FormSchema = z.object({
  is_active: z.boolean().optional(),
});

export function DataTableChangeStatusCell<TData, TValue>({
  row,
  entityType,
  id,
}: {
  id: string;
  entityType: "user" | "coupon";
  row: Row<TData>;
}) {
  const [toggleUserStatus, { isLoading: isLoadingUser }] =
    useToggleUserStatusMutation();
  const [toggleCouponStatus, { isLoading: isLoadingCoupon }] =
    useToggleCouponStatusMutation();
  const [isActive, setIsActive] = useState<boolean>(row.getValue("is_active"));
  const t = useTranslations("alert_dialog");
  const tCoupon = useTranslations("coupons");


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      is_active: isActive,
    },
  });
  const isLoading = isLoadingUser || isLoadingCoupon;
  const disabled = isLoading;
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let result;
    const idValue = row.getValue(id);
    if (entityType === "user") {
      result = await toggleUserStatus(row.getValue("user_id")).unwrap();
    } else if (entityType === "coupon") {
      result = await toggleCouponStatus(row.getValue("coupon_id")).unwrap();
    }
    toast.success(result?.message);
    setIsActive(!isActive);
  };
  useEffect(() => {
    form.setValue("is_active", row.getValue("is_active"));
  }, [row, form]);
  
  const dialog_title = entityType === "user" 
    ? t("change_status_title") 
    : tCoupon("change_status_title");
    
  const statusText = (active: boolean, isCoupon = false) => 
    isCoupon 
      ? active ? tCoupon("active") : tCoupon("inactive")
      : active ? t("active") : t("inactive");
      
  const getDescriptionText = () => {
    if (entityType === "user") {
      return isActive 
        ? t("change_status_description_seeker_from_active_to_inactive")
        : t("change_status_description_seeker_from_inactive_to_active");
    } else {
      return isActive
        ? tCoupon("change_status_description_from_active_to_inactive")
        : tCoupon("change_status_description_from_inactive_to_active");
    }
  };
  
  const dialog_description = entityType === "user"
    ? t("change_status_description", {
        current_status: statusText(isActive),
        change_to: statusText(!isActive),
        description: getDescriptionText()
      })
    : tCoupon("change_status_description", {
        current_status: statusText(isActive, true),
        change_to: statusText(!isActive, true),
        description: getDescriptionText()
      });

  return (
    <div className="flex items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Switch
            className="cursor-pointer"
            checked={isActive}
            onCheckedChange={(value) => form.setValue("is_active", value)}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>{dialog_title}</AlertDialogTitle>
                <AlertDialogDescription>
                  <FormField
                    name="is_active"
                    control={form.control}
                    render={({ field }) => (
                      <Switch
                        className="hidden"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  {dialog_description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <AlertDialogCancel disabled={disabled}>
                  {t("cancel")}
                </AlertDialogCancel>
                <AlertDialogAction disabled={disabled} className="w-28" asChild>
                  <Button
                    type="submit"
                    disabled={disabled}
                    is_loading={isLoading}
                  >
                    {t("continue")}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
