"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Term } from "@/interfaces/finance";
import { DataTableDateCell } from "../data-table/reuseable";
export const useTermsColumns = () => {
  const t = useTranslations("data_table");
  return useMemo(
    (): ColumnDef<Term>[] => [
      {
        accessorKey: "created_at",
        header: t("date"),
        
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "name",
        header: t("term"),
      },
    ],
    [t]
  );
};