"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UmrahDetailsResponse } from "@/interfaces/umrah";
import { formatPrice } from "@/lib/utils/price-utils";
import { IconUser } from "@tabler/icons-react";
export const PersonCard = ({
  person,
  t,
}: {
  person: UmrahDetailsResponse["person"];
  t: any;
}) => {
  if (!person) return null;
  return (
    <Card className="p-2 gap-2">
      <CardHeader className="flex items-center justify-start gap-2 p-0">
        <div className="icon-container">
          <IconUser />
        </div>
        <CardTitle className="font-medium">{t("person_details")}</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center px-0 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("person.name")}: </p>
          <p>{person.name}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("person.gender")}: </p>
          <p>{t(`gender.${person.gender.toLowerCase()}`)}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium">{t("person.status")}: </p>
          <p>{t(`person_status.${person.status}`)}</p>
        </div>
        {person.note && (
          <div className="flex items-center justify-between gap-2">
            <Dialog>
              <DialogTrigger className="cursor-pointer">
                {t("person.note")}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("person.note")}</DialogTitle>
                </DialogHeader>
                <DialogDescription>{person.note}</DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
