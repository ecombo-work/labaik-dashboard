import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <BreadcrumbDropdown title="chats" dropdownItems={[]} />
      {children}
    </Fragment>
  );
}
