import React from "react";
import { DataTable as DataTableComponent } from "@/components/data-table";
import { useColumns } from "./columns";
import { ApiResponse } from "@/interfaces/response";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DataTable({
  data,
  isLoading,
}: {
  data: {
    summary: {
      country: string;
      completed_count: number;
      total_count: number;
    }[];
  };
  isLoading: boolean;
}) {
  console.log("data", data);
  return (
    <Card className="mt-6">
      <CardContent>
        <DataTableComponent
          columns={useColumns()}
          data={data?.summary}
          loading={isLoading}
        />
      </CardContent>
    </Card>
  );
}

export default DataTable;
