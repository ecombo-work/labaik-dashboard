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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  useLoginAsMutation,
  useToggleUserStatusMutation,
} from "@/lib/apis/user";
import { useToggleCouponStatusMutation } from "@/lib/apis/coupon";
import { useToggleDonationStatusMutation } from "@/lib/apis/donations";
import { LogIn } from "lucide-react";

const FormSchema = z.object({
  is_active: z.boolean(),
});

type EntityType = "user" | "coupon" | "association";

interface Props<TData> {
  id: string;
  entityType: EntityType;
  row: Row<TData>;
}

export function DataTableChangeStatusCell<TData>({
  row,
  entityType,
}: Props<TData>) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("alert_dialog");

  // Mutations
  const [toggleUser, { isLoading: userLoading }] =
    useToggleUserStatusMutation();
  const [toggleCoupon, { isLoading: couponLoading }] =
    useToggleCouponStatusMutation();
  const [toggleDonation, { isLoading: donationLoading }] =
    useToggleDonationStatusMutation();

  const isLoading = userLoading || couponLoading || donationLoading;

  // Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { is_active: row.getValue("is_active") },
  });

  useEffect(() => {
    form.setValue("is_active", row.getValue("is_active"));
  }, [row, form]);

  const isActive = form.watch("is_active");

  // ---- Translation helpers ----
  const translations = {
    user: {
      title: t("change_status_title"),
      active: t("active"),
      inactive: t("inactive"),
      description: isActive
        ? t("change_status_description_seeker_from_active_to_inactive")
        : t("change_status_description_seeker_from_inactive_to_active"),
      dialog: t("change_status_description", {
        current_status: isActive ? t("active") : t("inactive"),
        change_to: !isActive ? t("active") : t("inactive"),
      }),
    },
    coupon: {
      title: t("coupon.change_status_title"),
      active: t("coupon.active"),
      inactive: t("coupon.inactive"),
      description: isActive
        ? t("coupon.change_status_description_from_active_to_inactive")
        : t("coupon.change_status_description_from_inactive_to_active"),
      dialog: t("coupon.change_status_description", {
        current_status: isActive ? t("coupon.active") : t("coupon.inactive"),
        change_to: !isActive ? t("coupon.active") : t("coupon.inactive"),
      }),
    },
    association: {
      title: t("change_donation_status_title"),
      active: t("active"),
      inactive: t("inactive"),
      description: isActive
        ? t("change_donation_status_description_from_active_to_inactive")
        : t("change_donation_status_description_from_inactive_to_active"),
      dialog: t("change_donation_status_description", {
        current_status: isActive ? t("active") : t("inactive"),
        change_to: !isActive ? t("active") : t("inactive"),
      }),
    },
  }[entityType];

  // ---- Submit handler ----
  const onSubmit = async () => {
    try {
      let result;
      switch (entityType) {
        case "user":
          result = await toggleUser(row.getValue("user_id")).unwrap();
          break;
        case "coupon":
          result = await toggleCoupon(row.getValue("coupon_id")).unwrap();
          break;
        case "association":
          result = await toggleDonation(
            row.getValue("association_id")
          ).unwrap();
          break;
      }
      toast.success(result?.message);
    } catch (err) {
      console.error(err);
      toast.error(t("error_occurred"));
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Switch
            checked={isActive}
            className="cursor-pointer"
            onCheckedChange={(val) => {
              form.setValue("is_active", val);
              setOpen(true);
            }}
          />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>{translations.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  <FormField
                    name="is_active"
                    control={form.control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="hidden"
                      />
                    )}
                  />
                  {translations.dialog}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <AlertDialogCancel disabled={isLoading}>
                  {t("cancel")}
                </AlertDialogCancel>
                {/* <AlertDialogAction  asChild> */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  is_loading={isLoading}
                  className="w-28"
                >
                  {t("continue")}
                </Button>
                {/* </AlertDialogAction> */}
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
