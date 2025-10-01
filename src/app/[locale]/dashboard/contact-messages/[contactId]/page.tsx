"use client";
import React from "react";
import { use } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatPhone } from "@/lib/utils/international-phone";
import { getCountryName } from "@/lib/utils/country-name";
import { formatDate } from "@/lib/utils/date-utils";
import { useGetContactMessageQuery } from "@/lib/apis/contact";
import { Card, CardContent } from "@/components/ui/card";
import DisabledInput from "@/components/disabled-input";
import { CountryCode } from "libphonenumber-js";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
//  contact_id: number;
//   username: string;
//   email: string;
//   message: string;
//   status: ContactType;
//   user: {
//     user_id: number;
//     username: string;
//     phone_number: string;
//     country: string;
//   };
//   created_at: string;
function ContactMessages({
  params,
}: {
  params: Promise<{ contactId: string }>;
}) {
  const { contactId } = use(params);
  const t = useTranslations("data_table");
  const locale = useLocale() as string;
  const { data, isLoading } = useGetContactMessageQuery({
    contact_id: Number(contactId),
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No data found</div>;
  const disabled_items = [
    {
      label: t("username"),
      value: data?.data?.user?.username,
      with_copy: true,
    },
    {
      label: t("email"),
      value: data?.data?.email,
      with_copy: true,
    },
    {
      label: t("phone_number"),
      value: formatPhone(data?.data?.user?.phone_number, {
        countryCode: data?.data?.user?.country as CountryCode,
      }),
      with_copy: true,
    },
    {
      label: t("country"),
      value: getCountryName(data?.data?.user?.country, locale),
    },
    {
      label: t("date"),
      value: formatDate(data?.data?.created_at),
    },
  ];
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4  space-y-4">
          {disabled_items.map((item, index) => (
            <DisabledInput
              key={index}
              label={item.label}
              value={item.value ?? ""}
              with_copy={item.with_copy}
            />
          ))}
        </div>
        <div className="w-full">
          <Label className="mb-2">{t("message")}:</Label>
          <Textarea
            value={data?.data?.message}
            className="min-h-[100px]"
            disabled
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactMessages;
