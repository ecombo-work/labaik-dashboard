import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "meta_data" });

  return {
    title: t("login"),
  };
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container h-svh w-screen">
      <div className="flex-center h-full">{children}</div>
    </section>
  );
}
