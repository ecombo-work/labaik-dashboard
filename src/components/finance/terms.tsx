"use client";
import React from "react";
import { useTermsColumns } from "./terms-columns";
import { useGetTermsQuery } from "@/lib/apis/term";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/pagination";
import { DataTable } from "../data-table";
import CreateTerm from "./create-term";
import { usePathname } from "@/i18n/navigation";
import { TermType } from "./transactions";

function Terms() {
  const columns = useTermsColumns();
  const { queryParams } = useUrlSearchParams();
  const pathname = usePathname();
  const isIncoming = pathname.includes("incoming");
  const { data, isLoading, error, refetch } = useGetTermsQuery(
    {
      page: queryParams.page ?? DEFAULT_PAGE,
      limit: queryParams.limit ?? DEFAULT_LIMIT,
      type: isIncoming ? TermType.INCOMING : TermType.OUTGOING,
      ...queryParams,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  return (
    <DataTable
      columns={columns}
      data={data?.data?.items}
      meta={data?.data?.meta}
      onRefresh={refetch}
      error={error}
      loading={isLoading}
      additional_actions={<CreateTerm pre_loader={isLoading} />}
    />
  );
}

export default Terms;
