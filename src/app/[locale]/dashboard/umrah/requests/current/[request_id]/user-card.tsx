import { UmrahDetailsResponse } from "@/interfaces/umrah";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUser, IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPhone } from "@/lib/utils/international-phone";
import { getCountryName } from "@/lib/utils/country-name";

function UserCard({
  user,
  t,
  locale,
  is_performer,
}: {
  user: UmrahDetailsResponse["created_by" | "assigned_to"];
  t: any;
  locale: string;
  is_performer?: boolean;
}) {
  if (!user) {
    if (!is_performer) return null;

    return (
      <Card className="p-4 gap-2 h-[177px]">
        <CardHeader className="flex items-center justify-start gap-2 p-0">
          <Avatar className="icon-container h-14 w-14">
            <AvatarFallback className="!text-white">
              <IconUser />
            </AvatarFallback>
          </Avatar>
          <div className="w-full flex items-start justify-start flex-col">
            <CardTitle className="font-medium">{t("user.performer")}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("no_performer_selected")}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4 text-center">
          <p className="text-sm text-muted-foreground/70">
            {t("performer_not_assigned")}
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="p-2 gap-2 h-[177px]">
      <CardHeader className="flex items-center justify-start gap-2 p-0">
        <Avatar className="icon-container h-14 w-14">
          <AvatarImage src={user?.profile_image} alt={user?.username} />
          <AvatarFallback className="!text-white">
            <IconUser className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="w-full flex items-start justify-start flex-col">
          <CardTitle className="font-medium">
            {t(is_performer ? "user.performer" : "user.seeker")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center px-0 space-y-3">
        <div className="flex items-center justify-start gap-2">
          <p className="font-medium">
            <IconMail />
          </p>
          <p>{user.email}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <p className="font-medium">
            <IconPhone />
          </p>
          <p>{formatPhone(user.phone_number, { countryCode: user.country })}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <p className="font-medium">
            <IconMapPin />
          </p>
          <p>{getCountryName(user.country, locale)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
