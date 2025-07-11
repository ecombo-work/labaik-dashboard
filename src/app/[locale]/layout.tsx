import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Cairo, Rubik } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { getLangDir } from "rtl-detect";
import WaveBg from "@/components/wave-bg";
import StoreProvider from "@/providers/store-provider";
// import FCMInitializer from "@/components/fcm-initializer";
import { Toaster } from "@/components/ui/sonner";
import DirectionProvider from "@/providers/direction-provider";
import PushNotificationsProvider from "@/providers/notifications-provider";

const cairo = Cairo({
  subsets: ["arabic"],
  display: "auto",
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  adjustFontFallback: true,
});
const rubik = Rubik({
  subsets: ["latin"],
  display: "auto",
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});
export const metadata: Metadata = {
  title: "Labaik",
  description: "Labaik Dashboard",
};

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
        className={`min-h-svh ${cairo.variable} ${rubik.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <StoreProvider>
            <DirectionProvider> 
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              // enableSystem
              // disableTransitionOnChange
            >
              <PushNotificationsProvider>

              {/* <FCMInitializer /> */}
              <WaveBg />

              {children}
              <Toaster dir={direction} richColors duration={3000} />
              </PushNotificationsProvider>
            </ThemeProvider>
            </DirectionProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
