"use client";
import React from "react";
import { useTermsColumns } from "./terms-columns";
import { useGetTermsQuery } from "@/lib/apis/term";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/pagination";
import { DataTable } from "../data-table";
import CreateTerm from "./create-term";

function Terms() {
  const columns = useTermsColumns();
  const { queryParams } = useUrlSearchParams();

  const { data, isLoading, error, refetch, isFetching } = useGetTermsQuery(
    {
      page: queryParams.page ?? DEFAULT_PAGE,
      limit: queryParams.limit ?? DEFAULT_LIMIT,
      type: queryParams.type,
    },
  );

  return (
    <DataTable
      columns={columns}
      data={data?.data?.items}
      meta={data?.data?.meta}
      onRefresh={refetch}
      error={error}
      loading={isLoading || isFetching}
      additional_actions={<CreateTerm pre_loader={isLoading || isFetching} />}
    />
  );
}

export default Terms;
