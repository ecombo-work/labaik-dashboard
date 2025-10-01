"use client";
import {
  DataTableDateCell,
  DataTableUserCell,
} from "@/components/data-table/reuseable";
import { ContactMessage } from "@/lib/apis/contact";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import ChangeStatus from "./change-status";
import { DataTableActionCell } from "@/components/data-table/cell-actions";
export const useColumns = () => {
  const t = useTranslations("data_table");
  return useMemo(
    (): ColumnDef<ContactMessage>[] => [
      {
        accessorKey: "contact_id",
        header: "#",
        size: 50,
      },
      {
        accessorKey: "created_at",
        header: t("date"),
        size: 150,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "username",
        header: t("username"),
        cell: ({ row }) => (
          <DataTableUserCell
            accessorKey={row.original.user.username}
            id_key={row.original.user.user_id.toString()}
          />
        ),
      },
      {
        accessorKey: "email",
        header: t("email"),
        cell: ({ row }) => row.original.email,
      },
      {
        accessorKey: "status",
        header: t("status"),
        size: 180,
        cell: ({ row }) => (
          <ChangeStatus
            id={row.original.contact_id.toString()}
            status={row.original.status}
          />
        ),
      },
      {
        header: t("actions"),
        size: 80,
        cell: ({ row }) => (
          <DataTableActionCell
            icon="view"
            row={row}
            path="/dashboard/contact-messages"
            id_path="contact_id"
          />
        ),
      },
    ],
    [t]
  );
};
