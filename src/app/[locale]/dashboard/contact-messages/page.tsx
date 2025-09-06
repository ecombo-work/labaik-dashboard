"use client";
import { DataTable } from "@/components/data-table";
import { Title } from "@/components/ui/typography";
import { useGetContactMessagesQuery } from "@/lib/apis/contact";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useTranslations } from "next-intl";
import React from "react";
import { useColumns } from "./columns";
import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";

export default function Page() {
  const t = useTranslations("page_title");
  const columns = useColumns();
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useGetContactMessagesQuery(
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
      <section className="container">
      <BreadcrumbDropdown title="" dropdownItems={[]} />
      <Title>{t("contact_messages")}</Title>
      </section>
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
