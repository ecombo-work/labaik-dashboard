"use client";
import { useDirLang } from "@/hooks/use-dir-lang";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { IDonations } from "@/interfaces/donations";
import ImageWithLoading from "@/components/image-with-loader";
import Link from "next/link";
import { Eye } from "lucide-react";
import { DataTableDateCell } from "@/components/data-table/reuseable";
import { DataTableChangeStatusCell } from "@/components/data-table/change-status-cell";
import { DataTableActionCell } from "@/components/data-table/cell-actions";
import { DataTableDeleteCell } from "@/components/data-table/delete-cell";
import React from "react";
export const useColumns = () => {
  const t = useTranslations("data_table");
  const { dir } = useDirLang();
  return useMemo(
    (): ColumnDef<IDonations>[] => [
      {
        accessorKey: "association_id",
        header: "#",
        size: 50,
        maxSize: 50,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "created_at",
        header: t("created_at"),
        size: 80,
        cell: ({ row }) => <DataTableDateCell row={row} />,
      },
      {
        accessorKey: "name",
        header: t("name"),
        // size: 150,
        enableGlobalFilter: true,
        cell: ({ row }) => {
          const name = row.original.name;

          // Split by spaces → group into chunks of 2 words
          const words = name.split(" ");
          const chunks: string[] = [];
          for (let i = 0; i < words.length; i += 2) {
            chunks.push(words.slice(i, i + 2).join(" "));
          }

          return (
            <span>
              {chunks.map((chunk, index) => (
                <React.Fragment key={index}>
                  {chunk}
                  <br />
                </React.Fragment>
              ))}
            </span>
          );
        },
      },
      {
        accessorKey: "image_url",
        header: t("image_url"),
        size: 80,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <div className="w-full flex items-center justify-center">
            <div className="w-14 h-14">
              <ImageWithLoading
                src={row.original.image_url}
                alt={row.original.name}
                width={64}
                height={64}
                loaderClassName="bg-gray-200"
                imageClassName="rounded-lg object-contain"
              />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "visits",
        header: t("visits"),
        size: 50,

        enableGlobalFilter: true,
      },
      {
        accessorKey: "is_active",
        header: t("active"),
        size: 50,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <DataTableChangeStatusCell
            entityType="association"
            id="association_id"
            row={row}
          />
        ),
      },
      {
        accessorKey: "link",
        header: t("view"),
        size: 50,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Link target="_blank" href={row.original.link}>
              <Eye className="size-5" />
            </Link>
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: t("actions"),
        size: 50,
        enableGlobalFilter: true,
        cell: ({ row }) => (
          <DataTableDeleteCell row={row} entityType="association" />
          // <div className="flex items-center justify-center gap-2">
          //   <DataTableActionCell
          //     row={row}
          //     path="donations"
          //     id_path="association_id"
          //     icon="edit"
          //   />
          //   <DataTableActionCell
          //     row={row}
          //     path="donations"
          //     id_path="association_id"
          //     icon="delete"
          //   />
          // </div>
        ),
      },
    ],
    [t, dir]
  );
};
