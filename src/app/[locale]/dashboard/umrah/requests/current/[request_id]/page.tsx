"use client";
import { useGetUmrahDetailsQuery } from "@/lib/apis/umrah";
import { useTranslations } from "next-intl";
import React, { use } from "react";
import { UmrahDetailsCard } from "./details-card";
import { useDirLang } from "@/hooks/use-dir-lang";
import { PersonCard } from "./person-card";
import PricingCard from "./pricing-card";
import { ProgressCard } from "./progrees-card";
import UserCard from "./user-card";
import OffersCard from "./offers-card";
import HistoryCard from "./history-card";

export default function Page({
  params,
}: {
  params: Promise<{ request_id: string }>;
}) {
  const { dir, lang } = useDirLang();
  const t = useTranslations("umrah_details");
  const { request_id } = use(params);
  const { data, isLoading, refetch, isFetching } = useGetUmrahDetailsQuery({
    umrah_id: request_id,
  });
  if (isLoading || isFetching) {
    return <section>Loading...</section>;
  }
  if (!data?.data) {
    return <section>Not Found</section>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* First Row: Umrah Details */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UmrahDetailsCard umrah={data.data} t={t} dir={dir} />
        <PersonCard person={data.data.person} t={t} />
        <PricingCard pricing={data.data.pricing} t={t} dir={dir} />
      </div>

      {/* Second Row: Progress, Offers, Users */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Progress + Offers */}
        <div className="md:col-span-2 space-y-4 order-2 md:order-1">
          <ProgressCard progress={data.data.progress} t={t} dir={dir} />
          <OffersCard offers={data.data.offers} t={t} dir={dir} />
        </div>

        {/* Right: Users */}
        <div className="space-y-4 order-1 md:order-2">
          <UserCard user={data.data.created_by} t={t} locale={lang} />
          <UserCard
            user={data.data.assigned_to}
            t={t}
            locale={lang}
            is_performer
          />
        </div>
      </div>

      {/* Third Row: History */}
      <div className="lg:col-span-3">
        <HistoryCard history={data.data.history} t={t} />
      </div>
    </div>
  );
}
