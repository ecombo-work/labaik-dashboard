import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta_data" });
  return {
    title: t("login"),
    description: t("login_description"),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" h-svh w-screen">
      <div className="flex-center h-full px-2">{children}</div>
    </section>
  );
}
