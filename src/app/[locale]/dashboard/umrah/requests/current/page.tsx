"use client";

import { useUrlSearchParams } from "@/lib/utils/search-params";
import { useColumns } from "./columns";
import { useGetCurrentRequestsQuery } from "@/lib/apis/umrah";
import { Title } from "@/components/ui/typography";
import { DataTable } from "@/components/data-table";
import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("page_title");
    const columns = useColumns();
    const { queryParams } = useUrlSearchParams();
    const { data, isLoading, error, refetch, isFetching } = useGetCurrentRequestsQuery(
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
                <Title>{t("current_umrah_requests")}</Title>
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