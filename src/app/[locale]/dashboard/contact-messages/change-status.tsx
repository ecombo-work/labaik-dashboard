import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ContactType,
  useUpdateContactMessageMutation,
} from "@/lib/apis/contact";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  status: z.nativeEnum(ContactType),
});

function ChangeStatus({ id, status }: { id: string; status: ContactType }) {
  const t = useTranslations("data_table.contact_messages");
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status,
    },
  });

  const [updateContactMessage, { isLoading }] =
    useUpdateContactMessageMutation();

  const currentStatus = form.watch("status");

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await updateContactMessage({
        contact_id: Number(id),
        status: data.status,
      }).unwrap();

      toast.success(res.message);
      setOpen(false);
    } catch (error: any) {
      console.debug("error", error);
      toast.error(error?.message || "An error occurred");
      form.reset({ status });
    }
  };

  const handleSelectChange = (newStatus: string) => {
    const statusEnum = newStatus as ContactType;
    if (statusEnum !== status) {
      form.setValue("status", statusEnum);
      setOpen(true);
    }
  };

  const handleCancel = () => {
    form.reset({ status });
    setOpen(false);
  };

  React.useEffect(() => {
    form.reset({ status });
  }, [status, form]);

  return (
    <div className="flex items-center justify-center">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <Select
          value={currentStatus?.toString()}
          onValueChange={handleSelectChange}
          disabled={[ContactType.RESOLVED, ContactType.CANCELLED].includes(
            currentStatus
          )}
        >
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="!w-[180px]">
            <SelectItem value={ContactType.IN_PROGRESS.toString()}>
              {t("status.in_progress")}
            </SelectItem>
            <SelectItem value={ContactType.RESOLVED.toString()}>
              {t("status.resolved")}
            </SelectItem>
            <SelectItem value={ContactType.CANCELLED.toString()}>
              {t("status.cancelled")}
            </SelectItem>
          </SelectContent>
        </Select>

        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("change_status_title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("change_status_description")}
                </AlertDialogDescription>
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => <Input type="hidden" {...field} />}
                />
              </AlertDialogHeader>

              <AlertDialogFooter className="w-full">
                <AlertDialogCancel
                  type="button"
                  disabled={isLoading}
                  className="w-28"
                  onClick={handleCancel}
                >
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
                    {t("save")}
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

export default ChangeStatus;
