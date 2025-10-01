"use client";
import { useGetUmrahDetailsQuery } from "@/lib/apis/umrah";
import { useTranslations } from "next-intl";
import React, { use } from "react";
import { UmrahDetailsCard } from "./details-card";
import { useDirLang } from "@/hooks/use-dir-lang";
import { PersonCard } from "./person-card";
import PricingCard from "./pricing-card";
import UserCard from "./user-card";
import OffersCard from "./offers-card";
import HistoryCard from "./history-card";
import { ProgressCard } from "./progress-card";
import Loader from "./loader";
import { differenceInHours } from "date-fns";
import { Button } from "@/components/ui/button";
import { IconReplaceUser } from "@tabler/icons-react";
import { UmrahStatus } from "@/constants/umrah";
import Reassign from "./reassign";
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
    return <Loader />;
  }
  if (!data?.data) {
    return <section>Not Found</section>;
  }
  function checkLastAction(
    status: UmrahStatus,
    history: Array<{ created_at: string; performed_by: { user_id: number } }>,
    user_id: number
  ): {
    isPastFourHours: boolean;
    isNotCompleted: boolean;
    hoursDiff: number;
    is_assigned_to: boolean;
  } {
    const now = new Date();

    // find the last action for this user
    const lastAction = [...history]
      .reverse()
      .find((h) => h.performed_by.user_id === user_id);

    if (!lastAction) {
      return {
        isPastFourHours: false,
        isNotCompleted: false,
        hoursDiff: 0,
        is_assigned_to: false,
      };
    }

    const lastActionDate = new Date(lastAction.created_at);
    const hoursDiff = differenceInHours(now, lastActionDate);
    const is_assigned_to = user_id ? true : false;
    const isPastFourHours = hoursDiff > 4;
    const isNotCompleted = ![
      UmrahStatus.CANCELLED_BY_ADMIN,
      UmrahStatus.CANCELLED_BY_PERFORMER,
      UmrahStatus.CANCELLED_BY_SEEKER,
      UmrahStatus.COMPLETED,
      UmrahStatus.SYSTEM_AUTO_CANCELLED,
    ].includes(status);
    if (is_assigned_to && isPastFourHours && isNotCompleted) {
      return {
        is_assigned_to,
        isPastFourHours,
        isNotCompleted,
        hoursDiff,
      };
    }
    return {
      isPastFourHours: false,
      isNotCompleted: false,
      hoursDiff: 0,
      is_assigned_to,
    };
  }
  const { isPastFourHours, isNotCompleted, hoursDiff, is_assigned_to } =
    checkLastAction(
      data.data.status,
      data.data.history,
      data.data.assigned_to?.user_id
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        {isPastFourHours && isNotCompleted && is_assigned_to && (
          <Reassign umrah_id={data.data.umrah_id} />
          // <Button>
          //   {t("reassign")}
          //   <IconReplaceUser className="text-white" />
          // </Button>
        )}
      </div>
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
    </>
  );
}
