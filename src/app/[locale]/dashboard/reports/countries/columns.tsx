import { DataTableCountryNameCell } from "@/components/data-table/reuseable";
import { useDirLang } from "@/hooks/use-dir-lang";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<{
      country: string;
      completed_count: number;
      total_count: number;
    }>[] => [
      {
        accessorKey: "country",
        header: t("country"),
        cell: ({ row }) => <DataTableCountryNameCell row={row} />,
      },
      {
        accessorKey: "completed_count",
        header: t("completed_count"),
      },
      {
        accessorKey: "total_count",
        header: t("total_count"),
      },
    ],
    [t, dir]
  );
};
