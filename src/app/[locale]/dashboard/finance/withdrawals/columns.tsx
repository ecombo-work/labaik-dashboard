"use client";
import { DataTableActionCell } from "@/components/data-table/cell-actions";
import {
  DataTableDateCell,
  DataTableUserCell,
  DataTableWithdrawalMethodCell,
  DataTableWithdrawalStatusCell,
} from "@/components/data-table/reuseable";
import { useDirLang } from "@/hooks/use-dir-lang";
import { Withdrawal } from "@/interfaces/withdrawal";
import { formatPrice } from "@/lib/utils/price-utils";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<Withdrawal>[] => [
      {
        accessorKey: "withdrawal_id",
        header: "#",
        size: 50,
      },
      {
        accessorKey: "created_at",
        header: t("date"),
        size: 180,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "user.username",
        header: t("performer"),
        cell: ({ row }) => (
          <DataTableUserCell
            accessorKey={row.original.user?.username}
            id_key={row.original.user?.user_id}
          />
        ),
      },

      {
        accessorKey: "method",
        header: t("payment_method"),
        cell: ({ row }) => <DataTableWithdrawalMethodCell row={row} />,
      },
      {
        accessorKey: "amount",
        header: t("amount"),
        size: 50,
        cell: ({ row }) =>
          formatPrice(row.getValue("amount"), { isRTL: dir === "rtl" }),
      },
      {
        accessorKey: "status",
        header: t("status"),
        size: 150,
        cell: ({ row }) => <DataTableWithdrawalStatusCell row={row} />,
      },

      {
        header: t("actions"),
        size: 80,
        cell: ({ row }) => (
          <DataTableActionCell
            row={row}
            path="dashboard/finance/withdrawals"
            is_full_path
            icon="view"
            id_path="withdrawal_id"
            query={{ method: row.getValue("method") }}
          />
        ),
      },
    ],
    [t, dir]
  );
};
