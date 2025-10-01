"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Employee } from "@/lib/apis/user";
import {
  DataTableCheckboxHeader,
  DataTableCountryNameCell,
  DataTableDateCell,
  DataTablePhoneCell,
  DataTableSelectCell,
  DataTableUserTypeCell,
} from "@/components/data-table/reuseable";
import { DataTableChangeStatusCell } from "@/components/data-table/change-status-cell";
import { LogIn } from "lucide-react";
import { DataTableLoginAsCell } from "@/components/data-table/cell-actions";
export const useColumns = () => {
  const t = useTranslations("data_table");
  return useMemo(
    (): ColumnDef<Employee>[] => [
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
        size: 150,
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
        accessorKey: "user_type",
        header: t("user_type"),
        enableGlobalFilter: true,
        size: 100,
        cell: ({ row }) => <DataTableUserTypeCell row={row} />,
      },
      {
        header: t("active"),
        accessorKey: "is_active",
        size: 60,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <DataTableChangeStatusCell id="user_id" entityType="user" row={row} />
        ),
      },
      // login
      {
        accessorKey: "login_as",
        header: t("login_as"),
        size: 60,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <DataTableLoginAsCell row={row} />
        ),
      },
    ],
    [t]
  );
};
