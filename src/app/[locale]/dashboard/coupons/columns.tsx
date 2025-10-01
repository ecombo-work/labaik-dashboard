"use client";
import { DataTableChangeStatusCell } from "@/components/data-table/change-status-cell";
import {
  DataTableDateCell,
} from "@/components/data-table/reuseable";
import { Coupon } from "@/interfaces/coupon";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DiscountType } from "./create-new";
import { formatPrice } from "@/lib/utils/price-utils";
import { useDirLang } from "@/hooks/use-dir-lang";
import { formatNumber } from "@/lib/utils/number-util";
export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<Coupon>[] => [
      {
        header: "#",
        accessorKey: "coupon_id",
        enableGlobalFilter: true,
        size: 50,
      },
      {
        accessorKey: "created_at",
        header: t("created_at"),
        size: 80,
        enableGlobalFilter: false,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "code",
        header: t("code"),
        size: 100,
        enableGlobalFilter: true,
      },
      {
        // accessorKey:,
        header: t("valid_date"),
        size: 100,
        enableGlobalFilter: true,
        cell: ({ row }) => {
          const valid_from = row.original.valid_from
            && formatDate(row.original.valid_from, "yyyy-MM-dd")
          const valid_to = row.original.valid_to && formatDate(row.original.valid_to, "yyyy-MM-dd") ;
          return (
            <div className="flex flex-col items-center justify-center">
             {valid_from}
             <br />
             {valid_to}
            </div>
          );
        },
      },
      {
        accessorKey: "discount",
        header: t("discount"),
        size: 100,
        enableGlobalFilter: true,
        cell: ({ row }) => {
          const discount_type = row.original.discount_type as DiscountType;
          const discount_value = row.original.discount_value;
          return (
            <>
              {discount_type === DiscountType.PERCENTAGE
                ? `${formatNumber(discount_value)}%`
                : discount_type === DiscountType.FIXED
                ? formatPrice(discount_value, { isRTL: dir === "rtl" })
                : "_"}
            </>
          );
        },
      },
      {
        accessorKey: "used_count",
        header: t("used_count"),
        size: 100,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "max_uses",
        header: t("max_uses"),
        size: 100,
        enableGlobalFilter: true,
      },

      {
        accessorKey: "is_active",
        header: t("active"),
        size: 60,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <DataTableChangeStatusCell
            entityType="coupon"
            id="coupon_id"
            row={row}
          />
        ),
      },
    ],
    [t]
  );
};
