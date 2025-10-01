"use client";

import DisabledInput from "@/components/disabled-input";
import { ImageZoom } from "@/components/zoom-image";
import { useGetUserReviewQuery } from "@/lib/apis/user";
import { getCountryName } from "@/lib/utils/country-name";
import { formatDate } from "@/lib/utils/date-utils";
import { formatPhone } from "@/lib/utils/international-phone";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";
import ChangeVerification from "./change-verification";
import { Separator } from "@/components/ui/separator";

export default function Page({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = use(params);
  const locale = useLocale() as string;
  const t = useTranslations("data_table");
  const { data, isLoading } = useGetUserReviewQuery({ user_id });
  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No data found</div>;
  const {
    profile_image,
    user_details:{
      verification_status,
      back_national_id,
      front_national_id,
      face_with_national_id,
    },
    country,
    username,
    email,
    phone_number,
    is_active,
    created_at,
    updated_at,
    user_type,
  } = data?.data;
  const disabled_items = [
    {
      label: t("username"),
      value: username,
      with_copy: true,
    },
    {
      label: t("email"),
      value: email,
      with_copy: true,
    },
    {
      label: t("phone_number"),
      value: formatPhone(phone_number, { countryCode: country }),
      with_copy: true,
    },
    {
      label: t("country"),
      value: getCountryName(country, locale),
    },
    {
      label: t("date"),
      value: formatDate(created_at),
    },
  ];
  return (
    <section className="card flex flex-col items-center">
      <div className="flex items-center justify-start w-full gap-4">
        <div className="flex-1/4">
          <ImageZoom src={profile_image} />
        </div>
        <div className="flex-3/4 flex flex-col gap-1">
          {disabled_items.map((item, index) => (
            <DisabledInput
              key={index}
              label={item.label}
              value={item.value ?? ""}
              with_copy={item.with_copy}
            />
          ))}
          <div>
            <ChangeVerification
             label={t("status")}
              user_id={Number(user_id)}
              current_status={verification_status}
            />
          </div>
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div>{t("back_national_id")}</div>
          <ImageZoom src={back_national_id} />

          </div>
          <div className="flex flex-col items-center">  
            <div>{t("front_national_id")}</div>
          <ImageZoom src={front_national_id} />
          </div>
          <div className="flex flex-col items-center">  
            <div>{t("face_with_national_id")}</div>
            
          <ImageZoom src={face_with_national_id} />
            </div>
        </div>
      </div>
    </section>
  );
}
