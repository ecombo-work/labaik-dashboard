import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useDirLang } from "@/hooks/use-dir-lang";
import { UmrahRequest } from "@/interfaces/umrah";
import { DataTableActionCell } from "@/components/data-table/cell-actions";
import UmrahStatusBadge from "@/components/umrah-status-badge";
import { formatPrice } from "@/lib/utils/price-utils";
import { DataTableDateCell } from "@/components/data-table/reuseable";
//memo
export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<UmrahRequest>[] => [
      {
        header: "#",
        accessorKey: "umrah_id",
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
        accessorKey: "created_by.username",
        header: t("seeker"),
        size: 150,
        cell: ({ row }) =>
          row.original.created_by?.username +
          " #" +
          row.original.created_by?.user_id +
          "",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "price",
        header: t("price"),
        size: 150,
        cell: ({ row }) =>
          formatPrice(row.getValue("price"), { isRTL: dir === "rtl" }),
        enableGlobalFilter: true,
      },
      {
        accessorKey: "assigned_to.username",
        header: t("performer"),
        size: 150,
        cell: ({ row }) =>
          row.original.assigned_to
            ? row.original.assigned_to.username +
              " #" +
              row.original.assigned_to?.user_id +
              ""
            : "__",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "status",
        header: t("status"),
        size: 150,
        cell: ({ row }) => <UmrahStatusBadge status={row.getValue("status")} />,
        enableGlobalFilter: true,
      },
      {
        header: t("actions"),
        size: 80,
        cell: ({ row }) => (
          <DataTableActionCell
            row={row}
            path="dashboard/umrah/requests/lost"
            is_full_path
            icon="view"
            id_path="umrah_id"
          />
        ),
      },
    ],
    [t, dir]
  );
};
