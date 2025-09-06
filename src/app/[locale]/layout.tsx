import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { getLangDir } from "rtl-detect";
import WaveBg from "@/components/wave-bg";
import StoreProvider from "@/providers/store-provider";
import { Toaster } from "@/components/ui/sonner";
import DirectionProvider from "@/providers/direction-provider";
import PushNotificationsProvider from "@/providers/notifications-provider";

import { GeistSans } from "geist/font/sans";
import { almarai } from "./fonts";

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
