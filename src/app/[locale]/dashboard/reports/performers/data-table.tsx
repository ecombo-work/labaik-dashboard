import { ApiResponse } from "@/interfaces/response";
import { UsersReportResponse } from "@/interfaces/reports";
import { DataTable } from "@/components/data-table";
import { useColumns } from "./columns";
function PerformersReportDataTable({
  data,
  isLoading,
}: {
  data: ApiResponse<UsersReportResponse>;
  isLoading: boolean;
}) {
  return (
    <DataTable
      columns={useColumns()}
      data={data?.data?.top_15_users || []}
      loading={isLoading}
    />
  );
}

export default PerformersReportDataTable;
