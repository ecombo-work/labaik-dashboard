"use client";
import { useGetAllDonationsQuery } from "@/lib/apis/donations";
import { DataTable as DataTableComponent } from "@/components/data-table";
import { useColumns } from "./columns";
import AddDonation from "./add";
export default function DataTable() {
    const columns = useColumns();
  const { data, isLoading, error, refetch, isFetching } =
    useGetAllDonationsQuery(
      {
        page: "1",
        limit: "25",
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  return (
    <DataTableComponent
      columns={columns}
      data={data?.data?.items}
      meta={data?.data?.meta}
      onRefresh={refetch}
      error={error}
      loading={isLoading || isFetching}
      additional_actions={<AddDonation pre_loader={isLoading || isFetching} />}
    />
  );
}
