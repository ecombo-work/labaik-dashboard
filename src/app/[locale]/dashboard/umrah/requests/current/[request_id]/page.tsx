"use client";

import { Title } from "@/components/ui/typography";
import { useGetUmrahDetailsQuery } from "@/lib/apis/umrah";
import { useTranslations } from "next-intl";
import React, { use } from "react";
import UmrahCards from "./umrah-card";

export default function Page({
  params,
}: {
  params: Promise<{ request_id: string }>;
}) {
  const t = useTranslations("page_title");
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
    <React.Fragment>
      <div className="flex justify-between items-center">
        <Title>{t("umrah_details")}</Title>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
      <UmrahCards umrah={data.data} />
      {/* </div> */}
    </React.Fragment>
  );
}
