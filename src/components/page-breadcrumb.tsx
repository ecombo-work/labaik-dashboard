"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useDirLang } from "@/hooks/use-dir-lang";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";

type BreadcrumbItem = {
  label: string;
  current?: boolean;
  href?: string;
  is_last?: boolean;
};

type PageBreadcrumbProps = {
  className?: string;
  customLabels?: Record<string, string>;
};

export function PageBreadcrumb({
  className,
  customLabels = {},
}: PageBreadcrumbProps) {
  const { dir } = useDirLang();
  const pathname = usePathname();
  const params = useParams();
  // const locale = params?.locale as string;
  const t = useTranslations("breadcrumb");

  // Split the path and filter out empty segments
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items with proper locale handling
  const items = segments.map((segment, index) => {
    const isLast = index === segments.length - 1;
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const href = `${path}`;

    // Get custom label or generate one from the segment
    const label = customLabels[segment] || segment.replace(/-/g, "_"); // Convert hyphens to spaces
    // .replace(/\b\w/g; // Capitalize first letter of each word

    return {
      label,
      current: isLast,
      href: isLast ? undefined : href,
      is_last: isLast,
    };
  });

  // Don't show breadcrumb if we're on the home page
  if (
    items.length === 0 ||
    (items.length === 1 && items[0].label.toLowerCase() === "dashboard")
  ) {
    return null;
  }

  return (
    <Breadcrumb className={cn("my-3 px-4", className)}>
      <BreadcrumbList className="flex items-center gap-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1  cursor-default">
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs font-medium">
                {/^[0-9a-fA-F-]+$/.test(item.label)
                  ? item.label
                  : t(item.label)}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator className={cn("rtl:rotate-180")} />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
