import { Title } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";
import LostRequestsDataTable from "./data-table";
export default async function Page() {
  const t = await getTranslations("page_title");
  return (
    <div>
      <div className="flex justify-between items-center">
        <Title>{t("lost_umrah_requests")}</Title>
      </div>
      <LostRequestsDataTable />
    </div>
  );
}
