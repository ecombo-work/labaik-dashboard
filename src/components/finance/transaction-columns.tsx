"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Transaction } from "@/interfaces/finance";
import { DataTableDateCell } from "@/components/data-table/reuseable";
import { formatPrice } from "@/lib/utils/price-utils";
import { useDirLang } from "@/hooks/use-dir-lang";
import { formatDate } from "date-fns";
export const useTransactionColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<Transaction>[] => [
      {
        accessorKey: "transaction_id",
        header: "#",
        size: 50,
      },
      {
        accessorKey: "created_at",
        header: t("date"),
        // size: 80,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "received_at",
        header: t("received_at"),
        cell: ({ row }) =>
          row.getValue("received_at")
            ? formatDate(row.getValue("received_at"), "yyyy-MM-dd")
            : '-',
      },
      {
        accessorKey: "amount",
        header: t("amount"),
        cell: ({ row }) =>
          formatPrice(row.getValue("amount"), { isRTL: dir === "rtl" }),
      },
      {
        accessorKey: "term.name",
        header: t("term"),
      },
      {
        accessorKey: "account.name",
        header: t("account"),
      },
      {
        accessorKey: "note",
        header: t("note"),
      },
    ],
    [t]
  );
};
