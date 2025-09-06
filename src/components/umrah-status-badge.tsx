import { UmrahStatus } from "@/constants/umrah";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

export const statusColors: Record<UmrahStatus, string> = {
  // Success States
  [UmrahStatus.PAYMENT_COMPLETED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  [UmrahStatus.ACCEPTED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  [UmrahStatus.COMPLETED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",

  // Informational States
  [UmrahStatus.RECEIVING_OFFERS]:
    "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  [UmrahStatus.OFFER_ACCEPTED]:
    "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  [UmrahStatus.STARTING_SOON]:
    "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  [UmrahStatus.IN_PROGRESS]:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",

  // Warning States
  [UmrahStatus.AWAITING_PAYMENT]:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",

  // Failure & Cancellation States
  [UmrahStatus.PAYMENT_FAILED]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  [UmrahStatus.CANCELLED_BY_PERFORMER]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  [UmrahStatus.CANCELLED_BY_SEEKER]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  [UmrahStatus.CANCELLED_BY_ADMIN]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  [UmrahStatus.SYSTEM_AUTO_CANCELLED]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  [UmrahStatus.PAYMENT_TIMEOUT]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",

  // Neutral/Expired
  [UmrahStatus.REQUEST_EXPIRED]:
    "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200",
};

export const getStatusKey = (status: UmrahStatus) => {
  return (
    Object.entries(UmrahStatus).find(([_, value]) => value === status)?.[0] ||
    ""
  );
};
function UmrahStatusBadge({ status }: { status: UmrahStatus }) {
  const t = useTranslations("data_table.umrah.status");
  const statusKey = getStatusKey(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition",
        statusColors[status]
      )}
    >
      {t(statusKey.toLowerCase()) || status}
    </span>
  );
}

export default UmrahStatusBadge;
