import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Skeleton } from "../ui/skeleton";

interface DataTableBodyProps<TData, TValue> {
  table: Table<TData>;
  t: (key: string) => string;
  columns: ColumnDef<TData, TValue>[];
  is_loading: boolean;
}

function DataTableBody<TData, TValue>({
  table,
  t,
  columns,
  is_loading,
}: DataTableBodyProps<TData, TValue>) {
  if (is_loading) {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow key={`skeleton-row-${rowIndex}`}>
            {columns.map((column, colIndex) => (
              <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                <Skeleton className="h-6 mx-auto" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (!table.getRowModel().rows?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {t("no_data")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className="text-center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default DataTableBody;
