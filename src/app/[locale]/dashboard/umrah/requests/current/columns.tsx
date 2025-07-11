"use client";
import { DataTableActionCell } from "@/components/data-table/cell-actions";
import {
  DataTableCheckboxHeader,
  DataTableDateCell,
  DataTableSelectCell,
} from "@/components/data-table/reuseable";
import { CurrentUmrahRequest } from "@/interfaces/umrah";
import { formatPrice } from "@/lib/utils/price-utils";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import UmrahStatusBadge from "../../../../../../components/umrah-status-badge";

export const useColumns = () => {
  const t = useTranslations("data_table");
  return useMemo(
    (): ColumnDef<CurrentUmrahRequest>[] => [
      {
        id: "select",
        header: ({ table }) => <DataTableCheckboxHeader table={table} />,
        cell: ({ row }) => <DataTableSelectCell row={row} />,
        size: 50,
        enableSorting: false,
        enableHiding: false,
      },
      {
        header: "#",
        accessorKey: "umrah_id",
        enableGlobalFilter: true,
        size: 50,
      },
      {
        accessorKey: "created_at",
        header: t("date"),
        size: 180,
        enableGlobalFilter: false,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "created_by.username",
        header: t("seeker"),
        size: 150,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "price",
        header: t("price"),
        size: 150,
        cell: ({ row }) => formatPrice(row.getValue("price")),
        enableGlobalFilter: true,
      },
      {
        accessorKey: "assigned_to.username",
        header: t("performer"),
        size: 150,
        cell: ({ row }) => row.original.assigned_to?.username ?? "__",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "status",
        header: t("status"),
        size: 150,
        cell: ({ row }) => <UmrahStatusBadge status={row.getValue("status")} />,
        enableGlobalFilter: true,
      },
      {
        header: t("actions"),
        size: 80,
        cell: ({ row }) => (
          <DataTableActionCell row={row} path="dashboard/umrah/requests/current" is_full_path icon="view" id_path="umrah_id" />
        ),
      },
    ],
    [t]
  );
};
