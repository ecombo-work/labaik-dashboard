import LostRequestsDataTable from "./data-table";
import PageHeader from "@/components/page-header";
import LostUmrahSearchForm from "./search";
export default function Page() {
  return (
    <div>
      <PageHeader title={"lost_umrah_requests"}>
        <LostUmrahSearchForm />
      </PageHeader>
      <LostRequestsDataTable />
    </div>
  );
}
