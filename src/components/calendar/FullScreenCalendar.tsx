"use client";

import * as React from "react";
import { startOfToday, add, format, startOfWeek } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDirLang } from "@/hooks/use-dir-lang";
import { CalendarHeader } from "./layout/CalendarHeader";
import { CalendarGrid } from "./layout/CalendarGrid";
import { useCalendarState } from "./hooks/useCalendarState";
import { useNotifications } from "./hooks/useNotifications";
import { ScheduleNotifications } from "@/interfaces/notification";
import { Card, CardContent, CardHeader } from "../ui/card";
import { WeekDaysHeader } from "./layout/WeekDaysHeader";

export function FullScreenCalendar({
  data,
}: {
  data: ScheduleNotifications[];
}) {
  const today = startOfToday();
  const { dir, lang } = useDirLang();
  const locale = lang === "ar" ? arSA : enUS;
  const isRTL = dir === "rtl";
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
    days,
    handleMonthChange,
  } = useCalendarState(today, locale);

  const { addNotification, getDayEvents } = useNotifications(data, lang);

  const goToToday = () => {
    handleMonthChange(today);
    setSelectedDay(today);
  };

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = startOfWeek(new Date(), { locale });
    return format(add(day, { days: i }), "EEEEEE", { locale });
  });

  const formatDayNumber = (date: Date) => format(date, "d", { locale });

  return (
    <Card className="p-0 rounded-lg border-0 gap-0">
      <CardHeader className="p-0 border rounded-t-lg border-b-0">
        <CalendarHeader
          today={today}
          firstDayCurrentMonth={firstDayCurrentMonth}
          onGoToToday={goToToday}
          dir={dir}
          locale={locale}
          isRTL={isRTL}
          formatDayNumber={formatDayNumber}
        />
      </CardHeader>
      <CardContent className="p-0 mt-0 border-b border-r">
        <div className="flex flex-1 flex-col h-full" dir={dir}>
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
              onAddNotification={addNotification}
              getDayEvents={getDayEvents}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}