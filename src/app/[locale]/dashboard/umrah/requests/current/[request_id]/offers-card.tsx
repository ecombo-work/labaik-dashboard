import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTag, IconUser } from "@tabler/icons-react";
import { UmrahDetailsResponse } from "@/interfaces/umrah";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDate } from "date-fns";
import OfferStatusBadge from "@/components/offer-status-badge";
import { formatPrice } from "@/lib/utils/price-utils";
function OffersCard({
  offers,
  t,
  dir,
}: {
  offers: UmrahDetailsResponse["offers"];
  t: any;
  dir: string;
}) {
  if (!offers?.length) {
    return (
      <Card className="p-4 gap-2">
        <CardHeader className="flex items-center justify-start gap-2 p-0">
          <div className="icon-container">
            <IconTag />
          </div>
          <CardTitle className="font-medium">{t("offer.offers")}</CardTitle>
        </CardHeader>
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground text-sm">
            {t("no_offers_available")}
          </p>
          <p className="text-muted-foreground/50 text-xs mt-1">
            {t("check_back_later_or_create_offer")}
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="p-2 gap-2 overflow-x-auto">
      <CardHeader className="flex items-center justify-start gap-2 p-0">
        <div className="icon-container">
          <IconTag />
        </div>
        <CardTitle className="font-medium">{t("offer.offers")}</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center px-0 space-y-3 pt-4">
        {offers.map((offer, index) => (
          <div
            key={offer.offer_id}
            className={`flex items-center justify-between gap-2 pb-2 ${index !== offers.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <Avatar className="icon-container">
              <AvatarImage src={offer.created_by.profile_image} />
              <AvatarFallback className="!text-white">
                <IconUser className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <p className="font-medium">
              {offer.created_by.username + "#" + `${offer.created_by.user_id}`}
            </p>
            <p>{offer.date}</p>
            <p>{offer.time.slice(0, 5)}</p>
            <OfferStatusBadge status={offer.status} />
            <p>{formatPrice(offer.price, { isRTL: dir === "rtl" })}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default OffersCard;
