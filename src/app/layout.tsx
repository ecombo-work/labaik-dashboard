import PushNotificationsProvider from "@/providers/notifications-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  <PushNotificationsProvider>
    {children}
  </PushNotificationsProvider> 
}
