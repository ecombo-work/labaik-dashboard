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
} from "../sidebar";
import { IMenuItem } from "./app-sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
export function SidebarMenuItems({ items }: { items: IMenuItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items?.map((item, idx) => {
        const normalize = (path: string) => {
          // Remove leading/trailing slashes and add dashboard prefix
          const normalized = `/dashboard/${path}`.replace(/^\/+|\/+$/g, '');
          return `/${normalized}`;
        };
        
        const isSubActive = item.items?.some(
          (sub) => pathname.startsWith(normalize(sub.url))
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
                    size={"lg"}
                    className="cursor-pointer w-full flex items-center gap-3 justify-start"
                  >
                    <item.icon />
                    <p className="text-base ">{item.title}</p>
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
                            size="md"
                            asChild
                          >
                            <Link
                              href={subPath}
                              className="relative w-full flex "
                            >
                              <p className="text-xs">{sub.title}</p>
                              {sub.count && (
                                <SidebarMenuBadge className="ltr:!right-11/12 rtl:!left-11/12 rtl:!right-11/12">
                                  {sub.count}
                                </SidebarMenuBadge>
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
                <SidebarMenuButton isActive={isItemActive} size={"lg"} asChild>
                  <Link
                    href={normalize(item.url)}
                    className="w-full flex items-center gap-3 justify-start"
                  >
                    <item.icon />
                    <p className="text-base">{item.title}</p>
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
