import { getTranslations } from "next-intl/server";
import "./globals.css";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const keywords = t("keywords");
  return {
    title: "Labaik | Dashboard",
    description: "Comprehensive management dashboard for Labaik platform",
    keywords: ["Labaik", "Dashboard", "Admin", "Management", "Analytics"],
    authors: [{ name: "Labaik Team" }],
    creator: "Labaik",
    publisher: "Labaik",
    images: [
      {
        url: "/labaik_en.png",
        width: 1200,
        height: 630,
        alt: "Labaik | Dashboard",
      },
    ],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    alternates: {
      canonical: new URL("/", process.env.NEXT_PUBLIC_APP_URL).toString(),
      languages: {
        "en-US": new URL("/en", process.env.NEXT_PUBLIC_APP_URL).toString(),
        "ar-SA": new URL("/ar", process.env.NEXT_PUBLIC_APP_URL).toString(),
      },
    },
    icons: {
      icon: "/logo.ico",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
