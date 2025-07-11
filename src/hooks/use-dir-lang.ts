"use client";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";

export  function useDirLang() {
  const lang = useLocale() as "ar" | "en";
  const dir = getLangDir(lang);
  return { lang, dir };
}
