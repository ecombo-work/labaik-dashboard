"use client";
import { DataTable } from "@/components/data-table";
import { useGetNeedReviewPerformersQuery } from "@/lib/apis/user";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useTranslations } from "next-intl";
import { useColumns } from "./columns";
import ReviewSearchForm from "./search-form";
import PageHeader from "@/components/page-header";

export default function Page() {
  const columns = useColumns();
  const t = useTranslations("page_title");
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, isFetching, error, refetch } =
    useGetNeedReviewPerformersQuery(
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
    <>
      <PageHeader title="review_needed">
        <ReviewSearchForm />
      </PageHeader>
      {/* <div className="flex justify-between items-center">
        <Title>{t("review_needed")}</Title>
      </div> */}

      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading || isFetching}
      />
    </>
  );
}
