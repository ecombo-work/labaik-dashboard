"use client";
import OverviewCard from "@/components/ui/overview-card";
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
import { Fragment, Suspense } from "react";
import Loading from "./loading";
import { Title } from "@/components/ui/typography";
import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";

export default function Page() {
  const { dir } = useDirLang();
  const t = useTranslations("overview");
  const { data, isLoading, isFetching } = useGetOverviewQuery();
  const isPending = isLoading || isFetching;
  if (isPending) return <Loading />;
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
    <Fragment>
      <BreadcrumbDropdown title="overview" dropdownItems={[]} />
      <Title is_loading={isPending}>{t("title")}</Title>
      <div className="grid gap-4 lg:grid-cols-12">
        {card_data.map((card, idx) => (
          <OverviewCard
            key={idx}
            name={t(`${card.translationKey}`)}
            value={card.value}
            CardIcon={card.icon}
          />
        ))}
      </div>
    </Fragment>
  );
}
