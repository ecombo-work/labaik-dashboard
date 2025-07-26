"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";
import { Badge } from "./badge";
import {
  IconUsersGroup,
  IconUsers,
  IconUser,
  IconUserShield,
  IconFileDescription,
  IconClockHour4,
  IconCircleCheck,
  IconClockCheck,
  IconStopwatch,
  IconProgressCheck,
  IconProgress,
  IconProgressX,
  IconDots,
  IconCurrencyDollar,
  IconTax,
  IconWorldDollar,
  IconUserDollar,
  IconCash,
  IconDatabaseDollar,
  IconRosetteDiscountCheck,
  IconOctagonMinus,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useGetOverviewQuery } from "@/lib/apis/overview";
import { formatNumber } from "@/lib/utils/number-util";
import { formatPrice } from "@/lib/utils/price-utils";
import { useDirLang } from "@/hooks/use-dir-lang";

function OverviewCard() {
  const t = useTranslations("overview");
  const { data } = useGetOverviewQuery();
  const { dir } = useDirLang();
  console.log("=====================================");
  console.log(data?.data);
  console.log("=====================================");
  const card_data = [
    {
      translationKey: "total_users",
      value: formatNumber(data?.data?.total_users || 0),
      icon: IconUsersGroup,
    },
    {
      translationKey: "performers",
      value: formatNumber(data?.data?.performers || 0),
      icon: IconUsers,
    },
    {
      translationKey: "seekers",
      value: formatNumber(data?.data?.seekers || 0),
      icon: IconUser,
    },
    {
      translationKey: "employees",
      value: formatNumber(data?.data?.employees || 0),
      icon: IconUserShield,
    },
    {
      translationKey: "requests",
      value: formatNumber(data?.data?.requests || 0),
      icon: IconFileDescription,
    },
    {
      translationKey: "in_waiting",
      value: formatNumber(data?.data?.in_waiting || 0),
      icon: IconClockHour4,
    },
    {
      translationKey: "accepted",
      value: formatNumber(data?.data?.accepted || 0),
      icon: IconClockCheck,
    },
    {
      translationKey: "in_progress",
      value: formatNumber(data?.data?.in_progress || 0),
      icon: IconProgress,
    },
    {
      translationKey: "completed",
      value: formatNumber(data?.data?.completed || 0),
      icon: IconProgressCheck,
    },
    {
      translationKey: "cancelled",
      value: formatNumber(data?.data?.cancelled || 0),
      icon: IconProgressX,
    },
    {
      translationKey: "other_requests",
      value: formatNumber(data?.data?.other_requests || 0),
      icon: IconDots,
    },
    {
      translationKey: "total_revenue",
      value: formatPrice(data?.data?.total_revenue || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconWorldDollar,
    },
    {
      translationKey: "umrah_revenues",
      value: formatPrice(data?.data?.umrah_revenues || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconCurrencyDollar,
    },
    {
      translationKey: "performers_revenues",
      value: formatPrice(data?.data?.performers_revenues || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconUserDollar,
    },
    {
      translationKey: "company_revenues",
      value: formatPrice(data?.data?.company_revenues || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconCash,
    },
    {
      translationKey: "vat",
      value: formatPrice(data?.data?.vat || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconTax,
    },
    {
      translationKey: "other_revenues",
      value: formatPrice(data?.data?.other_revenues || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconDatabaseDollar,
    },
    {
      translationKey: "using_coupons",
      value: formatNumber(data?.data?.using_coupons || 0),
      icon: IconRosetteDiscountCheck,
    },
    {
      translationKey: "discounted_amount",
      value: formatPrice(data?.data?.discounted_amount || 0, {
        isRTL: dir === "rtl",
      }),
      icon: IconOctagonMinus,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-3">
      {card_data.map((card, idx) => (
        <Card
          key={idx}
          className="@container/card bg-card gap-4 shadow-sm !py-4 relative overflow-hidden group rtl:space-x-reverse"
        >
          <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 rtl:right-auto rtl:left-0 rtl:-ml-10 rtl:mr-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full transform transition-all duration-500 group-hover:scale-150 group-hover:opacity-40"></div>
          <CardHeader className="flex items-center justify-between px-4 rtl:space-x-reverse">
            <CardDescription className="text-base">
              {t(`${card.translationKey}`)}
            </CardDescription>

            <CardAction className="size-9  rounded-full bg-secondary flex justify-center items-center">
              <card.icon className="!text-white" stroke={2} />
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            <CardTitle className="text-3xl font-bold w-full">
              {card.value}
            </CardTitle>
            {/* <Tooltip>
              <TooltipTrigger>
                <CardTitle className="text-3xl font-bold w-full">
                  {card.value}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent className="TooltipContent">
                <p>{card.tooltip}</p>
              </TooltipContent>
            </Tooltip> */}
          </CardContent>
          <div className="absolute top-0  w-1 h-full rtl:right-0 ltr:left-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Card>
      ))}
    </div>
  );
}

export default OverviewCard;
