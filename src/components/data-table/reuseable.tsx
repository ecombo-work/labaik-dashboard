"use client";
import { Column, Row, Table } from "@tanstack/react-table";
import { TZDate } from "@date-fns/tz";
import { JSX } from "react";
import { Checkbox } from "../ui/checkbox";
import { formatPhone } from "@/lib/utils/international-phone";
import { getCountryName } from "@/lib/utils/country-name";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils/date-utils";
import { CountryCode } from "libphonenumber-js";
import { UserType } from "@/lib/roles";
import { WithdrawalMethod, WithdrawalStatus } from "@/constants/withdrawal";
import { format } from "date-fns";

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
export function DataTableUserCell({
  accessorKey,
  id_key,
}: {
  accessorKey: string;
  id_key: string;
}): JSX.Element {
  return (
    <div className="leading-5">
      <p>
        #{id_key}{" "}
        {accessorKey}
      </p>
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
  const rawDate = row.getValue("created_at") as Date;
  const ts_date = new TZDate(rawDate, "Asia/Riyadh");
  return (
    <div className="leading-normal">
      <p>{format(ts_date, "yyyy-MM-dd hh:mm a")}</p>
    </div>
  );
}
// Map of UserType enum values to their string keys
export const userTypeToString = (user_type: UserType): string => {
  return (
    Object.entries(UserType).find(([_, value]) => value === user_type)?.[0] ||
    ""
  );
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
    <div className="flex items-center justify-center">{t(userTypeKey)}</div>
  );
}
export const withdrawalMethodToString = (method: WithdrawalMethod): string => {
  return (
    Object.entries(WithdrawalMethod).find(
      ([_, value]) => value === method
    )?.[0] || ""
  );
};

export function DataTableWithdrawalMethodCell<TData, TValue>({
  row,
}: {
  row: Row<TData>;
}) {
  const t = useTranslations("data_table.withdrawal_methods");
  const methodValue = row.getValue("method") as WithdrawalMethod;
  const methodKey = withdrawalMethodToString(methodValue);
  return <div className="flex items-center justify-center">{t(methodKey)}</div>;
}

export const withdrawalStatusToString = (status: WithdrawalStatus): string => {
  return (
    Object.entries(WithdrawalStatus).find(
      ([_, value]) => value === status
    )?.[0] || ""
  );
};
export function DataTableWithdrawalStatusCell<TData, TValue>({
  row,
}: {
  row: Row<TData>;
}) {
  const t = useTranslations("data_table.withdrawal_status");
  const statusValue = row.getValue("status") as WithdrawalStatus;
  const statusKey = withdrawalStatusToString(statusValue);

  // Map status to badge classes
  const statusClasses = {
    [WithdrawalStatus.PENDING]:
      "bg-yellow-100 text-yellow-800 border border-yellow-200",
    [WithdrawalStatus.APPROVED]:
      "bg-green-100 text-green-800 border border-green-200",
    [WithdrawalStatus.REJECTED]:
      "bg-red-100 text-red-800 border border-red-200",
  }[statusValue];

  return (
    <div className="flex items-center justify-center">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}
      >
        {t(statusKey)}
      </span>
    </div>
  );
}
