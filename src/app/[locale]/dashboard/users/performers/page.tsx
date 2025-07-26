"use client";
import { useGetPerformersQuery } from "@/lib/apis/user";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DataTable } from "@/components/data-table";
// import { useColumns } from "./columns";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { useColumns } from "./columns";

export default function Page() {
  const columns = useColumns();
  const t = useTranslations("page_title");
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch, isFetching } = useGetPerformersQuery(
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
    <div>
      <div className="flex justify-between items-center">
        <Title>{t("performers")}</Title>
      </div>

      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
      />
    </div>
  );
}
