"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Transactions from "@/components/finance/transactions";
import Terms from "@/components/finance/terms";
export default function Page() {
  const t = useTranslations("transactions");
  return (
    <Tabs defaultValue="incoming" className="!w-full">
      <TabsList className="w-full bg-accent">
        <TabsTrigger  value="incoming">{t("incoming")}</TabsTrigger>
        <TabsTrigger value="terms">{t("terms")}</TabsTrigger>
      </TabsList>
      <TabsContent value="incoming">
        <Transactions />
      </TabsContent>
      <TabsContent value="terms">
        <Terms />
      </TabsContent>
    </Tabs>
  );
}
