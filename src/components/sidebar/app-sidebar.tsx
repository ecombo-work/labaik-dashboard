"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Icon, IconDashboard, IconProps } from "@tabler/icons-react";
import { useDirLang } from "@/hooks/use-dir-lang";
import { LucideIcon } from "lucide-react";
import { SidebarMenuItems } from "./sidebar-menu-items";
import { UserType } from "@/lib/roles";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useGetOverviewStatisticsQuery } from "@/lib/apis/overview";
import { SidebarUser } from "./sidebar-user";
import { useGetCurrentUserQuery } from "@/lib/apis/auth";
import { MenuItems } from "./menu-items";
import AppSidebarHeader from "./sidebar-header";

export interface IMenuItem {
  title_key: string;
  url: string;
  icon: LucideIcon | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  active?: boolean;
  count?: number;
  segment?: string;
  roles?: UserType[];
  items?: {
    title_key: string;
    url: string;
    count?: number;
    segment?: string;
    roles?: string[];
  }[];
}
[];

function filterMenuByRole(items: IMenuItem[], role: UserType): IMenuItem[] {
  return items
    .filter((item) => !item.roles || item.roles.includes(role))
    .map((item) => ({
      ...item,
      items: item.items?.filter(
        (sub) => !sub.roles || sub.roles.includes(role)
      ),
    }))
    .filter((item) => item.items?.length || !item.items);
}
export function AppSidebar({ user_type }: { user_type: UserType }) {
  const { dir } = useDirLang();
  const { data: current_user } = useGetCurrentUserQuery();
  const { data: overviewStatistics, isLoading } =
    useGetOverviewStatisticsQuery();

  return (
    <Sidebar
      side={dir === "rtl" ? "right" : "left"}
      collapsible="offcanvas"
      variant="inset"
    >
      <AppSidebarHeader />
      <SidebarContent className="px-1 mt-10 hidden-scrollbar">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuSkeleton showIcon />
            </SidebarMenuItem>
          ))
        ) : (
          <SidebarMenuItems
            items={filterMenuByRole(
              MenuItems({ overviewStatistics: overviewStatistics! }),
              user_type
            )}
          />
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser user={current_user?.data!} />
      </SidebarFooter>
    </Sidebar>
  );
}
