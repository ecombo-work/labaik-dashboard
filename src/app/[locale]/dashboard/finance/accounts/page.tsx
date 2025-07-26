"use client";

import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import React from "react";
import { useColumns } from "./columns";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useGetAccountsQuery } from "@/lib/apis/account";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/pagination";
import { DataTable } from "@/components/data-table";
import CreateAccount from "./create-new";

export default function Page() {
  const t = useTranslations("page_title");
  const columns = useColumns();
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useGetAccountsQuery(
    {
      page: queryParams.page ?? DEFAULT_PAGE,
      limit: queryParams.limit ?? DEFAULT_LIMIT,
      ...queryParams,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  return (
    <React.Fragment>
      <Title>{t("accounts")}</Title>
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
        additional_actions={
          <CreateAccount pre_loader={isLoading || isFetching} />
        }
      />
    </React.Fragment>
  );
}
