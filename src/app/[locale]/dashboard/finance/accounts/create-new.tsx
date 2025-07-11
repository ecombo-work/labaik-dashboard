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
import { useCreateAccountMutation } from "@/lib/apis/account";
const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  balance: z.string().min(1, "Balance is required"),
});
type formInterface = z.infer<typeof createAccountSchema>;
export default function CreateAccount({ pre_loader }: { pre_loader: boolean }) {
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const t = useTranslations("finance");
  const form = useForm<formInterface>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      balance: "",
    },
  });

  const onSubmit = async (data: formInterface) => {
    await createAccount(data)
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
        <Button className="!h-9">{t("new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("create_account_title")}</DialogTitle>
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
                    <FormLabel>{t("account_name")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                name="balance"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("balance")}</FormLabel>
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
