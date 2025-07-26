import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("overview");
  return (
    <section className="container">
      <Title>{t("title")}</Title>
      {children}
    </section>
  );
}
