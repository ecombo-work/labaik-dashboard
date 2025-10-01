import { format, isEqual, isSameDay, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarBaseProps, CalendarEvent } from "../types";

import { Button } from "@/components/ui/button";
import { PlusCircle, Bell } from "lucide-react";
import { useState } from "react";
import { NotificationDialog } from "../dialogs/NotificationDialog";
import { EventIndicator } from "./EventIndicator";
import { useDirLang } from "@/hooks/use-dir-lang";
import DayEventDialog from "../dialogs/DayEventDialog";

interface CalendarDayProps extends CalendarBaseProps {
  day: Date;
  selectedDay: Date;
  firstDayCurrentMonth: Date;
  dayEvents: CalendarEvent[];
  onClick: () => void;
  isMobile?: boolean;
  onAddNotification?: (notification: {
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    receiver: "performers" | "seekers" | "employees" | "all";
    scheduledAt: Date;
  }) => void;
  canAddNotification?: boolean;
}

export function CalendarDay({
  day,
  selectedDay,
  firstDayCurrentMonth,
  dayEvents,
  onClick,
  isMobile = false,
  dir,
  locale,
  isRTL,
  formatDayNumber,
  onAddNotification,
  canAddNotification,
}: CalendarDayProps) {
  const { lang } = useDirLang();
  const has_notifications = dayEvents.length > 0;
  const dayNumber = formatDayNumber(day);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);

  const handleAddNotification = (data: {
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    receiver: "performers" | "seekers" | "employees" | "all";
    scheduledAt: Date;
  }) => {
    if (onAddNotification) {
      onAddNotification({
        title_ar: data.title_ar,
        title_en: data.title_en,
        message_ar: data.message_ar,
        message_en: data.message_en,
        receiver: data.receiver,
        scheduledAt: data.scheduledAt,
      });
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-full">
        <button
          onClick={onClick}
          type="button"
          className={cn(
            "flex-1 flex flex-col px-2 py-1 border-b border-r",
            isEqual(day, selectedDay) && "bg-accent/50",
            "hover:bg-accent/30"
          )}
        >
          <time
            dateTime={format(day, "yyyy-MM-dd")}
            className={cn(
              `${
                isRTL ? "mr-auto" : "ml-auto"
              } flex size-6 items-center justify-center rounded-full text-xs`,
              isEqual(day, selectedDay) &&
                isToday(day) &&
                "bg-primary text-primary-foreground",
              isEqual(day, selectedDay) &&
                !isToday(day) &&
                "bg-foreground text-background",
              !isEqual(day, selectedDay) &&
                isToday(day) &&
                "border border-primary text-primary"
            )}
            aria-current={isToday(day) ? "date" : undefined}
          >
            {dayNumber}
          </time>

          {has_notifications && (
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.notification_id}
                  className={cn(
                    "text-left text-[10px] leading-none p-1 rounded truncate",
                    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  )}
                >
                  {lang === "ar" ? event.title_ar : event.title_en}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-[9px] text-muted-foreground text-center">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsNotificationDialogOpen(true);
          }}
          className="p-1 text-muted-foreground hover:text-foreground flex items-center justify-center"
          aria-label="Add reminder"
        >
          <PlusCircle className="h-3 w-3" />
        </button>

        <NotificationDialog
          open={isNotificationDialogOpen}
          onOpenChange={setIsNotificationDialogOpen}
          selectedDate={day}
          onSubmit={handleAddNotification}
        />
      </div>
    );
  }
  console.log("dayEvents", dayEvents);
  return (
    <div
      onClick={onClick}
      className={cn(
        !isEqual(day, selectedDay) &&
          !isToday(day) &&
          !isSameMonth(day, firstDayCurrentMonth) &&
          "bg-accent/10 text-muted-foreground",
        "relative flex flex-col border-t border-l hover:bg-muted focus:z-10",
        !isEqual(day, selectedDay) && "hover:bg-accent/75",
        "group"
      )}
    >
      <header className="flex items-center justify-between p-2.5">
        <button
          type="button"
          className={cn(
            isEqual(day, selectedDay) && "text-white",
            !isEqual(day, selectedDay) &&
              !isToday(day) &&
              isSameMonth(day, firstDayCurrentMonth) &&
              "text-foreground",
            !isEqual(day, selectedDay) &&
              !isToday(day) &&
              !isSameMonth(day, firstDayCurrentMonth) &&
              "text-muted-foreground",
            isEqual(day, selectedDay) &&
              isToday(day) &&
              "border-none bg-primary",
            isEqual(day, selectedDay) &&
              !isToday(day) &&
              "bg-foreground text-background",
            (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
            "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border relative"
          )}
        >
          <time
            dateTime={format(day, "yyyy-MM-dd")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs transition-all duration-200",
              // Today (not selected)
              isToday(day) &&
                !isEqual(day, selectedDay) &&
                "border border-primary text-primary bg-primary/10",
              // Selected day
              isEqual(day, selectedDay) &&
                "bg-primary text-primary-foreground shadow-sm",
              // Selected + Today
              isEqual(day, selectedDay) &&
                isToday(day) &&
                "ring-2 ring-offset-2 ring-primary",
              // Days outside current month
              !isSameMonth(day, firstDayCurrentMonth) &&
                "text-muted-foreground opacity-60",
              // Hover effect
              "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {dayNumber}
            {has_notifications && (
              <span className="absolute bottom-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            )}
          </time>
        </button>
        {canAddNotification && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsNotificationDialogOpen(true);
            }}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <PlusCircle className="h-4 w-4 text-black" />
          </Button>
        )}
      </header>
      <div className="flex-1 p-2.5 flex flex-col">
        <div className="flex-1">
          {has_notifications && (
            <>
              {dayEvents.slice(0, 1).map((event) => (
                <div
                  key={event.notification_id}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-lg border p-2 text-xs leading-tight mb-1",
                    "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50",
                    "hover:shadow-sm transition-shadow"
                  )}
                >
                  <div className="flex items-center w-full">
                    <Bell className="h-3 w-3 ltr:mr-1 rtl:ml-1 flex-shrink-0 text-blue-500" />
                    <p className="font-medium leading-none truncate">
                      {lang === "ar" ? event.title_ar : event.title_en}
                    </p>
                  </div>
                  <p className="leading-none text-muted-foreground text-[11px]">
                    {format(new Date(event.scheduled_at), "h:mm a")}
                  </p>
                </div>
              ))}
              {dayEvents.length > 1 && (
                <DayEventDialog
                  length={dayEvents.length - 1}
                  dayEvents={dayEvents}
                />
              )}
            </>
          )}
        </div>

        {has_notifications && (
          <div className="mt-auto pt-1">
            <EventIndicator notifications={dayEvents} />
          </div>
        )}
      </div>

      <NotificationDialog
        open={isNotificationDialogOpen}
        onOpenChange={setIsNotificationDialogOpen}
        selectedDate={day}
        onSubmit={handleAddNotification}
      />
    </div>
  );
}
