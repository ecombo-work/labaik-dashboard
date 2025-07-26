"use client";
import { useTranslations } from "next-intl";
import { useColumns } from "./columns";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Title } from "@/components/ui/typography";
import { useGetSeekersQuery } from "@/lib/apis/user";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DataTable } from "@/components/data-table";

export default function SeekersPage() {
  const columns = useColumns();
  const t = useTranslations("page_title");
  const { queryParams } = useUrlSearchParams();

  const { data, isLoading, isFetching, error, refetch } = useGetSeekersQuery(
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
    <div 
    // className="container mx-auto"
    >

      <div className="flex justify-between items-center">
        <Title>{t("seekers")}</Title>
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
