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
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function SidebarMenuItems({ items }: { items: IMenuItem[] }) {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 🔹 normalize current path (remove locale + /dashboard prefix)
  function normalizePath(path: string): string {
    const clean = path.split("?")[0].split("#")[0];
    const segments = clean.split("/").filter(Boolean);

    if (["ar", "en"].includes(segments[0])) {
      segments.shift(); // remove locale
    }
    if (segments[0] === "dashboard") {
      segments.shift(); // remove dashboard
    }

    return "/" + segments.join("/");
  }

  const normalizedPath = normalizePath(pathname);

  function isActivePath(path: string, itemUrl: string): boolean {
    const cleanItemUrl = itemUrl.split("?")[0];
    const normalizedItemUrl = "/" + cleanItemUrl;

    return (
      path === normalizedItemUrl || path.startsWith(normalizedItemUrl + "/")
    );
  }

  return (
    <SidebarMenu>
      {items?.map((item, idx) => {
        const itemPath = "/dashboard/" + item.url;

        const isSubActive = item.items?.some((sub) =>
          isActivePath(normalizedPath, sub.url)
        );
        const isItemActive =
          isActivePath(normalizedPath, item.url) || isSubActive;

        const isOpen = openIndex === idx || isSubActive;

        return (
          <Collapsible
            key={idx}
            asChild
            open={isOpen}
            onOpenChange={(open) => setOpenIndex(open ? idx : null)}
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
                    <p className="text-base">{t(item.title_key)}</p>
                    <ChevronRight className="!size-4 ltr:ml-auto rtl:mr-auto transition-transform duration-200 rtl:group-data-[state=closed]/collapsible:rotate-180 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((sub, subIdx) => {
                      const subPath = "/dashboard/" + sub.url;
                      const isSubActive = isActivePath(normalizedPath, sub.url);

                      return (
                        <SidebarMenuSubItem key={subIdx}>
                          <SidebarMenuSubButton
                            isActive={isSubActive}
                            size="sm"
                            asChild
                          >
                            <Link
                              href={subPath}
                              className="relative w-full flex justify-between"
                            >
                              <p>{t(sub.title_key)}</p>
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
                    href={itemPath}
                    className="w-full flex items-center gap-3 justify-between"
                  >
                    <item.icon />
                    <span className="flex items-center justify-between w-full">
                      <p className="text-base">{t(item.title_key)}</p>
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
