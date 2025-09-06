"use client";
import { Link, usePathname } from "@/i18n/navigation";
import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { IMenuItem } from "./app-sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
export function SidebarMenuItems({ items }: { items: IMenuItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items?.map((item, idx) => {
        const normalize = (path: string) => {
          // Remove query params before normalization
          const cleanPath = path.split("?")[0];
          const normalized = `/dashboard/${cleanPath}`.replace(
            /^\/+|\/+$/g,
            ""
          );
          return `/${normalized}`;
        };

        const isSubActive = item.items?.some((sub) =>
          pathname.startsWith(normalize(sub.url))
        );

        const isItemActive =
          pathname === normalize(item.url) ||
          pathname.startsWith(`${normalize(item.url)}/`) ||
          isSubActive;

        const shouldDefaultOpen = isSubActive;
        return (
          <Collapsible
            key={idx}
            asChild
            defaultOpen={shouldDefaultOpen}
            className="group/collapsible"
          >
            {item.items?.length ? (
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={isItemActive}
                    className="cursor-pointer w-full flex items-center gap-3 justify-start"
                  >
                    <item.icon />
                    <p className="text-base">{item.title}</p>
                    <ChevronRight className="!size-4 ltr:ml-auto rtl:mr-auto transition-transform duration-200 rtl:group-data-[state=closed]/collapsible:rotate-180 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="CollapsibleContent">
                    {item.items?.map((sub, idx) => {
                      const subPath = normalize(sub.url);
                      const isSubActive = subPath === pathname;
                      return (
                        <SidebarMenuSubItem key={idx}>
                          <SidebarMenuSubButton
                            isActive={isSubActive}
                            size="sm"
                            asChild
                          >
                            <Link
                              href={subPath}
                              className="relative w-full flex justify-between"
                            >
                              <p className="">{sub.title}</p>
                              {sub.count && (
                                <SidebarMenuBadge>{sub.count}</SidebarMenuBadge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isItemActive} asChild>
                  <Link
                    href={normalize(item.url)}
                    className="w-full flex items-center gap-3 justify-between"
                  >
                    <item.icon />
                    <span className="flex items-center justify-between w-full">
                      <p className="text-base">{item.title}</p>
                      {item.count && (
                        <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </Collapsible>
        );
      })}
    </SidebarMenu>
  );
}
