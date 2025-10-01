"use client";

import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useColumns } from "./columns";
import { useGetCurrentRequestsQuery } from "@/lib/apis/umrah";
import { DataTable } from "@/components/data-table";
import { useMemo } from "react";
import PageHeader from "@/components/page-header";
import UmrahSearchForm from "./search";

export default function Page() {
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
    useGetCurrentRequestsQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
    });

  return (
    <>
      <PageHeader title="current_umrah_requests">
        <UmrahSearchForm />
      </PageHeader>
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
      />
    </>
  );
}
