"use client";
import { DataTableDateCell } from "@/components/data-table/reuseable";
import { ContactMessage } from "@/lib/apis/contact";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
export const useColumns = () => {
  const t = useTranslations("data_table");
  return useMemo(
    (): ColumnDef<ContactMessage>[] => [
      {
        accessorKey: "contact_id",
        header: "#",
      },
      {
        accessorKey: "created_at",
        header: t("date"),
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "username",
        header: t("username"),
        cell: ({ row }) =>
          row.original.user.username + "#" + row.original.user.user_id + "",
      },
      {
        accessorKey: "email",
        header: t("email"),
        cell: ({ row }) => row.original.email,
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => row.original.status.toString(),
      },
    ],
    [t]
  );
};
