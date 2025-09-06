import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlusCircle,
  ThumbsDown,
  CheckCircle,
  Ban,
  Clock,
  CreditCard,
  AlertCircle,
  Loader2,
  CheckCheck,
  UserPlus,
  Users,
  XCircle,
  Trash2,
  RefreshCcw,
  ArrowRightCircle,
  ArrowLeftCircle,
  Flag,
  BadgeCheck,
  CircleCheckBig,
} from "lucide-react";

import { UmrahDetailsResponse } from "@/interfaces/umrah";
import { useTranslations } from "next-intl";
import { UmrahAction } from "@/constants/umrah";
import { IconHistory } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date-utils";
const getAction = (t: any, action: UmrahAction) => {
  const actions: Record<
    UmrahAction,
    { icon: any; bg: string; text: string; label: string }
  > = {
    [UmrahAction.UMRAH_REQUEST_CREATED]: {
      icon: PlusCircle,
      bg: "bg-blue-100",
      text: "text-blue-600",
      label: t("history.umrah_actions.0"),
    },
    [UmrahAction.OFFER_CREATED]: {
      icon: PlusCircle,
      bg: "bg-blue-100",
      text: "text-blue-600",
      label: t("history.umrah_actions.1"),
    },
    [UmrahAction.OFFER_REJECTED]: {
      icon: ThumbsDown,
      bg: "bg-red-100",
      text: "text-red-500",
      label: t("history.umrah_actions.2"),
    },
    [UmrahAction.OFFER_ACCEPTED]: {
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-600",
      label: t("history.umrah_actions.3"),
    },
    [UmrahAction.OFFER_DECLINED]: {
      icon: Ban,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      label: t("history.umrah_actions.4"),
    },
    [UmrahAction.AWAITING_PAYMENT]: {
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-500",
      label: t("history.umrah_actions.5"),
    },
    [UmrahAction.PAYMENT_COMPLETED]: {
      icon: CreditCard,
      bg: "bg-green-100",
      text: "text-green-600",
      label: t("history.umrah_actions.6"),
    },
    [UmrahAction.PAYMENT_FAILED]: {
      icon: AlertCircle,
      bg: "bg-red-100",
      text: "text-red-500",
      label: t("history.umrah_actions.7"),
    },
    [UmrahAction.REQUEST_STARTING_SOON]: {
      icon: Clock,
      bg: "bg-blue-100",
      text: "text-blue-500",
      label: t("history.umrah_actions.9"),
    },
    [UmrahAction.REQUEST_IN_PROGRESS]: {
      icon: Loader2,
      bg: "bg-indigo-100",
       text: "text-indigo-500",
      label: t("history.umrah_actions.10"),
    },
    [UmrahAction.REQUEST_COMPLETED]: {
      icon: CheckCheck,
      bg: "bg-green-100",
      text: "text-green-700",
      label: t("history.umrah_actions.11"),
    },
    [UmrahAction.PERFORMER_ASSIGNED]: {
      icon: UserPlus,
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      label:   t("history.umrah_actions.12"),
    },
    [UmrahAction.PERFORMER_CHANGED]: {
      icon: Users,
      bg: "bg-purple-100",
      text: "text-purple-600",
      label: t("history.umrah_actions.13"),
    },
    [UmrahAction.CANCELLED_BY_PERFORMER]: {
      icon: XCircle,
      bg: "bg-red-100",
      text: "text-red-500",
      label: t("history.umrah_actions.14"),
    },
    [UmrahAction.CANCELLED_BY_SEEKER]: {
      icon: Trash2,
      bg: "bg-orange-100",
      text: "text-orange-500",
      label: t("history.umrah_actions.15"),
    },
    [UmrahAction.CANCELLED_BY_ADMIN]: {
      icon: AlertCircle,
      bg: "bg-rose-100",
      text: "text-rose-600",
      label: t("history.umrah_actions.16"),
    },
    [UmrahAction.SYSTEM_AUTO_CANCELLED]: {
      icon: RefreshCcw,
      bg: "bg-gray-100",
      text: "text-gray-500",
      label: t("history.umrah_actions.18"),
    },
    [UmrahAction.START_IHRAM]: {
      icon: ArrowRightCircle,
      bg: "bg-blue-100",
      text: "text-blue-500",
      label: t("history.umrah_actions.20"),
    },
    [UmrahAction.START_TAWAF]: {
      icon: ArrowRightCircle,
      bg: "bg-teal-100",
      text: "text-teal-600",
      label: t("history.umrah_actions.21"),
    },
    [UmrahAction.START_SAI]: {
      icon: ArrowRightCircle,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      label: t("history.umrah_actions.22"),
    },
    [UmrahAction.END_IHRAM]: {
      icon: ArrowLeftCircle,
      bg: "bg-blue-100",
      text: "text-blue-400",
      label: t("history.umrah_actions.23"),
    },
    [UmrahAction.END_TAWAF]: {
      icon: ArrowLeftCircle,
      bg: "bg-teal-100",
      text: "text-teal-500",
      label: t("history.umrah_actions.24"),
    },
    [UmrahAction.END_SAI]: {
      icon: ArrowLeftCircle,
      bg: "bg-emerald-100",
      text: "text-emerald-500",
      label: t("history.umrah_actions.25"),
    },
  };

  return actions[action];
};
function HistoryCard({
  history,
  t,
}: {
  history: UmrahDetailsResponse["history"];
  t: any;
}) {
 
  if (!history?.length) {
    return (
      <Card className="p-4 space-y-4">
        <CardHeader className="p-0 flex items-center gap-2">
          <div className="p-2 rounded-full bg-muted text-muted-foreground">
            <IconHistory size={20} />
          </div>
          <CardTitle className="text-base font-semibold">
            {t("history.history")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="text-muted-foreground text-sm mb-2">
            {t("no_history_available")}
          </div>
          <div className="text-muted-foreground/50 text-xs">
            {t("check_back_later")}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      <CardHeader className="p-0 flex items-center gap-2">
        <div className="p-2 rounded-full bg-muted text-muted-foreground">
          <IconHistory size={20} />
        </div>
        <CardTitle className="text-base font-semibold">
          {t("history.history")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 p-0">
        <ol className="space-y-4 relative">
          {history.map((entry) => {
            const { icon: Icon, bg, text, label } = getAction(t, entry.action);

            return (
              <li
                key={entry.history_id}
                className="flex items-start gap-3 relative"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    bg,
                    text
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(entry.created_at)}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}

export default HistoryCard;
