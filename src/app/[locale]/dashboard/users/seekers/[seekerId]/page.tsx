"use client";

import DisabledInput from "@/components/disabled-input";
import { Card, CardContent } from "@/components/ui/card";
import { ImageZoom } from "@/components/zoom-image";
import { useGetUserReviewQuery } from "@/lib/apis/user";
import { getCountryName } from "@/lib/utils/country-name";
import { formatDate } from "@/lib/utils/date-utils";
import { formatPhone } from "@/lib/utils/international-phone";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ seekerId: string }>;
}) {
  const { seekerId } = use(params);
  const locale = useLocale() as string;
  const t = useTranslations("data_table");
  const { data, isLoading } = useGetUserReviewQuery({ user_id: seekerId });
  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No data found</div>;
  const {
    profile_image,

    country,
    username,
    email,
    phone_number,
    is_active,
    created_at,
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
    <Card>
      <CardContent className="flex flex-col items-center px-2">
        <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
          <div className="w-full sm:w-2/6 flex justify-center items-center">
            <ImageZoom src={profile_image} />
          </div>
          <div className="w-full sm:w-10/12 flex flex-col items-center  space-y-4">
            {disabled_items.map((item, index) => (
              <DisabledInput
                key={index}
                label={item.label}
                value={item.value ?? ""}
                with_copy={item.with_copy}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
