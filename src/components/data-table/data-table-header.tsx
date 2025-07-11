import { flexRender, Table } from "@tanstack/react-table";
import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  is_loading?: boolean;
}

function DataTableHeader<TData>({
  table,
  is_loading = false,
}: DataTableHeaderProps<TData>) {
  if (is_loading) {
    return (
      <TableHeader className="bg-primary/10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="text-center"
                style={{ width: `${header.getSize()}px` }}
              >
                <Skeleton className="h-6 w-2/3 mx-auto" />
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
    );
  }

  return (
    <TableHeader className="bg-primary/10">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className="text-center" style={{ width: `${header.getSize()}px` }}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default DataTableHeader;
