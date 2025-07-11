"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useCreateTermMutation } from "@/lib/apis/term";
import { useUrlSearchParams } from "@/lib/utils/search-params";
const createTermSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
});
type formInterface = z.infer<typeof createTermSchema>;
export default function CreateTerm({ pre_loader }: { pre_loader: boolean }) {
  const t = useTranslations("terms");
  const { queryParams } = useUrlSearchParams();
  const [createTerm, { isLoading }] = useCreateTermMutation();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const form = useForm<formInterface>({
    resolver: zodResolver(createTermSchema),
    defaultValues: {
      name: "",
      type: queryParams.type,
      },
  });

  const onSubmit = async (data: formInterface) => {
    await createTerm(data)
      .unwrap()
      .then((res) => {
        setIsOpen(false);
        form.reset();
        toast.success(t("res.created"));
      })
      .catch(() => {
        toast.error(t("res.failed"));
      });
  };

  return pre_loader ? (
    <Skeleton className="!h-9 w-[125px]" />
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="!h-9">{t("add_term")}</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("add_term_title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl"
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose disabled={isLoading} onClick={() => form.reset()}>
                {t("cancel")}
              </DialogClose>
              <Button is_loading={isLoading} className="!h-9 !w-30">
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
