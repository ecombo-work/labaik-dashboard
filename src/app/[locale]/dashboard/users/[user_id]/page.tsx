"use client";

import DisabledInput from "@/components/disabled-input";
import { ImageZoom } from "@/components/zoom-image";
import { useGetUserReviewQuery } from "@/lib/apis/user";
import { getCountryName } from "@/lib/utils/country-name";
import { formatDate } from "@/lib/utils/date-utils";
import { formatPhone } from "@/lib/utils/international-phone";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";
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
    <section className="card flex flex-col items-center">
      <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
        {/* Profile Image Section */}
        <div className="w-full sm:w-2/6 flex justify-center items-center">
          <ImageZoom src={profile_image} />
        </div>

        {/* Details Section */}
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

      {data?.data.user_details && (
        <>
          <Separator className="mt-4" />
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Back */}
              <div className="flex flex-col items-center text-center">
                <span className="mb-2 text-sm font-medium">
                  {t("back_national_id")}
                </span>
                <ImageZoom src={data?.data.user_details.back_national_id} />
              </div>

              {/* Front */}
              <div className="flex flex-col items-center text-center">
                <span className="mb-2 text-sm font-medium">
                  {t("front_national_id")}
                </span>
                <ImageZoom src={data?.data.user_details.front_national_id} />
              </div>

              {/* Face */}
              <div className="flex flex-col items-center text-center">
                <span className="mb-2 text-sm font-medium">
                  {t("face_with_national_id")}
                </span>
                <ImageZoom
                  src={data?.data.user_details.face_with_national_id}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
