"use client";
import { Column, Row, Table } from "@tanstack/react-table";

import { JSX } from "react";
import { Checkbox } from "../ui/checkbox";
import { formatPhone } from "@/lib/utils/international-phone";
import { getCountryName } from "@/lib/utils/country-name";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils/date-utils";
import { CountryCode } from "libphonenumber-js";
import { UserType } from "@/lib/roles";

interface DataTableCheckboxHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export function DataTableCheckboxHeader<TData, TValue>({
  table,
}: DataTableCheckboxHeaderProps<TData, TValue>) {
  return (
    <div className=" flex items-center justify-center mx-2">
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    </div>
  );
}

export function DataTableSelectCell<TData, TValue>({
  row,
}: {
  row: Row<TData>;
}): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    </div>
  );
}

export function DataTablePhoneCell<
  TData extends { country: CountryCode },
  TValue
>({ row }: { row: Row<TData> }) {
  return (
    <div className="flex items-center justify-center">
      {formatPhone(row.getValue("phone_number"), {
        countryCode: row.original.country,
      })}
    </div>
  );
}

export function DataTableCountryNameCell<TData, TValue>({
  row,
}: {
  row: Row<TData>;
}) {
  const locale = useLocale();
  return (
    <div className="flex items-center justify-center">
      {getCountryName(row.getValue("country"), locale)}
    </div>
  );
}
// format date
export function DataTableDateCell<TData, TValue>({ row }: { row: Row<TData> }) {
  return (
    <div className="flex items-center justify-center">
      {formatDate(row.getValue("created_at"))}
    </div>
  );
}
// Map of UserType enum values to their string keys
export const userTypeToString = (user_type: UserType): string => {
 return Object.entries(UserType).find(([_, value]) => value === user_type)?.[0] || "";
};

export function DataTableUserTypeCell<TData, TValue>({
  row,
}: {
  row: Row<TData>;
}) {
  const t = useTranslations("data_table.roles");
  const userTypeValue = row.getValue("user_type") as UserType;
  const userTypeKey = userTypeToString(userTypeValue);
  return (
    <div className="flex items-center justify-center">
      {t(userTypeKey)}
    </div>
  );
}
