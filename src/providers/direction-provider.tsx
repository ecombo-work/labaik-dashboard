"use client";
import { useDirLang } from "@/hooks/use-dir-lang";
import { Direction } from "radix-ui";

export default ({ children }: { children: React.ReactNode }) => {
  const { dir } = useDirLang();
  return <Direction.Provider dir={dir}>{children}</Direction.Provider>;
};
