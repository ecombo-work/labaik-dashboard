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
} from "../ui/alert-dialog";
import { useTranslations } from "next-intl";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useDeleteDonationMutation } from "@/lib/apis/donations";

const FormSchema = z.object({
  confirm: z.boolean(),
});

type EntityType = "association";

interface Props<TData> {
  row: Row<TData>;
  entityType: EntityType;
}

export function DataTableDeleteCell<TData>({ row, entityType }: Props<TData>) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("alert_dialog");

  // ---- Mutations ----
  const [deleteDonation, { isLoading: donationLoading }] =
    useDeleteDonationMutation();

  const isLoading = donationLoading;

  // ---- Form ----
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { confirm: false },
  });

  // ---- Translations ----
  const translations = {
    association: {
      title: t("delete_donation_title"),
      description: t("delete_donation_description"),
    },
  }[entityType];

  // ---- Submit Handler ----
  const onSubmit = async () => {
    try {
      let result;
      switch (entityType) {
        case "association":
          result = await deleteDonation(
            row.getValue("association_id")
          ).unwrap();
          break;
      }
      toast.success(result?.message || t("deleted_successfully"));
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
        <AlertDialogTrigger className="cursor-pointer" asChild>
          <Trash2 className="size-5" />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>{translations.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {translations.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading}>
                  {t("cancel")}
                </AlertDialogCancel>
                <Button
                  type="submit"
                  variant="destructive"
                  is_loading={isLoading}
                  disabled={isLoading}
                >
                  {t("delete")}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
