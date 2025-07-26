"use client";

import * as React from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
  Locale,
} from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDirLang } from "@/hooks/use-dir-lang";
import { cn } from "@/lib/utils";
import { CalendarHeader } from "./CalendarHeader";
import { WeekDaysHeader } from "./WeekDaysHeader";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarData, CalendarEvent } from "./types";
import { ScheduleNotifications } from "@/interfaces/notification";

export function FullScreenCalendar({ data }: { data: ScheduleNotifications[] }) {
  const today = startOfToday();
  const { dir, lang } = useDirLang();
  const locale = lang === "ar" ? arSA : enUS;
  const isRTL = dir === "rtl";

  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy")
  );
  const [notifications, setNotifications] = React.useState<Record<string, CalendarEvent[]>>({});

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { locale }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { locale }),
  });

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = startOfWeek(new Date(), { locale });
    return format(add(day, { days: i }), "EEEEEE", { locale });
  });

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(format(date, "MMM-yyyy"));
  };

  React.useEffect(() => {
    const handleMonthSelect = (e: CustomEvent) => {
      handleMonthChange(e.detail);
    };

    window.addEventListener('monthChange', handleMonthSelect as EventListener);
    return () => {
      window.removeEventListener('monthChange', handleMonthSelect as EventListener);
    };
  }, []);

  const goToToday = () => {
    handleMonthChange(today);
    setSelectedDay(today);
  };

  const formatDayNumber = (date: Date) => {
    return format(date, "d", { locale });
  };

  const handleAddNotification = (notification: {
    title: string;
    description?: string;
    time: Date;
  }) => {
    const dayKey = format(selectedDay, 'yyyy-MM-dd');
    const newNotification: CalendarEvent = {
      notification_id: Date.now(),
      title: notification.title,
      scheduled_at: notification.time.toISOString(),

    };

    setNotifications(prev => ({
      ...prev,
      [dayKey]: [...(prev[dayKey] || []), newNotification],
    }));
  };

  // Combine events from props with notifications for each day
  const getDayEvents = (day: Date) => {
    const dayKey = format(day, 'yyyy-MM-dd');
    const dayData = data.find((item) => isSameDay(item.day, day));
    const dayNotifications = notifications[dayKey] || [];
    
    return [
      ...(dayData?.notifications || []),
      ...dayNotifications,
    ].sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));
  };

  return (
    <div className="flex flex-1 flex-col h-full" dir={dir}>
      <CalendarHeader
        today={today}
        firstDayCurrentMonth={firstDayCurrentMonth}
        onGoToToday={goToToday}
        dir={dir}
        locale={locale}
        isRTL={isRTL}
        formatDayNumber={formatDayNumber}
      />

      <div className="lg:flex lg:flex-auto lg:flex-col">
        <WeekDaysHeader weekDays={weekDays} isRTL={isRTL} />

        <CalendarGrid
          days={days}
          selectedDay={selectedDay}
          firstDayCurrentMonth={firstDayCurrentMonth}
          data={data}
          onDayClick={setSelectedDay}
          isDesktop={isDesktop}
          dir={dir}
          locale={locale}
          isRTL={isRTL}
          formatDayNumber={formatDayNumber}
          onAddNotification={handleAddNotification}
          getDayEvents={getDayEvents}
        />
      </div>
    </div>
  );
}
