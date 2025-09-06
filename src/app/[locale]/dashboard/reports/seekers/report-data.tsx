"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useMemo } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import { useSeekersReportQuery } from "@/lib/apis/reports";
import {  IconUser, IconUserCheck } from "@tabler/icons-react";
import { Title } from "@/components/ui/typography";
import OverviewCard from "@/components/ui/overview-card";
import SeekersReportDataTable from "./data-table";
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
  const { data, isLoading } = useSeekersReportQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="flex gap-4 flex-col">
      <section className="grid  gap-4 lg:grid-cols-12">
        <OverviewCard
          name={t("all_in_range")}
          value={data?.data?.users}
          CardIcon={IconUser}
        />
        <OverviewCard
          name={t("active")}
          value={data?.data?.active_users}
          CardIcon={IconUserCheck}
        />
      </section>
      <section className="flex flex-col">
        <Title className="mb-0">{t("top_15")}</Title>
      </section>
      <SeekersReportDataTable data={data!} isLoading={isLoading} />
    </div>
  );
}

export default ReportData;
