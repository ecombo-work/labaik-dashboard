"use client";
import { DataTableDateCell } from "@/components/data-table/reuseable";
import { useDirLang } from "@/hooks/use-dir-lang";
import { Account } from "@/interfaces/finance";
import { formatNumber } from "@/lib/utils/number-util";
import { formatPrice } from "@/lib/utils/price-utils";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<Account>[] => [
      {
        accessorKey: "account_id",
        header: "#",
      },
      {
        accessorKey: "created_at",
        header: t("created_at"),
        size: 80,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "name",
        header: t("account_name"),
      },

      {
        accessorKey: "balance",
        header: t("balance"),
        cell: ({ row }) =>
          formatPrice(row.getValue("balance"), { isRTL: dir === "rtl" }),
      },
    ],
    [t]
  );
};
