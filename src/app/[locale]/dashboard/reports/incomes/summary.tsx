"use client";

import OverviewCard from "@/components/ui/overview-card";
import { useIncomeReportQuery } from "@/lib/apis/reports";
import React from "react";
import {
  IconArrowBarUp,
  IconCash,
  IconCurrencyDollar,
  IconPercentage,
  IconReceiptTax,
  IconTax,
  IconTrendingUp,
  IconUserDollar,
  IconWorldDollar,
} from "@tabler/icons-react";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useMemo } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/utils/price-utils";
import { useDirLang } from "@/hooks/use-dir-lang";
import { formatNumber } from "@/lib/utils/number-util";

function Summary() {
  const t = useTranslations("reports.incomes");
  const { queryParams } = useUrlSearchParams();
  const { dir } = useDirLang();
  const queryArgs = useMemo(
    () => ({
      from: queryParams.from || startOfMonth(new Date()).toISOString(),
      to: queryParams.to || endOfMonth(new Date()).toISOString(),
    }),
    [queryParams]
  );
  const { data, isLoading } = useIncomeReportQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });
  const cards = [
    {
      key: "total_revenue",
      name: t("total_price"),
      icon: IconWorldDollar,
      currency: true,
    },
    {
      key: "total_umrah_revenues",
      name: t("umrah_revenues"),
      icon: IconCurrencyDollar,
      currency: true,
    },
    {
      key: "total_platform_fee",
      name: t("total_platform_fee"),
      icon: IconCash,
      currency: true,
    },
    {
      key: "total_performer_fee",
      name: t("total_performer_fee"),
      icon: IconUserDollar,
      currency: true,
    },
    {
      key: "total_vat_amount",
      name: t("total_vat_amount"),
      icon: IconTax,
      currency: true,
    },
    {
      key: "total_other_revenues",
      name: t("total_other_revenues"),
      icon: IconUserDollar,
      currency: true,
    },
    {
      key: "total_credit",
      name: t("total_credit"),
      icon: IconArrowBarUp,
      currency: true,
    },
    {
      key: "profit",
      name: t("profit"),
      icon: IconTrendingUp,
      currency: true,
    },
  ];
  return (
    <section className="grid lg:grid-cols-12 gap-4">
      {cards.map(({ key, name, icon: Icon, currency }) => (
        <OverviewCard
          key={key}
          name={name}
          value={
            currency
              ? formatPrice(data?.data?.[key], {
                  isRTL: dir === "rtl",
                })
              : formatNumber(data?.data?.[key])
          }
          CardIcon={Icon}
        />
      ))}
    </section>
  );
}

export default Summary;
