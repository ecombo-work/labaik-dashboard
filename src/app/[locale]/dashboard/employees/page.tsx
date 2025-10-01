"use client";

import { DataTable } from "@/components/data-table";
import { Title } from "@/components/ui/typography";
import { useGetAllEmployeesQuery } from "@/lib/apis/user";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useColumns } from "./columns";
import React from "react";
import AddEmployee from "./add-employee";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/page-header";
import EmployeesSearchForm from "./search-form";

export default function Page() {
  const t = useTranslations("page_title");
  const columns = useColumns();
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } =
    useGetAllEmployeesQuery(
      {
        page: queryParams.page ?? "1",
        limit: queryParams.limit ?? "25",
        ...queryParams,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  return (
    <React.Fragment>
      <PageHeader title="employees">
        <EmployeesSearchForm />
      </PageHeader>
      {/* <div className="flex justify-between items-center">
        <Title>{t('employees')}</Title>
      </div> */}
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
        additional_actions={<AddEmployee pre_loader={isLoading || isFetching} />}
      />
    </React.Fragment>
  );
}
