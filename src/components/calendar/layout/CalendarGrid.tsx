import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarDay } from "../cells/CalendarDay";
import { CalendarBaseProps, CalendarData, CalendarEvent } from "../types";
import { ScheduleNotifications } from "@/interfaces/notification";

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

interface CalendarGridProps extends CalendarBaseProps {
  days: Date[];
  selectedDay: Date;
  firstDayCurrentMonth: Date;
  data: ScheduleNotifications[];
  onDayClick: (day: Date) => void;
  isDesktop: boolean;
  className?: string;
  onAddNotification?: (notification: {
    day: Date;
    title_ar: string;
    title_en: string;
    message_ar: string;
    message_en: string;
    receiver: "performers" | "seekers" | "employees" | "all";
    scheduledAt: Date;
  }) => void;
  getDayEvents: (day: Date) => CalendarEvent[];
}

export function CalendarGrid({
  days,
  selectedDay,
  firstDayCurrentMonth,
  data,
  onDayClick,
  isDesktop,
  onAddNotification,
  getDayEvents,
  ...props
}: CalendarGridProps) {
  const handleAddNotification = (
    day: Date,
    notification: {
      title_ar: string;
      title_en: string;
      message_ar: string;
      message_en: string;
      receiver: "performers" | "seekers" | "employees" | "all";
      scheduledAt: Date;
    }
  ) => {
    if (onAddNotification) {
      onAddNotification({
        day,
        ...notification,
      });
    }
  };

  const canAddNotification = (day: Date) => {
    const today = new Date();
    return isSameDay(day, today) || day > today;
  };

  return (
    <div className="flex text-xs leading-6 lg:flex-auto h-full w-full">
      <div
        className={cn("w-screen h-[calc(100vh-10vh)]", {
          "lg:grid lg:grid-cols-7 lg:grid-rows-5 hidden": isDesktop,
          "grid grid-cols-7 grid-rows-5 lg:hidden": !isDesktop,
        })}
      >
        {days.map((day, dayIdx) => (
          <CalendarDay
            key={dayIdx}
            day={day}
            selectedDay={selectedDay}
            firstDayCurrentMonth={firstDayCurrentMonth}
            dayEvents={getDayEvents(day)}
            onClick={() => onDayClick(day)}
            isMobile={!isDesktop}
            onAddNotification={(notification) =>
              handleAddNotification(day, notification)
            }
            canAddNotification={canAddNotification(day)}
            className={cn({
              [colStartClasses[getDay(day)]]: isDesktop && dayIdx === 0,
            })}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}
