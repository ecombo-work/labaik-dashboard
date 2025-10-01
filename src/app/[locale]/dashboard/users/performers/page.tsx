"use client";
import { useGetPerformersQuery } from "@/lib/apis/user";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DataTable } from "@/components/data-table";
import { useColumns } from "./columns";
import PageHeader from "@/components/page-header";
import PerformersSearchForm from "./search-form";

export default function Page() {
  const columns = useColumns();
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useGetPerformersQuery(
    {
      page: queryParams.page ?? "1",
      limit: queryParams.limit ?? "25",
      ...queryParams,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <>
      <PageHeader title="performers">
        <PerformersSearchForm />
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
