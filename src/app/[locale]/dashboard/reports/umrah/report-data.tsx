"use client";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUmrahReportQuery } from "@/lib/apis/reports";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { endOfMonth, formatDate, startOfMonth } from "date-fns";
import Summary from "./summary";
import { ChartAreaDefault } from "@/components/charts-graphs/area-chart";
import { ChartConfig } from "@/components/ui/chart";

function ReportData() {
  const t = useTranslations("charts");
  const { queryParams } = useUrlSearchParams();

  const queryArgs = useMemo(
    () => ({
      from: queryParams.from || startOfMonth(new Date()).toISOString(),
      to: queryParams.to || endOfMonth(new Date()).toISOString(),
    }),
    [queryParams]
  );
  const { data, isLoading } = useUmrahReportQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });
  const chartConfig = {
    base: {
      label: "base",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <Summary data={data?.data?.summary!} />
      <ChartAreaDefault
        title={t("daily_report")}
        description={t("umrah_daily_report")}
        data={
          data?.data?.daily_counts.map((item) => ({
            key: formatDate(item.date, "dd-MM"),
            value: Number(item.count),
          }))!
        }
        config={chartConfig}
      />
    </div>
  );
}

export default ReportData;
