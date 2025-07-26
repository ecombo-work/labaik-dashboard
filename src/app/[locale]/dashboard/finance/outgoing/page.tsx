"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import Transactions from "@/components/finance/transactions";
import Terms from "@/components/finance/terms";
export default function Page() {
  const t = useTranslations("transactions");
  return (
    <Tabs defaultValue="outgoing" className="!w-full">
      <TabsList className="!w-full bg-accent">
        <TabsTrigger value="outgoing">{t("outgoing")}</TabsTrigger>
        <TabsTrigger value="terms">{t("terms")}</TabsTrigger>
      </TabsList>
      <TabsContent value="outgoing">
        <Transactions />
      </TabsContent>
      <TabsContent value="terms">
        <Terms />
      </TabsContent>
    </Tabs>
  );
}
