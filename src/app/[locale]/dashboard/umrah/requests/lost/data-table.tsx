"use client";
// useLostRequestsQuery
import React, { useMemo } from "react";
import { useLostRequestsQuery } from "@/lib/apis/umrah";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DataTable } from "@/components/data-table";
import { useColumns } from "./columns";
function LostRequestsDataTable() {
  const columns = useColumns();
  const { queryParams } = useUrlSearchParams();
  const queryArgs = useMemo(
    () => ({
      page: queryParams.page ?? "1",
      limit: queryParams.limit ?? "25",
      ...queryParams,
    }),
    [queryParams]
  );
  const { data, isLoading, error, refetch, isFetching } =
    useLostRequestsQuery(queryArgs);
  return (
    <DataTable
      columns={columns}
      data={data?.data?.items}
      meta={data?.data?.meta}
      onRefresh={refetch}
      error={error}
      loading={isLoading || isFetching}
    />
  );
}

export default LostRequestsDataTable;
