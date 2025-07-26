"use client";
import { useGetAllCouponsQuery } from "@/lib/apis/coupon";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useTranslations } from "next-intl";
import React from "react";
import { useColumns } from "./columns";
import { Title } from "@/components/ui/typography";
import { DataTable } from "@/components/data-table";
import CreateCoupon from "./create-new";

export default function Page() {
  const t = useTranslations("page_title");
  const columns = useColumns();
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useGetAllCouponsQuery(
    {
      page: queryParams.page ?? "1",
      limit: queryParams.limit ?? "25",
      ...queryParams,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        <Title>{t("coupons")}</Title>
      </div>
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
        additional_actions={<CreateCoupon pre_loader={isLoading || isFetching} />}
      />
    </React.Fragment>
  );
}
