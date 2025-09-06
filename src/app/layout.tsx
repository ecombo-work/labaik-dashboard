import "./globals.css";
import { Metadata, Viewport } from "next";

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

export const metadata: Metadata = {
  title: "Labaik | Dashboard",
  description: "Comprehensive management dashboard for Labaik platform",
  keywords: ["Labaik", "Dashboard", "Admin", "Management", "Analytics"],
  authors: [{ name: "Labaik Team" }],
  creator: "Labaik",
  publisher: "Labaik",
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
  openGraph: {
    title: "Labaik | Dashboard",
    description: "Comprehensive management dashboard for Labaik platform",
    url: "/",
    siteName: "Labaik",
    images: [
      {
        url: "/labaik_en.png",
        width: 1200,
        height: 630,
        alt: "Labaik | Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labaik | Dashboard",
    description: "Comprehensive management dashboard for Labaik App",
    images: ["/labaik_en.png"],
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
  // Viewport and themeColor moved to the viewport export above
  applicationName: "Labaik | Dashboard",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Labaik | Dashboard",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
