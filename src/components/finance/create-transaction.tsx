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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useCreateTermMutation, useGetTermsQuery } from "@/lib/apis/term";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useGetAccountsQuery } from "@/lib/apis/account";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import SingleDateCalendar from "../single-date-calendar";
import { REGEXP_ONLY_DIGITS } from "@/constants/patterns";
import { useCreateTransactionMutation } from "@/lib/apis/finance";
import { formatDate } from "date-fns";
const createTransactionSchema = z.object({
  amount: z.string().regex(REGEXP_ONLY_DIGITS, "Amount must be a number"),
  term_id: z.string().min(1, "Term is required"),
  account_id: z.string().min(1, "Account is required"),
  received_at: z.date(),
  note: z.string().optional(),
  type: z.string().min(1, "Type is required"),
});
type formInterface = z.infer<typeof createTransactionSchema>;
function CreateTransaction({ pre_loader }: { pre_loader: boolean }) {
  const t = useTranslations("transactions");
  const { queryParams } = useUrlSearchParams();
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();
  const { data: accounts, isLoading: accountsLoading } = useGetAccountsQuery({
    page: "1",
    limit: "50",
  });
  const { data: terms, isLoading: termsLoading } = useGetTermsQuery({
    page: "1",
    limit: "50",
    type: queryParams.type,
  });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const form = useForm<formInterface>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: "",
      term_id: "",
      account_id: "",
      received_at: new Date(),
      note: "",
      type: queryParams.type,
    },
  });

  const onSubmit = async (data: formInterface) => {
    console.log(data);
    await createTransaction({
      ...data,
      received_at: formatDate(data.received_at, "yyyy-MM-dd"),
    })
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
        <Button className="!h-9">{t("add_transaction")}</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("add_transaction_title")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl"
          >
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("amount")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* select account */}
            <FormField
              name="account_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("account")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts?.data?.items.map((account) => (
                          <SelectItem
                            key={account.account_id}
                            value={account.account_id.toString()}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* select term */}
            <FormField
              name="term_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("term")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {terms?.data?.items.map((term) => (
                          <SelectItem
                            key={term.term_id}
                            value={term.term_id.toString()}
                          >
                            {term.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* select received at */}
            <FormField
              name="received_at"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("transaction_date")}</FormLabel>
                  <FormControl>
                    <SingleDateCalendar
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* select note */}
            <FormField
              name="note"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("note")}</FormLabel>
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

export default CreateTransaction;
