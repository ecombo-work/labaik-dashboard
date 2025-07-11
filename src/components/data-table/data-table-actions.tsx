import { PaginationMeta } from "@/lib/apis/user";
import { Table } from "@tanstack/react-table";
import React from "react";
import { Input } from "../ui/input";
import { IconSearch } from "@tabler/icons-react";
import { DataTablePageSize } from "./page-size";
import { Skeleton } from "../ui/skeleton";

function DataTableActions<TData>({
  table,
  t,
  meta,
  is_loading,
}: {
  table: Table<TData>;
  t: (key: string) => string;
  meta: PaginationMeta;
  is_loading: boolean;
}) {
  return (
    <div className="flex-1 flex flex-row gap-2 max-w-sm">
      <div className="w-[220px]">
        {is_loading ? (
          <Skeleton className="w-[220px] h-9" />
        ) : (
          <Input
            type="search"
            left_icon={<IconSearch className="size-5" />}
            placeholder={t("fast_search")}
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-9  !text-xs !w-[220px]"
            disabled={is_loading}
          />
        )}
      </div>
      <DataTablePageSize
        is_loading={is_loading}
        table={table}
        count={meta.total_count}
      />
    </div>
  );
}

export default DataTableActions;
