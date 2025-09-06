import React from "react";
import { ApiResponse } from "@/interfaces/response";
import { UmrahReportResponse } from "@/interfaces/reports";
import OverviewCard from "@/components/ui/overview-card";
import { useTranslations } from "next-intl";
import {
  IconCash,
  IconFileDescription,
  IconProgressCheck,
  IconProgressX,
  IconTax,
  IconUserDollar,
} from "@tabler/icons-react";
import { formatNumber } from "@/lib/utils/number-util";
import { formatPrice } from "@/lib/utils/price-utils";
import { useDirLang } from "@/hooks/use-dir-lang";
interface SummaryProps {
  data: UmrahReportResponse["summary"];
}

function Summary({ data }: { data: UmrahReportResponse["summary"] }) {
  const t = useTranslations("reports");
  const cards = [
    {
      key: "total_umrah_count",
      name: t("all_in_range"),
      icon: IconFileDescription,
      currency: false,
    },
    {
      key: "completed_count",
      name: t("completed"),
      icon: IconProgressCheck,
      currency: false,
    },
    {
      key: "cancelled_count",
      name: t("cancelled"),
      icon: IconProgressX,
      currency: false,
    },
    {
      key: "company_revenue",
      name: t("company_revenue"),
      icon: IconCash,
      currency: true,
    },
    {
      key: "performer_revenue",
      name: t("performer_revenue"),
      icon: IconUserDollar,
      currency: true,
    },
    { key: "vat", name: t("vat"), icon: IconTax, currency: true },
  ] as const;
  const { dir } = useDirLang();
  return (
    <section className="grid lg:grid-cols-12 gap-4">
      {cards.map(({ key, name, icon: Icon, currency }) => (
        <OverviewCard
          key={key}
          name={name}
          value={
            currency
              ? formatPrice(data?.[key], {
                  isRTL: dir === "rtl",
                })
              : formatNumber(data?.[key])
          }
          CardIcon={Icon}
        />
      ))}
    </section>
  );
}
Summary.displayName = "Summary";

export default Summary;
