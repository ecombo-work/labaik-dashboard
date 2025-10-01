"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Title } from "@/components/ui/typography";
import DataTable from "./data-table";
export default function Donations() {
  const t = useTranslations("page_title");
  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        <Title>{t("donations")}</Title>
      </div>
     <DataTable/>
    </React.Fragment>
  );
}
