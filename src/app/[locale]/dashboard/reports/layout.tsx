import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import ReportsHeader from "@/components/reports/header";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("breadcrumb");
  return (
    <Fragment>
      <BreadcrumbDropdown
        title="reports"
        dropdownItems={[
          {
            label: "seekers",
            href: "/dashboard/reports/seekers",
          },
          {
            label: "performers",
            href: "/dashboard/reports/performers",
          },
          {
            label: "umrah",
            href: "/dashboard/reports/umrah",
          },
          {
            label: "countries",
            href: "/dashboard/reports/countries",
          },
          {
            label: "expenses",
            href: "/dashboard/reports/expenses",
          },
          {
            label: "incomes",
            href: "/dashboard/reports/incomes",
          },
        ]}
      />
      <ReportsHeader />

      {children}
    </Fragment>
  );
}
