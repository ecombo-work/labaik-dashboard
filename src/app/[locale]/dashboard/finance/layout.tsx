import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <BreadcrumbDropdown
        title="finance"
        dropdownItems={[
          {
            label: "accounts",
            href: "/dashboard/finance/accounts",
          },
          {
            label: "incoming",
            href: "/dashboard/finance/incoming",
          },
          {
            label: "outgoing",
            href: "/dashboard/finance/outgoing",
          },
          {
            label: "withdrawals",
            href: "/dashboard/finance/withdrawals",
          },
        ]}
      />
      {children}
    </Fragment>
  );
}
