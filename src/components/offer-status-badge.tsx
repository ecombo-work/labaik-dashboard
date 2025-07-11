import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { OfferStatus } from "@/constants/umrah";
import { Clock4Icon, CheckCircle2Icon, XCircleIcon, ClockIcon } from "lucide-react";

interface StatusConfig {
  [key: string]: {
    bg: string;
    icon: React.ReactNode;
  };
}

export const getStatusKey = (status: OfferStatus): string => {
  return Object.entries(OfferStatus).find(([_, value]) => value === status)?.[0] || "";
};

const statusConfig: StatusConfig = {
  [OfferStatus.PENDING]: {
    bg: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: <Clock4Icon className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />,
  },
  [OfferStatus.ACCEPTED]: {
    bg: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: <CheckCircle2Icon className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />,
  },
  [OfferStatus.REJECTED]: {
    bg: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: <XCircleIcon className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />,
  },
  [OfferStatus.CANCELLED]: {
    bg: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    icon: <ClockIcon className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />,
  },
};

interface OfferStatusBadgeProps {
  status: OfferStatus;
  className?: string;
}

export function OfferStatusBadge({ status, className }: OfferStatusBadgeProps) {
  const t = useTranslations("umrah_details.offer.offer_status");
  const statusKey = getStatusKey(status);
  const config = statusConfig[status] || statusConfig[OfferStatus.PENDING];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap mr-2 rtl:ml-2 rtl:mr-0",
        config.bg,
        className
      )}
    >
      {config.icon}
      {t(statusKey.toLowerCase()) || statusKey}
    </span>
  );
}

export default OfferStatusBadge;
