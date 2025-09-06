import { DataTableCountryNameCell } from "@/components/data-table/reuseable";
import { useDirLang } from "@/hooks/use-dir-lang";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
interface Top15Users {
  username: string;
  country: string;
  completed_count: number;
}
export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo((): ColumnDef<Top15Users>[] => [
    {
      accessorKey: "username",
      header: t("username"),
    },
    {
      accessorKey: "country",
      header: t("country"),
      cell: ({ row }) => <DataTableCountryNameCell row={row} />,
    },
    {
      accessorKey: "completed_count",
      header: t("completed_count"),
    },
  ], [t, dir]);
};
