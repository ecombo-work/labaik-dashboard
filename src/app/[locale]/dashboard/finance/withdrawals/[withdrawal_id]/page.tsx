"use client";
import { Separator } from "@/components/ui/separator";
import { Title } from "@/components/ui/typography";
import BankDetails from "@/components/withdrawals/bank-details";
import BinanceDetails from "@/components/withdrawals/binance-details";
import PayPalDetails from "@/components/withdrawals/paypal-details";
import UpdateWithdrawal from "@/components/withdrawals/update-withdrawal";
import WithdrawalInfo from "@/components/withdrawals/withdrawal-info";
import { WithdrawalMethod } from "@/constants/withdrawal";
import { useGetWithdrawalDetailsQuery } from "@/lib/apis/withdrawal";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useTranslations } from "next-intl";
import React, { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ withdrawal_id: string }>;
}) {
  const t = useTranslations("page_title");
  const { withdrawal_id } = use(params);
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, refetch, isFetching } = useGetWithdrawalDetailsQuery(
    {
      withdrawal_id: withdrawal_id,
      method: queryParams.method,
    }
  );
  if (isLoading || isFetching) {
    return <section>Loading...</section>;
  }
  if (!data?.data) {
    return <section>Not Found</section>;
  }
  const withdrawal = data.data;
 

  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        <Title>{t("withdrawal_details", { withdrawal_id })}</Title>
      </div>
      <div className=" space-y-3">
        <WithdrawalInfo withdrawal={withdrawal} />
        {withdrawal.method === WithdrawalMethod.BANK_TRANSFER && (
          <BankDetails withdrawal={withdrawal.bank_details} />
        )}
        {withdrawal.method === WithdrawalMethod.PAYPAL && (
          <PayPalDetails withdrawal={withdrawal.paypal_details} />
        )}
        {withdrawal.method === WithdrawalMethod.BINANCE && (
          <BinanceDetails withdrawal={withdrawal.binance_details} />
        )}
        <Separator />
        <UpdateWithdrawal withdrawal={withdrawal} />
      </div>
    </React.Fragment>
  );
}
