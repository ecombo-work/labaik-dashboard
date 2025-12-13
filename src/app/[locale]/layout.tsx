import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme-provider";
import { getLangDir } from "rtl-detect";
import WaveBg from "@/components/wave-bg";
import StoreProvider from "@/providers/store-provider";
import { Toaster } from "@/components/ui/sonner";
import DirectionProvider from "@/providers/direction-provider";
import PushNotificationsProvider from "@/providers/notifications-provider";
import { Viewport } from "next";

import { GeistSans } from "geist/font/sans";
import { almarai } from "./fonts";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// export const metadata: Metadata = {
//   title: "Labaik | Dashboard",
//   description: "Comprehensive management dashboard for Labaik platform",
//   keywords: ["Labaik", "Dashboard", "Admin", "Management", "Analytics"],
//   authors: [{ name: "Labaik Team" }],
//   creator: "Labaik",
//   publisher: "Labaik",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
//   alternates: {
//     canonical: new URL("/", process.env.NEXT_PUBLIC_APP_URL).toString(),
//     languages: {
//       "en-US": new URL("/en", process.env.NEXT_PUBLIC_APP_URL).toString(),
//       "ar-SA": new URL("/ar", process.env.NEXT_PUBLIC_APP_URL).toString(),
//     },
//   },

//   openGraph: {
//     title: "Labaik | Dashboard",
//     description: "Comprehensive management dashboard for Labaik platform",
//     url: "/",
//     siteName: "Labaik",
//     images: [
//       {
//         url: "/labaik_en.png",
//         width: 1200,
//         height: 630,
//         alt: "Labaik | Dashboard",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Labaik | Dashboard",
//     description: "Comprehensive management dashboard for Labaik App",
//     images: ["/labaik_en.png"],
//     creator: "@labaik",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   icons: {
//     icon: "/logo.ico",
//     shortcut: "/logo.png",
//     apple: "/logo.png",
//   },
//   manifest: "/site.webmanifest",
//   applicationName: "Labaik | Dashboard",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: "Labaik | Dashboard",
//   },
//   verification: {
//     google: "google-site-verification-code",
//     yandex: "yandex-verification-code",
//   },
// };
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
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = getLangDir(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`min-h-svh bg-background   ${
          locale === "ar" ? almarai.variable : GeistSans.variable
        } antialiased max-w-screen`}
        suppressHydrationWarning
      >
        <PushNotificationsProvider>
          <NextIntlClientProvider>
            <StoreProvider>
              <DirectionProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  // enableSystem
                  // disableTransitionOnChange
                >
                  {/* <PushNotificationsProvider> */}
                  {/* <FCMInitializer /> */}
                  <WaveBg />
                  {children}
                  <Toaster dir={direction} richColors duration={3000} />
                  {/* </PushNotificationsProvider> */}
                </ThemeProvider>
              </DirectionProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </PushNotificationsProvider>
      </body>
    </html>
  );
}
