"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import React from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PaginationMeta } from "@/lib/apis/user";
import DataTablePagination from "@/components/data-table/pagination";
import SelectedRows from "@/components/data-table/selected-rows";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import DataTableBody from "@/components/data-table/data-table-body";
import DataTableActions from "@/components/data-table/data-table-actions";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { DataTableHeader } from "./data-table-header";

interface ErrorState {
  message: string;
  retry?: () => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  meta?: PaginationMeta;
  // onPageChange?: (page: number) => void;
  onRefresh?: () => void;
  loading?: boolean;
  className?: string;
  error?: FetchBaseQueryError | SerializedError | undefined;
  visibilityState?: VisibilityState;
  additional_actions?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta = { current_page: 1, total_pages: 1, total_count: 0, limit: 25 },
  onRefresh,
  loading = false,
  error = undefined,
  className = "",
  visibilityState = {},
  additional_actions,
}: DataTableProps<TData, TValue>) {
  const { queryParams } = useUrlSearchParams();
  const [page, setPage] = React.useState<number>(
    Number(queryParams.page) || meta.current_page
  );
  const [limit, setLimit] = React.useState<number>(
    Number(queryParams.limit) || meta.limit
  );
  const t = useTranslations("data_table");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(visibilityState);
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: data ?? [],
    columns,
    manualPagination: true,
    pageCount: meta.total_pages,
    enableMultiSort: false,
    enableFilters: true,
    enableGlobalFilter: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex: table.getState().pagination.pageIndex,
          pageSize: table.getState().pagination.pageSize,
        });
        if (setPage && newState.pageIndex !== undefined) {
          setPage(newState.pageIndex + 1);
        }
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const handleRetry = () => {
    onRefresh?.();
  };

  if (error) {
    return (
      <div className="mx-auto py-10">
        <Alert
          variant="destructive"
          className="mt-4 w-full flex justify-center items-center flex-col"
        >
          <span className="flex items-center justify-center gap-2">
            <AlertCircle className="size-5" />

            <AlertTitle className="text-lg">Error</AlertTitle>
          </span>
          <AlertDescription>
            Failed to load data. Please try again.
            <div className="w-full mt-2 flex items-center justify-center">
              <Button
                variant="outline"
                className="w-28 h-9"
                onClick={handleRetry}
              >
                <RefreshCw className="mr-2 size-5" />
                Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <div className={cn("space-y-4   w-full", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DataTableActions
          table={table}
          t={t}
          meta={meta}
          is_loading={loading}
        />
        {additional_actions && (
          <div className="flex items-center gap-2">{additional_actions}</div>
        )}
      </div>
      <div className="bg-card border border-gray-200 rounded-xl">
        <Table className="rounded-xl">
          <DataTableHeader table={table} is_loading={loading} />
          <DataTableBody table={table} columns={columns} is_loading={loading} />
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <SelectedRows table={table} t={t} />
        <DataTablePagination table={table} meta={meta} onPageChange={setPage} />
      </div>
    </div>
  );
}
