import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRole, UserType } from "@/lib/roles";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { ModeToggle } from "@/components/mode-toggle";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "meta_data" });

  return {
    title: t("admin"),
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
      <AppSidebar user_type={user_type} />
      <main className="h-full relative py-10 w-dvw">
        <div className="container  relative">
          <SidebarTrigger className="  " />
          <PageBreadcrumb className="px-0" />
        </div>
        <section className="container">{children}</section>
      </main>
    </SidebarProvider>
  );
}
