import React from "react";
import { useColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { ApiResponse } from "@/interfaces/response";
import { UsersReportResponse } from "@/interfaces/reports";

function SeekersReportDataTable({
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

export default SeekersReportDataTable;
