import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import { Title } from "@/components/ui/typography";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <BreadcrumbDropdown
        title="users"
        dropdownItems={[
          {
            label: "seekers",
            href: "/dashboard/users/seekers",
          },
          {
            label: "performers",
            href: "/dashboard/users/performers",
          },
          {
            label: "review",
            href: "/dashboard/users/review",
          },
        ]}
      />
      {children}
    </Fragment>
  );
}
