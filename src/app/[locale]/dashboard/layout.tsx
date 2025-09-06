import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {  UserType } from "@/lib/roles";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "meta_data" });

  return {
    title: t("admin"),
    description: "Labaik Dashboard",
  };
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const cookieStore = await cookies();
  const user_type = cookieStore.get("USER_TYPE")?.value as unknown as UserType;
  return (
    <SidebarProvider>
      {/* <WaveBg /> */}
      <AppSidebar user_type={user_type} />
      <SidebarInset>
        <header className="bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:rounded-tl-xl md:rounded-tr-xl">
          <div className="flex items-center px-4">
            <SidebarTrigger />
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main p-4 xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
