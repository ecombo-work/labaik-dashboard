import { getTranslations } from "next-intl/server";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const keywords = t("keywords");
  return {
    title: t("title"),
    description: t("description"),
    keywords: keywords.split(",").map((keyword) => keyword.trim()),
    authors: [{ name: "Labaik Team" }],
    locale: t("locale"),
    image: t("image"),
    creator: "Labaik",
    publisher: "Labaik",
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    alternates: {
      canonical: new URL("/", process.env.NEXT_PUBLIC_APP_URL).toString(),
      languages: {
        "en-US": new URL("/en", process.env.NEXT_PUBLIC_APP_URL).toString(),
        "ar-SA": new URL("/ar", process.env.NEXT_PUBLIC_APP_URL).toString(),
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "/",
      siteName: "Labaik",
      images: [
        {
          url: t("image"),
          width: 1200,
          height: 630,
          alt: "Labaik | Dashboard",
        },
      ],
      locale: t("locale"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [t("image")],
      creator: "@labaik",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/logo.ico",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
    manifest: "/site.webmanifest",
    applicationName: t("title"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("title"),
    },
    verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" h-svh w-screen">
      <div className="flex-center h-full px-2">{children}</div>
    </section>
  );
}
