"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormField } from "@/components/ui/form";
import {
  Performer,
  useChangeVerificationStatusMutation,
} from "@/lib/apis/user";
import { Row } from "@tanstack/react-table";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserVerificationStatus } from "@/constants/user.constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FormSchema = z.object({
  user_id: z.number(),
  status: z.nativeEnum(UserVerificationStatus),
});
function DataTableChangeVerificationCell({ row }: { row: Row<Performer> }) {
  if (!row) return null;
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<UserVerificationStatus>();
  const [status, setStatus] = React.useState<UserVerificationStatus>(
    Number(row.original.user_details.verification_status)
  );
  const { user_id } = row.original;
  const [changeVerification, { isLoading }] =
    useChangeVerificationStatusMutation();
  const tData = useTranslations("data_table");
  const t = useTranslations("alert_dialog");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_id,
      status,
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await changeVerification(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setOpen(false);
        form.setValue("status", data.status);
        setStatus(data.status);
        // form.reset();
      })
      .catch((error) => {
        console.debug("error", error);
        // toast.error(error.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <Select
          value={status.toString()}
          onValueChange={(v) => {
            const newStatus = Number(v) as UserVerificationStatus;
            setSelectedStatus(newStatus);
            form.setValue("status", newStatus);
            setOpen(true);
          }}
          disabled={
            status === UserVerificationStatus.VERIFIED ||
            status === UserVerificationStatus.REJECTED ||
            status === UserVerificationStatus.NO_VERIFICATION_UPLOADED
          }
        >
          <SelectTrigger className="w-[170px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="!w-[170px]">
            <SelectItem
              value={UserVerificationStatus.NO_VERIFICATION_UPLOADED.toString()}
            >
              {tData("verification_status.no_verification_uploaded")}
            </SelectItem>
            <SelectItem value={UserVerificationStatus.PENDING.toString()}>
              {tData("verification_status.pending")}
            </SelectItem>
            <SelectItem value={UserVerificationStatus.VERIFIED.toString()}>
              {tData("verification_status.verified")}
            </SelectItem>
            <SelectItem value={UserVerificationStatus.REJECTED.toString()}>
              {tData("verification_status.rejected")}
            </SelectItem>
          </SelectContent>
        </Select>
        {/* </AlertDialogTrigger> */}
        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("change_verification_status_title")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t("change_verification_status_description", {
                    status:
                      selectedStatus !== undefined
                        ? tData(
                            `verification_status.${UserVerificationStatus[
                              selectedStatus
                            ].toLowerCase()}`
                          )
                        : tData("verification_status.pending"),
                  })}
                </AlertDialogDescription>
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => <Input hidden {...field} />}
                />
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <AlertDialogCancel disabled={isLoading}>
                  {t("cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isLoading}
                  className="w-28"
                  asChild
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
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

export default DataTableChangeVerificationCell;
