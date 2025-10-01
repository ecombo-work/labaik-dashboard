"use client";
import React from "react";
import { useColumns } from "./columns";
import { useGetWithdrawalsQuery } from "@/lib/apis/withdrawal";
import { useTranslations } from "next-intl";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { Title } from "@/components/ui/typography";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import WithdrawalsSearchForm from "./search";

function Page() {
  const columns = useColumns();
  const t = useTranslations("page_title");
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useGetWithdrawalsQuery({
    page: queryParams.page ?? "1",
    limit: queryParams.limit ?? "25",
    ...queryParams,
  },{
    refetchOnMountOrArgChange: true,
  });
  return (
    <React.Fragment>
    <PageHeader title={"withdrawals"}>
      <WithdrawalsSearchForm />
    </PageHeader>
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
      />
    </React.Fragment>
  );
}

export default Page;
