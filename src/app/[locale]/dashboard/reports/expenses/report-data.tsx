"use client";
import { useExpenseReportQuery } from "@/lib/apis/reports";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { endOfMonth, startOfMonth } from "date-fns";
import { ChartAreaDefault } from "@/components/charts-graphs/area-chart";
import { ChartConfig } from "@/components/ui/chart";
import { ChartBarDefault } from "@/components/charts-graphs/bar-chart";

function ReportData() {
  const t = useTranslations("reports");
  const { queryParams } = useUrlSearchParams();

  const queryArgs = useMemo(
    () => ({
      from: queryParams.from || startOfMonth(new Date()).toISOString(),
      to: queryParams.to || endOfMonth(new Date()).toISOString(),
    }),
    [queryParams]
  );
  const { data, isLoading } = useExpenseReportQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });
  const chartConfig = {
    base: {
      label: "base",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <ChartBarDefault
      data={
        data?.data?.map((item) => ({
          key: item.name,
          value: Number(item.total_expense),
        }))!
      }
      config={chartConfig}
    />
  );
}

export default ReportData;
