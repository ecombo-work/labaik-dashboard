"use client";

import { DataTable } from "@/components/data-table";
import { useTransactionColumns } from "./transaction-columns";
import { useGetTransactionsQuery } from "@/lib/apis/finance";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/pagination";
import CreateTransaction from "./create-transaction";
export enum TermType {
  INCOMING = "0",
  OUTGOING = "1",
}
const Transactions = () => {
  const columns = useTransactionColumns();
  const { queryParams } = useUrlSearchParams();
  const { data, isLoading, error, refetch } =
    useGetTransactionsQuery(
      {
        page: queryParams.page ?? DEFAULT_PAGE,
        limit: queryParams.limit ?? DEFAULT_LIMIT,
        type: queryParams.type ?? TermType.INCOMING,
      },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      }
    );

  return (
    <DataTable
      columns={columns}
      data={data?.data?.items}
      meta={data?.data?.meta}
      onRefresh={refetch}
      error={error}
      loading={isLoading}
      additional_actions={<CreateTransaction pre_loader={isLoading } />}
    />
  );
};

export default Transactions;
