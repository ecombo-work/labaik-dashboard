import { format, isEqual, isSameDay, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarBaseProps, CalendarEvent } from "./types";
import { EventIndicator } from "./EventIndicator";
import { Button } from "@/components/ui/button";
import { PlusCircle, Bell } from "lucide-react";
import { useState } from "react";
import { NotificationDialog } from "./NotificationDialog";

interface CalendarDayProps extends CalendarBaseProps {
  day: Date;
  selectedDay: Date;
  firstDayCurrentMonth: Date;
  dayEvents: CalendarEvent[];
  onClick: () => void;
  isMobile?: boolean;
  onAddNotification?: (notification: {
    title: string;
    description?: string;
    time: Date;
  }) => void;
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
}: CalendarDayProps) {
  const has_notifications = dayEvents.length > 0;
  const dayNumber = formatDayNumber(day);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);

    const handleAddNotification = (data: {
      title: string;
      message: string;
      receiver: 'performers' | 'seekers' | 'employees';
      scheduledAt: Date;
    }) => {
      if (onAddNotification) {
        onAddNotification({
          title: data.title,
          description: data.message, 
          time: data.scheduledAt     
        });
      }
    };

  const renderNotificationButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="h-5 w-5 text-muted-foreground hover:text-foreground"
      onClick={(e) => {
        e.stopPropagation();
        setIsNotificationDialogOpen(true);
      }}
    >
      <PlusCircle className="h-4 w-4" />
    </Button>
  );

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
                  {event.title}
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

  return (
    <div
      onClick={onClick}
      className={cn(
        !isEqual(day, selectedDay) &&
          !isToday(day) &&
          !isSameMonth(day, firstDayCurrentMonth) &&
          "bg-accent/10 text-muted-foreground",
        "relative flex flex-col border-b ltr:border-r rtl:border-l hover:bg-muted focus:z-10",
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
              isEqual(day, selectedDay) &&
                isToday(day) &&
                "text-primary-foreground",
              !isEqual(day, selectedDay) && isToday(day) && "text-primary"
            )}
          >
            {dayNumber}
          </time>
        </button>
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
      </header>
      <div className="flex-1 p-2.5 flex flex-col">
        <div className="flex-1">
          {has_notifications && (
            <>
              {dayEvents.slice(0, 2).map((event) => (
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
                      {event.title}
                    </p>
                  </div>
                  <p className="leading-none text-muted-foreground text-[11px]">
                    {event.scheduled_at}
                  </p>
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-muted-foreground text-right mt-1">
                  + {dayEvents.length - 2} more
                </div>
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
