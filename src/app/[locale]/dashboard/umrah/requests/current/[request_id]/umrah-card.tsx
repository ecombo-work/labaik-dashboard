"use client";
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UmrahDetailsResponse } from "@/interfaces/umrah";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import {
  Calendar as CalendarIcon,
  CalendarDays as CalendarDaysIcon,
  User as UserIcon,
  UserCog as UserCogIcon,
  DollarSign as DollarSignIcon,
  Clock as ClockIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Info as InfoIcon,
  UserCheck2 as UserCheck2Icon,
  MessageSquare as MessageSquareText,
  History as HistoryIcon,
  PlusCircle,
  Bell,
  XCircle,
  CheckCircle2,
  Clock,
  Loader2,
  UserCheck,
  UserCog,
  UserX,
  AlertCircle,
  Flag,
  Circle,
  Footprints,
  Activity,
  UserCheck as UserCheckIcon,
} from "lucide-react";
import { formatPhone } from "@/lib/utils/international-phone";
import { getCountryName } from "@/lib/utils/country-name";
import UmrahStatusBadge from "@/components/umrah-status-badge";
import { useDirLang } from "@/hooks/use-dir-lang";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import OfferStatusBadge from "@/components/offer-status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OfferStatus, UmrahAction } from "@/constants/umrah";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils/date-utils";

