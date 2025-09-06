"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Icon, IconDashboard, IconProps } from "@tabler/icons-react";
import { useDirLang } from "@/hooks/use-dir-lang";
import {
  Bell,
  BringToFront,
  Calendar,
  ChartSpline,
  Home,
  Inbox,
  Landmark,
  LucideIcon,
  Mail,
  MessageCircle,
  PieChart,
  TicketPercent,
  UserRoundCog,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { SidebarMenuItems } from "./sidebar-menu-items";
import { UserType } from "@/lib/roles";
import { useTranslations } from "next-intl";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useGetOverviewStatisticsQuery } from "@/lib/apis/overview";
import { SidebarUser } from "./sidebar-user";
import { useGetCurrentUserQuery } from "@/lib/apis/auth";
const labaik_en = "/labaik_en.png";
const labaik_ar = "/labaik_ar.png";
export interface IMenuItem {
  title: string;
  url: string;
  icon: LucideIcon | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  active?: boolean;
  count?: number;
  items?: {
    title: string;
    url: string;
    count?: number;
  }[];
}
[];
function AdminMenuItems() {
  const t = useTranslations("sidebar");
  const { data: overviewStatistics, isLoading } =
    useGetOverviewStatisticsQuery();
  const menu_items: IMenuItem[] = [
    {
      title: t("dashboard"),
      url: "overview",
      icon: Home,
      active: true,
    },
    {
      title: t("umrah_management"),
      url: "#",
      icon: BringToFront,
      items: [
        {
          title: t("current_requests"),
          url: "umrah/requests/current",
        },
        {
          title: t("lost_requests"),
          url: "umrah/requests/lost",
        },
      ],
    },
    {
      title: t("users_management"),
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: t("seekers"),
          url: "users/seekers",
        },
        {
          title: t("performers"),
          url: "users/performers",
        },
        {
          title: t("review_needed"),
          url: "users/review",
          count: overviewStatistics?.data?.pending_performer_verifications,
        },
      ],
    },
    {
      title: t("finance_management"),
      url: "#",
      icon: Landmark,
      items: [
        {
          title: t("accounts"),
          url: "finance/accounts",
        },
        {
          title: t("incoming"),
          url: "finance/incoming?type=0",
        },
        {
          title: t("outgoing"),
          url: "finance/outgoing?type=1",
        },
        {
          title: t("withdrawal"),
          url: "finance/withdrawals",
          count: overviewStatistics?.data?.pending_withdrawals,
        },
      ],
    },
    {
      title: t("reports"),
      url: "#",
      // icon: PieChart,
      icon: ChartSpline,
      items: [
        {
          title: t("seekers"),
          url: "reports/seekers",
        },
        {
          title: t("performers"),
          url: "reports/performers",
        },
        {
          title: t("umrah"),
          url: "reports/umrah",
        },
        {
          title: t("countries"),
          url: "reports/countries",
        },

        {
          title: t("incomes"),
          url: "reports/incomes",
        },
        {
          title: t("expenses"),
          url: "reports/expenses",
        },
      ],
    },
    {
      title: t("employees_management"),
      url: "employees",
      icon: UserRoundCog,
    },
    {
      title: t("coupons_management"),
      url: "coupons",
      icon: TicketPercent,
    },
    {
      title: t("chats"),
      url: "chats",
      icon: MessageCircle,
    },
    {
      title: t("notifications_management"),
      url: "notifications",
      icon: Bell,
    },
    {
      title: t("contact_us_messages"),
      url: "contact-messages",
      icon: Mail,
      count: overviewStatistics?.data?.in_progress_contacts,
    },
  ];
  if (isLoading) {
    return menu_items.map((_, idx) => (
      <SidebarMenuItem key={idx}>
        <SidebarMenuSkeleton showIcon />
      </SidebarMenuItem>
    ));
  }

  return <SidebarMenuItems items={menu_items} />;
}

export function AppSidebar({ user_type }: { user_type: UserType }) {
  const { dir, lang } = useDirLang();
  const { data: current_user } = useGetCurrentUserQuery();
  console.log("current_user", current_user);
  return (
    <Sidebar
      side={dir === "rtl" ? "right" : "left"}
      collapsible="offcanvas"
      variant="inset"
    >
      <SidebarHeader>
        <div className="flex-center my-5 h-[100px]">
          <div className="relative w-[260px] h-[130px]">
            <Image
              src={lang === "en" ? labaik_en : labaik_ar}
              alt="Logo"
              fill
              priority
              className="object-contain"
              sizes="260px"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1 mt-10 hidden-scrollbar">
        <AdminMenuItems />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser user={current_user?.data!} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
