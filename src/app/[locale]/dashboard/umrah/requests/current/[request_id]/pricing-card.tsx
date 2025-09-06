import React from "react";
import { IconBrandCashapp } from "@tabler/icons-react";
import { UmrahDetailsResponse } from "@/interfaces/umrah";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/price-utils";
function PricingCard({
  pricing,
  t,
  dir,
}: {
  pricing: UmrahDetailsResponse["pricing"];
  t: any;
  dir: string;
}) {
  if (!pricing) return null;
  return (
    <Card className="p-2 gap-2">
      <CardHeader className="flex items-center justify-start gap-2 p-0">
        <div className="icon-container">
          <IconBrandCashapp />
        </div>
        <CardTitle className="font-medium">{t("pricing_details")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("pricing.platform_fee")}: </p>
          <p>
            {formatPrice(pricing.platform_fee, {
              isRTL: dir === "rtl",
            })}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("pricing.performer_fee")}: </p>
          <p>
            {formatPrice(pricing.performer_fee, {
              isRTL: dir === "rtl",
            })}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("pricing.vat_amount")}: </p>
          <p>
            {formatPrice(pricing.vat_amount, {
              isRTL: dir === "rtl",
            })}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("pricing.discount_amount")}: </p>
          <p>
            {formatPrice(pricing.discount_amount, {
              isRTL: dir === "rtl",
            })}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("pricing.total_price")}: </p>
          <p>
            {formatPrice(pricing.total_price, {
              isRTL: dir === "rtl",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PricingCard;