function UserCard({ user, title, t }: { user: any; title: string; t: any }) {
  const { lang } = useDirLang();

  return (
    <Card className="w-full relative">
      <CardHeader>
        <Avatar className="absolute -top-6 right-1/2 translate-x-1/2  h-14 w-14 bg-gray-100 object-cover shadow-sm rounded-full">
          <AvatarImage src={user?.profile_image ?? ""} />
          <AvatarFallback className="text-lg">
            {user?.username?.[0]?.toUpperCase() ?? "-"}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="flex items-center justify-between">
          <p>{title}</p>
          <p className="text-sm text-muted-foreground">
            #{user?.user_id ?? "-"}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* <div className="bg-muted/30 p-4 rounded-lg border"> */}
          <div className="flex items-center justify-between mb-0">
            <span className="text-muted-foreground">{t("user.username")}</span>
            <h3 className="font-medium text-lg">{user?.username ?? "-"}</h3>
          </div>
          <Separator />
          <div className="grid gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("user.email")}</span>
              <a
                href={`mailto:${user?.email}`}
                className="font-medium text-right"
              >
                {user?.email ?? "-"}
              </a>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {t("user.phone_number")}
              </span>
              <a href={`tel:${user?.phone_number}`} className="font-medium">
                {user?.phone_number
                  ? formatPhone(user?.phone_number, {
                      countryCode: user?.country,
                    })
                  : "-"}
              </a>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("user.country")}</span>
              <span className="font-medium">
                {getCountryName(user?.country, lang) ?? "-"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
{
  /* Person Details Card */
}
function PersonCard({ person }: { person: UmrahDetailsResponse["person"] }) {
  const t = useTranslations("umrah_details");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCogIcon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
          {t("person_details")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {t("person.name")}
                </p>
                <p className="font-medium">{person?.name ?? "-"}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("person.gender")}
                </span>
                <span className="font-medium text-right">
                  {person.gender
                    ? t(`gender.${person.gender.toLowerCase()}`)
                    : "-"}
                </span>
              </div>

              <Separator className="h-px" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("person.status")}
                </span>
                <span className="font-medium">
                  {person.status ? t(`person_status.${person.status}`) : "-"}
                </span>
              </div>
              {person.note && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      {t("person.note")}
                    </div>
                    <span className="font-medium text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <p>{t("person.show_note")}</p>
                          {/* <Button variant="outline">{}</Button> */}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t("person.note")}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>{person.note}</DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* {person?.note && (
            <div className="mt-4 p-3 bg-muted/30 rounded-md">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("person.note")}:
              </p>
              <p className="text-sm">{person.note}</p>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
{
  /* Progress Section */
}
interface ProgressCardRef {
  getHeight: () => number;
}
const ProgressCard = forwardRef<
  ProgressCardRef,
  { progress?: UmrahDetailsResponse["progress"] }
>(({ progress }, ref) => {
  const t = useTranslations("umrah_details");
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getHeight: () => divRef.current?.offsetHeight || 0,
  }));

  if (!progress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("umrah.progress")}</CardTitle>
          <CardDescription className="text-center">
            {t("progress.not_available")}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const progressPercentage = progress.progress_percentage ?? 0;

  return (
    <Card ref={divRef}>
      <CardHeader>
        <CardTitle>{t("umrah.progress")}</CardTitle>
        <CardDescription>
          {t("progress.progress_percentage")}: {progressPercentage}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {t("progress.ihram")}
              </p>
              <p className="font-medium">
                {progress.ihram_started_at
                  ? format(new Date(progress.ihram_started_at), "PPPp")
                  : t("not_started")}
              </p>
              {progress.ihram_completed_at && (
                <p className="text-sm text-green-600">
                  {t("completed_at")}{" "}
                  {format(new Date(progress.ihram_completed_at), "PPPp")}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {t("progress.tawaf")}
              </p>
              <p className="font-medium">
                {progress.tawaf_started_at
                  ? format(new Date(progress.tawaf_started_at), "PPPp")
                  : t("not_started")}
              </p>
              {progress.tawaf_completed_at && (
                <p className="text-sm text-green-600">
                  {t("completed_at")}{" "}
                  {format(new Date(progress.tawaf_completed_at), "PPPp")}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {t("progress.sai")}
              </p>
              <p className="font-medium">
                {progress.sai_started_at
                  ? format(new Date(progress.sai_started_at), "PPPp")
                  : t("not_started")}
              </p>
              {progress.sai_completed_at && (
                <p className="text-sm text-green-600">
                  {t("completed_at")}{" "}
                  {format(new Date(progress.sai_completed_at), "PPPp")}
                </p>
              )}
            </div>
          </div>

          {progress.notes && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-1">{t("progress.notes")}</p>
              <p className="text-sm">{progress.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
ProgressCard.displayName = "ProgressCard";

interface OffersCardRef {
  getHeight: () => number;
}
const OffersCard = forwardRef<
  OffersCardRef,
  { offers: UmrahDetailsResponse["offers"] }
>(({ offers }, ref) => {
  const t = useTranslations("umrah_details");
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getHeight: () => divRef.current?.offsetHeight || 0,
  }));
  return (
    <Card ref={divRef}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSignIcon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
          {t("umrah.offers")} ({offers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {offers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>{t("no_offers")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
            {offers.map((offer) => (
              <Card
                key={offer.offer_id}
                className={cn(
                  "overflow-hidden !py-3",
                  offer.status === OfferStatus.ACCEPTED ? "bg-green-100" : ""
                )}
              >
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Avatar className="h-14 w-14 bg-gray-100 mr-2 rtl:ml-2 rtl:mr-0">
                        <AvatarImage src={offer.created_by.profile_image} />
                        <AvatarFallback>
                          {offer.created_by.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {offer.created_by.username}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(offer.created_at), "PPpp")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="text-xl font-bold text-primary">
                        {offer.price} $
                      </div>
                      <OfferStatusBadge status={offer.status} />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                      <span>{format(new Date(offer.date), "PPP")}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <ClockIcon className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                      <span>{offer.time}</span>
                    </div>
                  </div>

                  {offer.notes && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-md">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {t("progress.notes")}:
                      </p>
                      <p className="text-sm">{offer.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

OffersCard.displayName = "OffersCard";

function UmrahCards({ umrah }: { umrah: UmrahDetailsResponse }) {
  const t = useTranslations("umrah_details");
  const p1Ref = useRef<{ getHeight: () => number }>(null);
  const p2Ref = useRef<{ getHeight: () => number }>(null);
  const [heights, setHeights] = useState({
    p1: 0,
    p2: 0,
    total: 0,
  });
  useEffect(() => {
    const h1 = p1Ref.current?.getHeight() || 0;
    const h2 = p2Ref.current?.getHeight() || 0;

    setHeights({
      p1: h1,
      p2: h2,
      total: h1 + h2,
    });
  }, []);
  console.log("============heights=========================");
  console.log(heights);
  console.log("=====================================");
  return (
    <div className="space-y-7">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 rtl:ml-2 text-primary" />
              {t("title")}
            </div>
            <UmrahStatusBadge status={umrah.status} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("umrah.umrah_id")}
                </p>
                <p className="font-medium">{umrah.umrah_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("umrah.price")}
                </p>
                <p className="font-medium">{umrah.price} $ </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("umrah.created_at")}
                </p>
                <p className="font-medium">
                  {format(new Date(umrah.created_at), "PPP")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Person Details Card */}
        <PersonCard person={umrah.person} />

        {/* Created By Card */}
        <UserCard user={umrah.created_by} title={t("umrah.created_by")} t={t} />

        {/* Assigned To Card */}
        <UserCard
          user={umrah.assigned_to}
          title={t("umrah.assigned_to")}
          t={t}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Progress Section */}
          <ProgressCard progress={umrah.progress} ref={p1Ref} />

          {/* Offers Section */}
          <OffersCard offers={umrah.offers} ref={p2Ref} />
        </div>
        <HistoryCard history={umrah.history} containerHeight={heights.total} />
      </div>
    </div>
  );
}

function HistoryCard({
  history,
  containerHeight,
}: {
  history?: UmrahDetailsResponse["history"];
  containerHeight: number;
}) {
  const t = useTranslations("umrah_details.history");
  const { lang } = useDirLang();
  const getActionDetails = (action: UmrahAction) => {
    const actions: Record<
      UmrahAction,
      { icon: any; color: string; label: string }
    > = {
      [UmrahAction.UMRAH_REQUEST_CREATED]: {
        icon: PlusCircle,
        color: "text-blue-500",
        label: t("umrah_request_created"),
      },
      [UmrahAction.OFFERS_RECEIVING_STARTED]: {
        icon: Bell,
        color: "text-yellow-500",
        label: t("offers_receiving_started"),
      },
      [UmrahAction.OFFER_REJECTED]: {
        icon: XCircle,
        color: "text-red-500",
        label: t("offer_rejected"),
      },
      [UmrahAction.OFFER_ACCEPTED]: {
        icon: CheckCircle2,
        color: "text-green-500",
        label: t("offer_accepted"),
      },
      [UmrahAction.OFFER_DECLINED]: {
        icon: XCircle,
        color: "text-red-500",
        label: t("offer_declined"),
      },
      [UmrahAction.AWAITING_PAYMENT]: {
        icon: Clock,
        color: "text-yellow-500",
        label: t("awaiting_payment"),
      },
      [UmrahAction.PAYMENT_SUCCESSFUL]: {
        icon: CheckCircle2,
        color: "text-green-500",
        label: t("payment_successful"),
      },
      [UmrahAction.PAYMENT_FAILED]: {
        icon: XCircle,
        color: "text-red-500",
        label: t("payment_failed"),
      },
      [UmrahAction.REQUEST_CONFIRMED]: {
        icon: CheckCircle2,
        color: "text-green-500",
        label: t("request_confirmed"),
      },
      [UmrahAction.REQUEST_STARTING_SOON]: {
        icon: Clock,
        color: "text-blue-500",
        label: t("request_starting_soon"),
      },
      [UmrahAction.REQUEST_IN_PROGRESS]: {
        icon: Loader2,
        color: "text-blue-500",
        label: t("request_in_progress"),
      },
      [UmrahAction.REQUEST_COMPLETED]: {
        icon: CheckCircle2,
        color: "text-green-500",
        label: t("request_completed"),
      },
      [UmrahAction.PERFORMER_ASSIGNED]: {
        icon: UserCheck,
        color: "text-blue-500",
        label: t("performer_assigned"),
      },
      [UmrahAction.PERFORMER_CHANGED]: {
        icon: UserCog,
        color: "text-yellow-500",
        label: t("performer_changed"),
      },
      [UmrahAction.CANCELLED_BY_PERFORMER]: {
        icon: UserX,
        color: "text-red-500",
        label: t("cancelled_by_performer"),
      },
      [UmrahAction.CANCELLED_BY_SEEKER]: {
        icon: UserX,
        color: "text-red-500",
        label: t("cancelled_by_seeker"),
      },
      [UmrahAction.CANCELLED_BY_ADMIN]: {
        icon: UserX,
        color: "text-red-500",
        label: t("cancelled_by_admin"),
      },
      [UmrahAction.REQUEST_EXPIRED]: {
        icon: Clock,
        color: "text-red-500",
        label: t("request_expired"),
      },
      [UmrahAction.SYSTEM_AUTO_CANCELLED]: {
        icon: AlertCircle,
        color: "text-red-500",
        label: t("system_auto_cancelled"),
      },
      [UmrahAction.SYSTEM_AUTO_EXPIRED]: {
        icon: Clock,
        color: "text-red-500",
        label: t("system_auto_expired"),
      },
      [UmrahAction.START_IHRAM]: {
        icon: Flag,
        color: "text-blue-500",
        label: t("start_ihram"),
      },
      [UmrahAction.START_TAWAF]: {
        icon: Circle,
        color: "text-blue-500",
        label: t("start_tawaf"),
      },
      [UmrahAction.START_SAI]: {
        icon: Footprints,
        color: "text-blue-500",
        label: t("start_sai"),
      },
      [UmrahAction.END_IHRAM]: {
        icon: Flag,
        color: "text-green-500",
        label: t("end_ihram"),
      },
      [UmrahAction.END_TAWAF]: {
        icon: Circle,
        color: "text-green-500",
        label: t("end_tawaf"),
      },
      [UmrahAction.END_SAI]: {
        icon: Footprints,
        color: "text-green-500",
        label: t("end_sai"),
      },
    };
    return (
      actions[action] || {
        icon: Activity,
        color: "text-gray-500",
        label: action,
      }
    );
  };

  if (history?.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HistoryIcon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("no_history")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-full py-8 text-muted-foreground">
            {t("no_history")}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-h-[calc(100svh-17.5svh)]">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center text-lg">
          <HistoryIcon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <ScrollArea
        className={cn("px-6 max-h-[calc(100svh-2svh)] overflow-hidden")}
      >
        <CardContent className="flex-1 p-0 overflow-hidden">
          {history?.length === 0 ? (
            <div className="flex items-center justify-center h-full py-8 text-muted-foreground">
              {t("no_history")}
            </div>
          ) : (
            <div className="space-y-4">
              {history?.map((item) => {
                const {
                  icon: Icon,
                  color,
                  label,
                } = getActionDetails(item.action);

                // const actionDate = new Date(item.created_at);
                // const formattedDate = new Intl.DateTimeFormat(lang, {
                //   year: "numeric",
                //   month: "short",
                //   day: "numeric",
                //   hour: "2-digit",
                //   minute: "2-digit",
                // }).format(actionDate);

                return (
                  <div
                    key={item.history_id}
                    className="group relative p-4 rounded-lg border hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Action Icon */}
                      <div
                        className={cn(
                          "flex-shrink-0 h-9 w-10 rounded-full flex items-center justify-center mt-0.5",
                          color,
                          !color.includes("bg-") && "bg-muted",
                          !color.includes("text-") && "text-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-foreground">
                            {label}
                          </h4>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(item.created_at)}
                          </div>
                        </div>

                        {item.performed_by && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center overflow-hidden">
                              <Avatar className="bg-gray-200">
                                <AvatarImage
                                  src={item.performed_by.profile_image}
                                />
                                <AvatarFallback>
                                  {item.performed_by.username
                                    .charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {item.performed_by.username}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(item.created_at)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export default UmrahCards;
