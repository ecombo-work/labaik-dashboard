import BreadcrumbDropdown from "@/components/breadcrumb-dropdown";
import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("breadcrumb");
  const isPending = false;
  return (
    <section className="container">
      <BreadcrumbDropdown title="employees" dropdownItems={[]} />
      {children}
    </section>
  );
}
