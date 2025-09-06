"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UmrahStatusBadge from "@/components/umrah-status-badge";
import { UmrahDetailsResponse } from "@/interfaces/umrah";
import { formatPrice } from "@/lib/utils/price-utils";
import {
  IconBuildingMosque,
  IconUser,
  IconFlag,
  IconTag,
  IconHistory,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";
import { format } from "date-fns";
export const UmrahDetailsCard = ({
  umrah,
  t,
  dir,
}: {
  umrah: UmrahDetailsResponse;
  t: any;
  dir: string;
}) => {
  return (
    <Card className="p-2 gap-2">
      <CardHeader className="flex items-center justify-start gap-2 p-0">
        <div className="icon-container">
          <IconBuildingMosque />
        </div>
        <CardTitle className="font-medium">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center px-0 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("umrah.umrah_id")}: </p>
          <p>{umrah.umrah_id}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("umrah.price")}: </p>
          <p>
            {formatPrice(umrah.price, {
              isRTL: dir === "rtl",
              currencySymbol: "$",
            })}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("umrah.status")}: </p>
          <UmrahStatusBadge status={umrah.status} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("umrah.created_at")}: </p>
          <p>{format(umrah.created_at, "yyyy-MM-dd")}</p>
        </div>
      </CardContent>
    </Card>
  );
};
