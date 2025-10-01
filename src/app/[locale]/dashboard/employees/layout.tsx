import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("breadcrumb");
  const isPending = false;
  return (
    <Fragment>
      <BreadcrumbDropdown title="employees" dropdownItems={[]} />
      {children}
    </Fragment>
  );
}
