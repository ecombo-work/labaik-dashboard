"use client";
import React from "react";
import { useCountryReportQuery } from "@/lib/apis/reports";
import { ChartBarHorizontal } from "@/components/charts-graphs/chart-bar-horizontal";
import { ChartConfig } from "@/components/ui/chart";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { endOfMonth, startOfMonth } from "date-fns";
import { useTranslations } from "next-intl";
import DataTable from "./data-table";

const chartConfig = {
  total_count: {
    label: "Total Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function Page() {
  const t = useTranslations("reports.countries");
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useCountryReportQuery(
    {
      from: queryParams.from || startOfMonth(new Date()).toISOString(),
      to: queryParams.to || endOfMonth(new Date()).toISOString(),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log(data);
  return (
    <div>
      <ChartBarHorizontal
        data={data?.data?.summary}
        config={chartConfig}
        is_country={true}
        title={t("title")}
        description={t("description")}
      />
      <DataTable data={data?.data} isLoading={isLoading} />
    </div>
  );
}

export default Page;
