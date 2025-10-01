"use client";
import { useGetAllCouponsQuery } from "@/lib/apis/coupon";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useTranslations } from "next-intl";
import React from "react";
import { useColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import CreateCoupon from "./create-new";
import PageHeader from "@/components/page-header";
import CouponsSearchForm from "./search-form";

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
      <PageHeader title="coupons">
        <CouponsSearchForm />
      </PageHeader>
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
        additional_actions={
          <CreateCoupon pre_loader={isLoading || isFetching} />
        }
      />
    </React.Fragment>
  );
}
