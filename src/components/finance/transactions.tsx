"use client";

import { DataTable } from "@/components/data-table";
import { useTransactionColumns } from "./transaction-columns";
import { useGetTransactionsQuery } from "@/lib/apis/finance";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/pagination";
import CreateTransaction from "./create-transaction";
import TransactionSearchForm from "./search";
import PageHeader from "../page-header";
import { usePathname } from "@/i18n/navigation";
export enum TermType {
  INCOMING = "0",
  OUTGOING = "1",
}
const Transactions = () => {
  const columns = useTransactionColumns();
  // get current path
  const pathname = usePathname();
  const { queryParams } = useUrlSearchParams();
  const isIncoming = pathname.includes("incoming");
  const { data, isLoading, error, refetch } = useGetTransactionsQuery(
    {
      page: queryParams.page ?? DEFAULT_PAGE,
      limit: queryParams.limit ?? DEFAULT_LIMIT,
      type: isIncoming ? TermType.INCOMING : TermType.OUTGOING,
      ...queryParams,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  return (
    <div className="space-y-4">
      <PageHeader title={isIncoming ? "incoming" : "outgoing"}>
        <TransactionSearchForm />
      </PageHeader>
      <DataTable
        columns={columns}
        data={data?.data?.items}
        meta={data?.data?.meta}
        onRefresh={refetch}
        error={error}
        loading={isLoading}
        additional_actions={<CreateTransaction pre_loader={isLoading} />}
      />
    </div>
  );
};

export default Transactions;
