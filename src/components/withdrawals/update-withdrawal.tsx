"use client";
import { WithdrawalBaseInfo } from "@/interfaces/withdrawal";
import { useGetAccountsQuery } from "@/lib/apis/account";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatPrice } from "@/lib/utils/price-utils";
import { WithdrawalStatus } from "@/constants/withdrawal";
import { Lead, Title } from "../ui/typography";
import { FileInput } from "../file-input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useUpdateWithdrawalMutation } from "@/lib/apis/withdrawal";
const formSchema = z.object({
  withdrawal_id: z.string(),
  status: z.enum([
    WithdrawalStatus.PENDING,
    WithdrawalStatus.APPROVED,
    WithdrawalStatus.REJECTED,
  ]),
  account_id: z.string().optional(),
  confirm_image: z.instanceof(File).nullable(),
});
type UpdateWithdrawalProps = z.infer<typeof formSchema>;
function UpdateWithdrawal({ withdrawal }: { withdrawal: WithdrawalBaseInfo }) {
  const t = useTranslations("withdrawal_details.update");
  const [updateWithdrawal, { isLoading }] = useUpdateWithdrawalMutation();
  const { data: accounts } = useGetAccountsQuery({
    page: "1",
    limit: "50",
  });
  const form = useForm<UpdateWithdrawalProps>({
    defaultValues: {
      withdrawal_id: withdrawal.withdrawal_id.toString(),
      status: withdrawal.status,
      account_id: "",
      confirm_image: null,
    },
  });
  const change_status_disabled =
    withdrawal.status === WithdrawalStatus.APPROVED ||
    withdrawal.status === WithdrawalStatus.REJECTED;
  const choose_account_disabled =
    withdrawal.status !== WithdrawalStatus.PENDING;
  const is_button_disabled =
    withdrawal.status === WithdrawalStatus.APPROVED ||
    withdrawal.status === WithdrawalStatus.REJECTED;
  const onSubmit = async (data: UpdateWithdrawalProps) => {
    try {
      await updateWithdrawal(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <Lead>{t("actions")}</Lead>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 "
      >
        <div className="col-span-3 flex flex-col gap-3">
          <Controller
            name="status"
            control={form.control}
            disabled={change_status_disabled}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>{t("status")}</FormLabel>
                <FormControl>
                  <Select
                    disabled={change_status_disabled}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value={WithdrawalStatus.PENDING}>
                        {t("pending")}
                      </SelectItem>
                      <SelectItem value={WithdrawalStatus.APPROVED}>
                        {t("approved")}
                      </SelectItem>
                      <SelectItem value={WithdrawalStatus.REJECTED}>
                        {t("rejected")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <Controller
            name="account_id"
            control={form.control}
            disabled={choose_account_disabled}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>{t("account")}</FormLabel>
                <FormControl>
                  <Select
                    disabled={choose_account_disabled}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {accounts?.data?.items.map((account) => (
                        <SelectItem
                          key={account.account_id}
                          value={account.account_id.toString()}
                          className="flex justify-between"
                        >
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          <Controller
            control={form.control}
            name="confirm_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm_image")}</FormLabel>

                <FormControl>
                  {withdrawal.status === WithdrawalStatus.APPROVED ? (
                    <FileInput
                      value={field.value}
                      onChange={field.onChange}
                      dimensions="!h-[500px] !w-[290px]"
                      className="h-[500px] w-[290px]"
                      default_value={withdrawal.confirm_image}
                    />
                  ) : (
                    <FileInput
                      value={field.value}
                      onChange={field.onChange}
                      className="h-[500px] w-[290px]"
                      dimensions="!h-[500px] !w-[290px]"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="col-span-6" disabled={is_button_disabled}>
          {t("update")}
        </Button>
      </form>
    </Form>
  );
}

export default UpdateWithdrawal;
