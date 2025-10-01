"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Title } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import React from "react";
import { X } from "lucide-react";

export default function PageHeader({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const t = useTranslations("page_title");
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex justify-between items-center w-full mb-6">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value="item-1">
          <div className="flex items-center justify-between gap-2">
            <Title className="mb-0">{title && t(title)}</Title>
            <AccordionTrigger
              withIcon={false}
              className="!decoration-none h-9 w-28 flex items-center justify-center px-2 py-2 bg-primary text-white shadow-xs hover:bg-primary/90"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5 text-white" /> : t("search")}
            </AccordionTrigger>
          </div>
          <AccordionContent className="mt-2 w-full">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
