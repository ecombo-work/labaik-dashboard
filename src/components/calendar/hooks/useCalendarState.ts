import { useState, useEffect } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfWeek,
} from "date-fns";
import { Locale } from "date-fns";

export function useCalendarState(today: Date, locale: Locale) {
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { locale }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { locale }),
  });

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(format(date, "MMM-yyyy"));
  };

  useEffect(() => {
    const handleMonthSelect = (e: CustomEvent) => {
      handleMonthChange(e.detail);
    };
    window.addEventListener("monthChange", handleMonthSelect as EventListener);
    return () => {
      window.removeEventListener(
        "monthChange",
        handleMonthSelect as EventListener
      );
    };
  }, []);

  return {
    selectedDay,
    setSelectedDay,
    currentMonth,
    firstDayCurrentMonth,
    days,
    handleMonthChange,
  };
}
