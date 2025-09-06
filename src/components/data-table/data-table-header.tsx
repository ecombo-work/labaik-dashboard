import React, { useMemo } from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  is_loading?: boolean;
}

// Define the component with a name for better debugging
function DataTableHeaderComponent<TData>({
  table,
  is_loading = false,
}: DataTableHeaderProps<TData>) {
  const headerGroups = useMemo(() => table.getHeaderGroups(), [table]);

  return (
    <TableHeader className="bg-primary/10 rounded-t-xl">
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className="text-center"
              scope="col"
              style={
                header.getSize()
                  ? { width: `${header.getSize()}px` }
                  : undefined
              }
            >
              {is_loading ? (
                <Skeleton className="h-6 w-2/3 mx-auto" />
              ) : header.isPlaceholder ? null : (
                flexRender(header.column.columnDef.header, header.getContext())
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

// Memoize and export the component with proper typing
export const DataTableHeader = React.memo(DataTableHeaderComponent) as <TData>(
  props: DataTableHeaderProps<TData>
) => React.ReactElement;
