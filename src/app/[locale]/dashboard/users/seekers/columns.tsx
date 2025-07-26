"use client";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useLocale, useTranslations } from "next-intl";
import {
  DataTableCheckboxHeader,
  DataTableCountryNameCell,
  DataTableDateCell,
  DataTablePhoneCell,
  DataTableSelectCell,
} from "@/components/data-table/reuseable";
import { DataTableChangeStatusCell } from "@/components/data-table/change-status-cell";
import { Seeker } from "@/lib/apis/user";

export const useColumns = () => {
  const t = useTranslations("data_table");
  return useMemo(
    (): ColumnDef<Seeker>[] => [
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
        accessorKey: "user_id",
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
        accessorKey: "username",
        header: t("username"),
        size: 150,
        enableGlobalFilter: true,
      },
      {
        header: t("phone_number"),
        accessorKey: "phone_number",
        enableGlobalFilter: true,
        size: 140,
        cell: ({ row }) => <DataTablePhoneCell row={row} />,
      },
      {
        header: t("country"),
        accessorKey: "country",
        enableGlobalFilter: true,
        size: 100,
        cell: ({ row }) => <DataTableCountryNameCell row={row} />,
      },
      {
        header: t("active"),
        accessorKey: "is_active",
        size: 60,
        enableGlobalFilter: true,
        cell: ({ row }) => <DataTableChangeStatusCell id="user_id" entityType="user" row={row} />,
      },

    ],
    [t]
  );
};
