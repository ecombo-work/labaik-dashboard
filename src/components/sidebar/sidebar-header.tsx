"use client";
import React from "react";
import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import { useDirLang } from "@/hooks/use-dir-lang";
const labaik_en = "/labaik_en.png";
const labaik_ar = "/labaik_ar.png";
function AppSidebarHeader() {
  const { lang } = useDirLang();
  return (
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
  );
}

export default AppSidebarHeader;
