"use client";
import React from "react";
import { ChevronDownIcon, Home, SlashIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { useDirLang } from "@/hooks/use-dir-lang";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function BreadcrumbDropdown({
  title,
  dropdownItems,
}: {
  title: string;
  dropdownItems?: {
    label: string;
    href: string;
  }[];
}) {
  const t = useTranslations("breadcrumb");
  const pathname = usePathname();
  const current = pathname.split("/").pop()!;
  const { dir } = useDirLang();
  const is_number = /^[0-9a-fA-F-]+$/.test(current);
  // if current have - change it to _
  const current_ = current.replace(/-/g, "_");
  return (
    <Breadcrumb className={cn("my-3 px-0")}>
      <BreadcrumbList className="flex items-center gap-1" dir={dir}>
        <BreadcrumbItem className="flex items-center gap-1" dir={dir}>
          <BreadcrumbLink asChild>
            <Home className="size-5" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className={cn("rtl:rotate-180 [&>svg]:size-4")} />

        {dropdownItems && dropdownItems.length > 0 && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 focus-visible:outline-none">
                {t(title)}
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {dropdownItems?.map((item) => (
                  <Link href={item.href} key={item.label}>
                    <DropdownMenuItem className="text-sm">
                      {t(item.label)}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
        {dropdownItems && dropdownItems.length > 0 && (
          <BreadcrumbSeparator
            className={cn("rtl:rotate-180 [&>svg]:size-4")}
          />
        )}

        <BreadcrumbItem>
          <BreadcrumbPage className="text-sm">
            {is_number ? current : t(current_)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbDropdown;
