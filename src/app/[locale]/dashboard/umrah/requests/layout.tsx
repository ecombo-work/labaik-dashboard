import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <BreadcrumbDropdown
        title="umrah"
        dropdownItems={[
          {
            label: "requests",
            href: "/dashboard/umrah/requests/current",
          },
          {
            label: "lost",
            href: "/dashboard/umrah/requests/lost",
          },
        ]}
      />
      {children}
    </Fragment>
  );
}
